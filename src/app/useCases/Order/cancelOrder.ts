import { Request, Response } from 'express';

import { Order } from './../../models/Order';

export async function cancelOrder(req: Request,res: Response){
  try {
    const { orderId } = req.params;

    await Order.findByIdAndRemove(orderId);

    res.sendStatus(201);

  } catch (error) {
    res.sendStatus(500);
  }
}
