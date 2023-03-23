import { Request, Response } from 'express';

import { User } from './../../models/User';
import bcrypt from 'bcrypt';

export async function updatePassword(req: Request,res: Response){
  try {
    const { oldPassword, newPassword } = req.body;
    const { userId } = req.params;
    const findUser = await User.findById(userId);
    const userPassword = findUser?.password;

    if(!findUser){
      res.status(501).json({ error: 'Usuario nao encontrado '});
    }
    if(!userPassword){
      return res.status(501);
    }

    const passwordMatch = await bcrypt.compare(oldPassword, userPassword);

    if(!passwordMatch){
      return res.status(401).json({ error: 'Senha antiga errada!'});
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const update = await User.findByIdAndUpdate(userId, { password: hashedPassword });
    res.status(201).json(update);

  } catch (error) {
    console.log(error);

  }
}
