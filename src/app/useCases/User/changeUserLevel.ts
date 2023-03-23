import { Request, Response } from 'express';

import { User } from '../../models/User';
import jwt from 'jsonwebtoken';

export async function changeUserLevel(req: Request, res: Response){
  try {
    const { userLevel } = req.body;
    const { userId } = req.params;

    if(!['NORMAL', 'MOD', 'ADM'].includes(userLevel)){
      return res.status(400).json({ error: 'Insira um level válido'});
    }

    const findUser = await User.findByIdAndUpdate(userId, { userLevel });
    if(!findUser){
      return res.status(400);
    }
    const token = jwt.sign({ id: findUser.id, level: findUser.userLevel }, 'secret_key', { expiresIn: '1h' });
    res.status(200).json({message: 'alterado com sucesso!',token});

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Ocorreu um erro ao atualizar o nível do usuário' });
  }
}
