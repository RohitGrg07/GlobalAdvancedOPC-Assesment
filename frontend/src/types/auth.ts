export type UserRole = 'admin' | 'user';

export type User = {
  id: string;
  username: string;
  role: UserRole;
};

export type AuthResponse = {
  token: string;
  user: User;
};
