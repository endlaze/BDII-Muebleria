import express from 'express';
import cors from 'cors';
import { updateOrderState } from '../controllers/orderController.js'

let router = express.Router();

router.options('/', cors());
router.post('/update_state', cors(), updateOrderState)

export default router;
