import { Router } from 'express';
import * as employerController from '../controllers/employer.controller';

const router = Router();

router.get('/all', employerController.getAllEmployers);
router.post('/create', employerController.createEmployer);
router.put('/update/:id', employerController.updateEmployer);
router.delete('/delete/:id', employerController.deleteEmployerById);
router.get('/:id', employerController.getEmployerById);

export default router;