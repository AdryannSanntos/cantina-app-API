import { Request, Response } from 'express';

import { Cupom } from './../../models/Cupom';

export async function createCupom(req: Request,res: Response){
  try {
    const { code, discount, discountType, expirationDate, minPurchaseValue, maxDiscountValue, firstPurchaseOnly } = req.body;

    const cupom = await Cupom.create({ code, discount, discountType, expirationDate, minPurchaseValue, maxDiscountValue, firstPurchaseOnly });

    res.status(201).json(cupom);
  } catch (error) {
    res.sendStatus(500);
  }
}
