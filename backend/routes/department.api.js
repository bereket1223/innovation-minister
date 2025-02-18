import express from 'express';
import departmentController from '../controllers/department/create.department.controller.js';

const router = express.Router();

router.post('/', departmentController);

export default router;



