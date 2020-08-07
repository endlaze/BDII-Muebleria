import express from 'express';
import bodyParser from 'body-parser';
import productRouter from './routes/productRouter.js';

let server = express();

server.listen(3000, () => {
  console.log('App listening on port 3000');
});

server.use(bodyParser.json());

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

server.use('/product', productRouter);

export default server;
