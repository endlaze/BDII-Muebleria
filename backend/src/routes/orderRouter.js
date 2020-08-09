import express from 'express';
import cors from 'cors';
import { updateOrderState, newOnlineOrder, newOnsiteOrder } from '../controllers/orderController.js'

let router = express.Router();

router.options('/', cors());
router.post('/update_state', cors(), updateOrderState)
router.post('/new/online', cors(), newOnlineOrder)
router.post('/new/onsite', cors(), newOnsiteOrder)

export default router;
