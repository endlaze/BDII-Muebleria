import express from 'express';
import cors from 'cors';
import { createClient, authClient, checkClientExists, createCoupon, getAllUserCoupons} from '../controllers/clientController.js'

let router = express.Router();

router.options('/', cors());
router.post('/create', cors(), createClient)
router.post('/auth', cors(), authClient)
router.post('/exists', cors(), checkClientExists)
router.post('/coupon/new', cors(), createCoupon)
router.post('/coupon/getAll', cors(), getAllUserCoupons)


export default router;
