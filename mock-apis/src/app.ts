import express from 'express';
import employerRoutes from './routers/employer.routers';

const app = express();
app.use(express.json());

// Register routes
app.use('/employers', employerRoutes);

export default app;
