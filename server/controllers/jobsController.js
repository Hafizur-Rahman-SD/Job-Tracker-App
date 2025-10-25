// server/controllers/jobsController.js
import { supabaseAdmin } from '../db.js';

// GET /jobs → list my jobs
export const listJobs = async (req, res) => {
  const userId = req.user.id;
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// GET /jobs/:id → single job
export const getJob = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { data, error } = await supabaseAdmin
    .from('jobs')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) return res.status(404).json({ error: error.message });
  res.json(data);
};

// POST /jobs → create job
export const createJob = async (req, res) => {
  const userId = req.user.id;
  const payload = {
    title: req.body.title,
    company: req.body.company,
    position: req.body.position ?? null,
    status: req.body.status ?? 'applied',
    date_applied: req.body.date_applied ?? null,
    time_applied: req.body.time_applied ?? null,
    note: req.body.note ?? null,
    user_id: userId
  };

  const { data, error } = await supabaseAdmin
    .from('jobs')
    .insert(payload)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.status(201).json(data);
};

// PUT /jobs/:id → update job
export const updateJob = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const { data, error } = await supabaseAdmin
    .from('jobs')
    .update({
      title: req.body.title,
      company: req.body.company,
      position: req.body.position,
      status: req.body.status,
      date_applied: req.body.date_applied,
      time_applied: req.body.time_applied,
      note: req.body.note
    })
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) return res.status(400).json({ error: error.message });
  res.json(data);
};

// DELETE /jobs/:id → delete job
export const deleteJob = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const { error } = await supabaseAdmin
    .from('jobs')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) return res.status(400).json({ error: error.message });
  res.json({ success: true });
};
