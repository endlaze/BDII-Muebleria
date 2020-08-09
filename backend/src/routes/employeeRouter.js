import express from 'express';
import cors from 'cors';
import { createEmployee } from '../controllers/employeeController.js'

let router = express.Router();

router.options('/', cors());
router.post('/new', cors(), createEmployee)

export default router;
