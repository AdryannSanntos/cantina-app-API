import { Request, Response } from 'express';

import { Order } from './../../models/Order';

export async function listOrders(req: Request,res: Response){
  try {
    const order = await Order.find().populate('items.item');
    res.json(order);
  } catch (error) {
    res.sendStatus(500);
  }
}
