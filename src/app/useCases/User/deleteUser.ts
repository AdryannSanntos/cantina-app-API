import { Request, Response } from 'express';

import { User } from './../../models/User';

export async function deleteUser(req: Request,res: Response){
  try {
    const { userId } = req.params;

    await User.findByIdAndRemove(userId);

    res.sendStatus(201);

  } catch (error) {
    res.sendStatus(500);
  }
}
