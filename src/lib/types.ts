export type Role = 'Employee' | 'Admin' | 'College' | 'Industry';

export interface User {
  id: number;
  name: string;
  surname: string;
  phone: string;
  email: string;
  role: Role;
  avatarUrl: string;
  avatarHint: string;
}
