import express from 'express';
import cors from 'cors';
import { createClient, authClient, checkClientExists } from '../controllers/clientController.js'

let router = express.Router();

router.options('/', cors());
router.post('/create', cors(), createClient)
router.post('/auth', cors(), authClient)
router.post('/exists', cors(), checkClientExists)

export default router;
