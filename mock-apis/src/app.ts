import express from 'express';
import employerRouters from './routers/employer.routers';
import loginRouters from './routers/login.routers';

const app = express();
app.use(express.json());

// Register routes
app.use('/employers', employerRouters);
app.use('/auth', loginRouters);

export default app;
