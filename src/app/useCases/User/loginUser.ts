import { Request, Response } from 'express';

import { User } from './../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function loginUser(req: Request,res: Response){
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email: email });
    const userPassword = findUser?.password;

    if(!findUser){
      res.status(404).json({ message: 'Usuario nao encontrado '});
    }
    if(!userPassword){
      return res.sendStatus(404).json({ error: 'Senha não encontrada' });
    }
    const passwordMatch = await bcrypt.compare(password, userPassword);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Senha incorreta' });
    }

    // Cria um token JWT para o usuário autenticado
    const token = jwt.sign({ id: findUser.id, level: findUser.userLevel, email: findUser.email, imagePath: findUser.imagePath, verificationCode: findUser.verificationCode }, 'secret_key', { expiresIn: '1h' });

    return res.status(200).json({ message: 'Login bem-sucedido', token });

  } catch (error) {
    res.status(500);
  }
}
