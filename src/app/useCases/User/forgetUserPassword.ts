import { Request, Response } from 'express';

import { User } from './../../models/User';
import nodemailer from 'nodemailer';
import { generate6DigitCode } from '../../utils/generate6DigitCode';

export async function forgetUserPassword(req: Request, res: Response){
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
    const transporter = nodemailer.createTransport({
      host: 'smtp.office365.com',
      port: 587,
      secure: false, // true para 465, false para outras portas
      auth: {
        user: 'nailadryan188@outlook.com.br',
        pass: 'fr187781',
      },
    });

    if(!user){
      return res.status(400).json({error: 'nenhum usuário com esse email foi encontrado!'});
    }

    const code = generate6DigitCode();
    user.verificationCode = code;
    await user.save();

    const mailOptions = {
      from: 'nailadryan188@outlook.com.br',
      to: email,
      subject: 'Seu código é: '+ code + ' para redefinir a sua senha!',
      text: `Olá,\nSeu código de verificação para redefinir a senha é: ${code} \nSe não foi voce quem solicitou essa mudança clique aqui: xvideos.com`,
    };

    await transporter.sendMail(mailOptions);
    res.send({ message: 'Código de verificação enviado com sucesso.' });

  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Erro ao enviar email ao usuário.' });
  }
}
