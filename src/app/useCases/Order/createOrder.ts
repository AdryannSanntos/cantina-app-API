import { Request, Response } from 'express';

import { Order } from './../../models/Order';

export async function createOrder(req: Request,res: Response){
  try {
    const {items} = req.body;

    const order = await Order.create({items});

    res.status(201).json(order);

  } catch (error) {
    res.sendStatus(500);
  }
}
