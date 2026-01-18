import { Response, NextFunction } from 'express';
import { AuthenticatedRequest, UserRole } from '../types';
import { AppError } from '../errors/AppError';

const roleHierarchy: Record<UserRole, number> = {
  employee: 1,
  panel_member: 2,
  admin: 3,
};

export function requireRole(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('AUTH_003', '認証トークンが必要です', 401));
      return;
    }

    const userRole = req.user.role as UserRole;

    if (!allowedRoles.includes(userRole)) {
      next(new AppError('AUTH_003', 'この操作を行う権限がありません', 403));
      return;
    }

    next();
  };
}

export function requireMinRole(minRole: UserRole) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      next(new AppError('AUTH_003', '認証トークンが必要です', 401));
      return;
    }

    const userRole = req.user.role as UserRole;
    const userLevel = roleHierarchy[userRole] || 0;
    const requiredLevel = roleHierarchy[minRole] || 0;

    if (userLevel < requiredLevel) {
      next(new AppError('AUTH_003', 'この操作を行う権限がありません', 403));
      return;
    }

    next();
  };
}
