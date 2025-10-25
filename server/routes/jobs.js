// server/routes/jobs.js
import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import {
  listJobs, getJob, createJob, updateJob, deleteJob
} from '../controllers/jobsController.js';

const router = Router();
router.use(requireAuth);

router.get('/', listJobs);
router.get('/:id', getJob);
router.post('/', createJob);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
