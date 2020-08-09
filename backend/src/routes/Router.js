import productRouter from './productRouter.js';
import orderRouter from './orderRouter.js';
import employeeRouter from './employeeRouter.js';


const Router = (server) => {
  server.use('/product', productRouter);
  server.use('/order', orderRouter);
  server.use('/employee', employeeRouter);
}


export default Router