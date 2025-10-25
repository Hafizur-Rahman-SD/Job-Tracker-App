import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import jobsRoutes from './routes/jobs.js';

const app = express();

// allow frontend (vite) origin
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));
app.use(express.json());

// test route
app.get('/health', (_req, res) => res.json({ ok: true }));

// main routes
app.use('/jobs', jobsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running at http://localhost:${PORT}`));
