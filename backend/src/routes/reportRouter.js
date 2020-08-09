import express from 'express';
import cors from 'cors';
import { salesByDate } from '../controllers/reportController.js'

let router = express.Router();

router.options('/', cors());
router.get('/by-date', cors(), salesByDate)

export default router;