import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function listCategories(req: Request,res: Response){
  try {
    const category = await Category.find();
    res.json(category);
  } catch (error) {
    res.sendStatus(500);
  }
}
