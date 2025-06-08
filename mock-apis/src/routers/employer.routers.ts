import { Router } from 'express';
import * as employerController from '../controllers/employer.controller';
import { authMiddleware } from '../middlewares/auth';

const router = Router();

router.get('/all', authMiddleware, employerController.getAllEmployers);
router.post('/create', authMiddleware, employerController.createEmployer);
router.put('/update/:id', authMiddleware, employerController.updateEmployer);
router.delete('/delete/:id', authMiddleware, employerController.deleteEmployerById);
router.get('/:id', authMiddleware, employerController.getEmployerById);

export default router;