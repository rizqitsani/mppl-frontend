export type User = {
  id: string;
  role: 'user' | 'admin';
  name: string;
  email: string;
  phone: string;
  address: string;
  token: string;
};

export type ProtectedRoute = {
  path: string;
  type: 'auth' | 'all' | 'user' | 'admin';
};
