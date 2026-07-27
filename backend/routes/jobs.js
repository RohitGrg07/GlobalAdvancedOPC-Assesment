import { Router } from 'express';
import Job from '../models/Job.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// GET /api/jobs — all authenticated users
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
});

// POST /api/jobs — admin only
router.post('/', requireAdmin, async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      type,
      description,
      requirements,
      benefits,
      remote,
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      type,
      description,
      requirements: Array.isArray(requirements) ? requirements : [],
      benefits: Array.isArray(benefits) ? benefits : [],
      remote,
      postedDate: new Date(),
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to create job' });
  }
});

// PUT /api/jobs/:id — admin only
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      company,
      location,
      salary,
      type,
      description,
      requirements,
      benefits,
      remote,
    } = req.body;

    const updated = await Job.findByIdAndUpdate(
      id,
      {
        title,
        company,
        location,
        salary,
        type,
        description,
        requirements: Array.isArray(requirements) ? requirements : [],
        benefits: Array.isArray(benefits) ? benefits : [],
        remote,
      },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Job not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Failed to update job' });
  }
});

// DELETE /api/jobs/:id — admin only
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const deleted = await Job.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch {
    res.status(400).json({ message: 'Failed to delete job' });
  }
});

export default router;
