import { Request, Response } from 'express';

import { Item } from './../../models/Item';

export async function createItem(req: Request,res: Response){
  try {
    const imagePath = req.file?.filename;
    const {name, description, price, category} = req.body;

    const item = await Item.create({
      name,
      description,
      imagePath,
      price: Number(price),
      category
    });

    res.status(201).json(item);

  } catch (error) {
    res.sendStatus(500);
  }
}
