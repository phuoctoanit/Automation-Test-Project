import express, { Router, Request, Response } from 'express';
// const app = express();
// app.use(express.json());

const router = Router();

interface Employer {
  id?: number;
  name: string;
}

router.get('/employers', (req, res) => {
    res.json([
        { id: 1, name: 'Tech Solutions' },
        { id: 2, name: 'Innovatech' },
        { id: 3, name: 'Global Enterprises' }
    ]);
});

// app.post('/employers', (req: Request, res: Response) => {
//     const newEmployer: Employer = req.body;
//     if (!newEmployer.name) {
//         return res.status(400).json({ error: 'Name is required' });
//     }
//     newEmployer.id = Math.floor(Math.random() * 1000); // Simulate ID generation
//     res.status(201).json(newEmployer);
// });
// app.get('/employers/:id', (req, res) => {   
//     const employerId = parseInt(req.params.id, 10);
//     if (isNaN(employerId)) {
//         return res.status(400).json({ error: 'Invalid employer ID' });
//     }
//     const employers = [
//         { id: 1, name: 'Tech Solutions' },
//         { id: 2, name: 'Innovatech' },
//         { id: 3, name: 'Global Enterprises' }
//     ];
//     const employer = employers.find(e => e.id === employerId);
//     if (!employer) {
//         return res.status(404).json({ error: 'Employer not found' });
//     }
//     res.json(employer);
// });
// app.put('/employers/:id', (req, res) => {
//     const employerId = parseInt(req.params.id, 10);
//     if (isNaN(employerId)) {
//         return res.status(400).json({ error: 'Invalid employer ID' });
//     }
//     const updatedEmployer = req.body;
//     if (!updatedEmployer.name) {
//         return res.status(400).json({ error: 'Name is required' });
//     }
//     updatedEmployer.id = employerId; // Maintain the same ID
//     res.json(updatedEmployer);
// });
// app.delete('/employers/:id', (req, res) => {
//     const employerId = parseInt(req.params.id, 10);
//     if (isNaN(employerId)) {
//         return res.status(400).json({ error: 'Invalid employer ID' });
//     }
//     // Simulate deletion
//     res.status(204).send(); // No content
// });
export default router;
