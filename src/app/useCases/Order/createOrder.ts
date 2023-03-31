import { Request, Response } from 'express';

import { Order } from './../../models/Order';
import { Cupom } from './../../models/Cupom';
import { Item } from '../../models/Item';

interface Items {
  item: string,
  price: number,
  quantity: number
}

export async function createOrder(req: Request, res: Response) {
  try {
    const { items, cupomCode, user } = req.body;

    let discount = 0;
    let discountType = 'percentage';
    let isValidCupom = true;
    let totalPrice = await calculateTotal(items);

    if (cupomCode) {
      const cupom = await Cupom.findOne({ code: cupomCode }).exec();

      if (cupom) {
        if (cupom.expirationDate && new Date() > cupom.expirationDate) {
          isValidCupom = false;
        } else if (cupom.minPurchaseValue && totalPrice < cupom.minPurchaseValue) {
          isValidCupom = false;
        } else if (cupom.maxDiscountValue && cupom.discount > cupom.maxDiscountValue) {
          isValidCupom = false;
        } else if (cupom.firstPurchaseOnly && await isCustomerAlreadyPurchased(user)) {
          isValidCupom = false;
        }else if(cupomCode !== cupom.code){
          isValidCupom = false;
        }else {
          discount = cupom.discount;
          discountType = cupom.discountType;
        }
      }else{
        res.status(400).json({ error: 'Cupom invalido!' });
        return;
      }

      if (!isValidCupom) {
        res.status(400).json({ error: 'Cupom invalido!' });
        return;
      }

      if (discountType === 'percentage') {
        totalPrice -= totalPrice * (discount / 100);
      } else {
        totalPrice -= discount;
      }

      const order = await Order.create({ items, discount, discountType, user: user, totalPrice: totalPrice });
      if(cupom){
        cupom.cupomUsed += 1; // incrementa o valor de usageCount do cupom
        await cupom.save(); // salva o cupom com o novo valor de usageCount
      }

      let usageCountMessage = ''; // inicializa a mensagem com o valor vazio

      if (isValidCupom) {
        if(cupom){
          usageCountMessage = `O cupom ${cupomCode} já foi utilizado ${cupom.cupomUsed} vezes.`;
        }
      }

      res.status(201).json({ order, usageCountMessage }); // retorna a mensagem juntamente com o objeto order

    }
  } catch (error) {
    res.sendStatus(500);
    console.log(error);

  }

  async function calculateTotal(items: Items[]) {
    let total = 0;

    for (const item of items) {
      const findItem = await Item.findById(item.item).exec();
      if (findItem) {
        total += findItem.price * item.quantity;
      }
    }

    return total;
  }

  async function isCustomerAlreadyPurchased(customerId: string) {
    const orders = await Order.find({ user: customerId }).exec();

    return orders.length > 0;
  }
}
