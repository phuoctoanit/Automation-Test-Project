// mock-server.ts
import express from 'express';
import employerRoutes from './employers/employers';

const app = express();
const PORT = 3001;

app.use(express.json());
app.use('/employers/*', employerRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});