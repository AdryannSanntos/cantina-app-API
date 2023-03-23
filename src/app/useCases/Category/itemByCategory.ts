import { Item } from './../../models/Item';
import {Request, Response} from 'express';

export async function listItemByCategory(req: Request, res: Response) {
  const { categoryId } = req.params;

  const item = await Item.find().where('category').equals(categoryId);

  res.json(item);
}
