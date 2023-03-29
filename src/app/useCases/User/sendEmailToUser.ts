/* eslint-disable @typescript-eslint/no-var-requires */
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
const sgMail = require('@sendgrid/mail');
import { User } from './../../models/User';
import { generate6DigitCode } from '../../utils/generate6DigitCode';

export async function sendEmailToUser(req: Request, res: Response){
  try {
    // const { password } = req.body;
    // const { userId } = req.params;

    // if(await User.findById(userId).where('password').equals(password)){
    //   return res.status(501).json('senhas iguais!');
    // }
    // const hashedPassword = await bcrypt.hash(password, 10);
    // const newPassword = await User.findByIdAndUpdate(userId, { hashedPassword });

    // res.status(201).json(newPassword);
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    if(!user){
      return res.status(400).json({error: 'nenhum usuário com esse email foi encontrado!'});
    }

    const code = generate6DigitCode();
    user.verificationCode = code;
    await user.save();
    const token = jwt.sign({ id: user.id, level: user.userLevel, email: user.email, imagePath: user.imagePath, verificationCode: user.verificationCode }, 'secret_key', { expiresIn: '1h' });

    const mailOptions = {
      from: 'nailadryan188@outlook.com.br',
      to: email,
      subject: 'Seu código é: '+ code,
      text: `Olá,\nSeu código de verificação é: ${code}`,
    };

    sgMail.send(mailOptions).then(() => {
      console.log('email enviado');
    });
    return res.status(200).json({ message: 'Enviado com sucesso!', token });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erro ao enviar email ao usuário.' });
  }
}
