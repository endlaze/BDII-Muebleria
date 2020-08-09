import express from 'express';
import cors from 'cors';
import { calculateSalary, login, createEmployee } from '../controllers/employeeController.js'

let router = express.Router();

router.options('/', cors());
router.post('/new', cors(), createEmployee)
router.post('/login', cors(), login)
router.post('/calculate-salary', cors(), calculateSalary)

export default router;
