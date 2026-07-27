import User from '../models/User.js';

export const seedDemoUser = async () => {
  const username = process.env.DEMO_USERNAME || 'demo';
  const password = process.env.DEMO_PASSWORD || 'demo123';

  const existing = await User.findOne({ username, role: 'user' });
  if (existing) return;

  await User.create({ username, password, role: 'user' });
  console.log(`✅ Demo user seeded (${username} / ${password})`);
};
