import { Request } from 'express';

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export interface AuthUser {
  id: string;
  email?: string;
  name?: string;
  role: UserRole;
  isActive?: boolean;
}

export type RequestWithUser = Request & {
  user?: AuthUser;
};
