import { Router } from 'express';
import { supabaseAdmin } from '../db.js';

const router = Router();

// GET /jobs  → all jobs (temporary, no auth yet)
router.get('/', async (_req, res) => {
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
});

export default router;
