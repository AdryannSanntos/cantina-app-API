import { Request, Response } from 'express';

import { Cupom } from '../../models/Cupom';

export async function deleteCupom(req: Request,res: Response){
  try {
    const { cupomId } = req.params;

    await Cupom.findByIdAndRemove(cupomId);

    res.sendStatus(201);

  } catch (error) {
    res.sendStatus(500);
  }
}
