import express from 'express';
import { APIEndpoint } from '../../constants/APIEndpoint';
import employerRouters from './routers/employer.routers';
import loginRouters from './routers/login.routers';

const app = express();
app.use(express.json());

// Register routes
app.use(APIEndpoint.Employer, employerRouters);
app.use(APIEndpoint.Auth, loginRouters);

export default app;
