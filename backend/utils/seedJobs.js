import Job from '../models/Job.js';

const SAMPLE_JOBS = [
  {
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $160k',
    type: 'full-time',
    description:
      'Build cutting-edge React applications and contribute to our design system. Lead frontend architecture decisions and mentor junior developers.',
    requirements: ['5+ years React experience', 'TypeScript proficiency', 'UI/UX design skills'],
    benefits: ['Health insurance', '401(k) matching', 'Remote work options'],
    remote: true,
  },
  {
    title: 'Product Manager',
    company: 'StartupXYZ',
    location: 'New York, NY',
    salary: '$100k - $140k',
    type: 'full-time',
    description:
      'Shape the future of our platform. Work closely with engineering and design teams to deliver amazing user experiences.',
    requirements: ['3+ years product management', 'Agile methodology', 'Data-driven mindset'],
    benefits: ['Equity package', 'Health insurance', 'Flexible PTO'],
    remote: false,
  },
  {
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'Austin, TX',
    salary: '$80k - $110k',
    type: 'full-time',
    description:
      'Create intuitive and beautiful user experiences. Collaborate with cross-functional teams to solve complex design challenges.',
    requirements: ['Portfolio of UX projects', 'Figma expertise', 'User research experience'],
    benefits: ['Creative freedom', 'Conference budget', 'Unlimited PTO'],
    remote: true,
  },
];

export const seedJobs = async () => {
  const count = await Job.countDocuments();
  if (count > 0) return;

  await Job.insertMany(SAMPLE_JOBS);
  console.log(`✅ Seeded ${SAMPLE_JOBS.length} sample jobs`);
};
