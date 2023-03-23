import path from 'node:path';
import http from 'node:http';
import { router } from './router';
import express from 'express';
import mongoose from 'mongoose';

const app = express();
const server = http.createServer(app);

mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost:27017')
  .then(() => {

    app.use((req, res, next) => {
      res.setHeader('access-control-allow-origin', '*')
        .setHeader('access-control-allow-methods', '*')
        .setHeader('access-control-allow-headers', '*')
        .setHeader('access-control-max-age', 20);
      next();
    });
    app.use(express.json());
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use('/userUploads', express.static(path.resolve(__dirname, '..', 'userUploads')));
    app.use(router);

    server.listen(3001, () =>{
      console.log('🚀 O servidor está rodando! link: http://localhost:3001');
    });
  })
  .catch(() => console.log('Erro ao conectar ao MongoDB'));
