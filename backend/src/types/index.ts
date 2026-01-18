import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

export type UserRole = 'employee' | 'panel_member' | 'admin';

export interface JwtPayload {
  userId: number;
  role: string;
  iat?: number;
  exp?: number;
}

export interface CreateUserDto {
  username: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserDto {
  username?: string;
  password?: string;
  role?: UserRole;
}

export interface CreateIdeaDto {
  title: string;
  description: string;
  expectedEffect: string;
  status?: 'draft' | 'submitted';
}

export interface UpdateIdeaDto {
  title?: string;
  description?: string;
  expectedEffect?: string;
}

export interface CreateEvaluationDto {
  ideaId: number;
  feasibilityScore: number;
  impactScore: number;
  innovationScore: number;
  comment?: string;
}

export interface LeaderboardEntry {
  rank: number;
  idea: {
    id: number;
    title: string;
    author: {
      id: number;
      username: string;
    };
  };
  finalScore: number;
  isRecognized: boolean;
  recognitionRank: number | null;
}

export interface DashboardStatistics {
  totalIdeas: number;
  totalEvaluations: number;
  totalUsers: number;
  averageScore: number | null;
}
