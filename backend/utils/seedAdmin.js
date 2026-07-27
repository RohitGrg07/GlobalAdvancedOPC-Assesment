import User from '../models/User.js';

export const seedAdmin = async () => {
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'password';

  const existing = await User.findOne({ username, role: 'admin' });
  if (existing) return;

  await User.create({ username, password, role: 'admin' });
  console.log(`✅ Default admin seeded (${username})`);
};
