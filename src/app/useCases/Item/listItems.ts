import { Request, Response } from 'express';

import { Item } from '../../models/Item';

export async function listItems(req: Request,res: Response){
  try {
    const item = await Item.find();
    res.json(item);
  } catch (error) {
    res.sendStatus(500);
  }
}
