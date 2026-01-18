import { z } from 'zod';

export const createIdeaSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください'),
  description: z
    .string()
    .min(1, '説明は必須です')
    .max(2000, '説明は2000文字以内で入力してください'),
  expectedEffect: z
    .string()
    .min(1, '期待される効果は必須です')
    .max(1000, '期待される効果は1000文字以内で入力してください'),
  status: z.enum(['draft', 'submitted']).optional().default('draft'),
});

export const updateIdeaSchema = z.object({
  title: z
    .string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください')
    .optional(),
  description: z
    .string()
    .min(1, '説明は必須です')
    .max(2000, '説明は2000文字以内で入力してください')
    .optional(),
  expectedEffect: z
    .string()
    .min(1, '期待される効果は必須です')
    .max(1000, '期待される効果は1000文字以内で入力してください')
    .optional(),
});

export type CreateIdeaInput = z.infer<typeof createIdeaSchema>;
export type UpdateIdeaInput = z.infer<typeof updateIdeaSchema>;
