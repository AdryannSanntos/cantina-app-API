import { Request, Response } from 'express';

import { User } from './../../models/User';
import bcrypt from 'bcrypt';

export async function changeUserPassword(req: Request,res: Response){
  try {
    const { password } = req.body;
    const { userId } = req.params;

    if(await User.findById(userId).where('password').equals(password)){
      return res.status(501).json('senhas iguais!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPassword = await User.findByIdAndUpdate(userId, { hashedPassword });

    res.status(201).json(newPassword);

  } catch (error) {
    res.sendStatus(500);
  }
}
