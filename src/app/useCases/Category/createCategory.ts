import { Category } from './../../models/Category';
import { Request, Response } from 'express';


export async function createCategory(req: Request,res: Response){
  try {
    const { name, icon } = req.body;

    if(!name){
      return res.status(400).json({error: 'insira um nome válido!'});
    }
    const category = await Category.create({name, icon});
    res.json(category);


  } catch (error) {
    res.sendStatus(500).json({error: 'Erro ao criar categoria!'});
  }
}
