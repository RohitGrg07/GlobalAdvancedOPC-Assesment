import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jobsRouter from './routes/jobs.js';
import authRouter from './routes/auth.js';
import applicationsRouter from './routes/applications.js';
import { seedAdmin } from './utils/seedAdmin.js';
import { seedJobs } from './utils/seedJobs.js';
import { seedDemoUser } from './utils/seedDemoUser.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Job Board API running'));
app.use('/api/auth', authRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

const start = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/jobboard';
    await mongoose.connect(uri, {});
    console.log('✅ Connected to MongoDB');
    await seedAdmin();
    await seedDemoUser();
    await seedJobs();

    const server = app.listen(PORT, () => {
      console.log(`🚀 Server listening on http://localhost:${PORT}`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.error(`   Stop the existing process: npx kill-port ${PORT}`);
        console.error(`   Or set a different PORT in backend/.env`);
        process.exit(1);
      }
      console.error('Server error:', err);
      process.exit(1);
    });
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
};

start();
