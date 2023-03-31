import { Request, Response } from 'express';

import { Cupom } from './../../models/Cupom';

export async function listCupom(req: Request,res: Response){
  try {
    const cupom = await Cupom.find();
    res.json(cupom);
  } catch (error) {
    res.sendStatus(500);
  }
}
