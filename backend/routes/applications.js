import { Router } from 'express';
import Application from '../models/Application.js';
import Job from '../models/Job.js';
import { authenticate, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

// POST /api/applications — user applies to a job
router.post('/', async (req, res) => {
  try {
    if (req.user.role !== 'user') {
      return res.status(403).json({ message: 'Only users can apply to jobs' });
    }

    const { jobId, name, email } = req.body;
    if (!jobId || !name?.trim() || !email?.trim()) {
      return res.status(400).json({ message: 'Job, name, and email are required' });
    }

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const existing = await Application.findOne({ job: jobId, user: req.user._id });
    if (existing) {
      return res.status(409).json({ message: 'You have already applied to this job' });
    }

    const application = await Application.create({
      job: jobId,
      user: req.user._id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
    });

    const populated = await application.populate('job', 'title company');
    res.status(201).json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to submit application' });
  }
});

// GET /api/applications — admin only
router.get('/', requireAdmin, async (req, res) => {
  try {
    const applications = await Application.find()
      .populate('job', 'title company location type salary')
      .populate('user', 'username')
      .sort({ createdAt: -1 });
    res.json(applications);
  } catch {
    res.status(500).json({ message: 'Failed to fetch applications' });
  }
});

// PATCH /api/applications/:id — admin updates status
router.patch('/:id', requireAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const valid = ['pending', 'reviewed', 'accepted', 'rejected'];
    if (!valid.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const updated = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    )
      .populate('job', 'title company location type salary')
      .populate('user', 'username');

    if (!updated) return res.status(404).json({ message: 'Application not found' });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update application' });
  }
});

export default router;
