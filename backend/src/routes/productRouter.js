import express from 'express';
import cors from 'cors';
import { newProduct, allProducts } from '../controllers/productController.js'

let router = express.Router();

router.options('/', cors());
router.post('/new', cors(), newProduct)
router.get('/all', cors(), allProducts)

export default router;