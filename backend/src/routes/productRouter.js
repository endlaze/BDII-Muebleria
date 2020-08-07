import express from 'express';
import cors from 'cors';
import { newProduct } from '../controllers/productController.js'

let router = express.Router();

router.options('/', cors());
router.post('/new', cors(), newProduct)

export default router;