import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { User } from './../../models/User';

export async function createUser(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, password, phone_number, email } = req.body;
    const existingUserEmail = await User.findOne({ email: email });
    const existingUserPhoneNumber = await User.findOne({ phone_number: phone_number });

    if(existingUserEmail){
      return res.status(400).json({error: 'Já existe um usuario com esse email!'});
    }

    if(existingUserPhoneNumber){
      return res.status(400).json({error: 'Já existe um usuario com esse numero de telefone!'});
    }

    // hash a senha usando o bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: hashedPassword,
      imagePath,
      phone_number,
      email,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}
