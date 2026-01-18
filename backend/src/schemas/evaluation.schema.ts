import { z } from 'zod';

export const createEvaluationSchema = z.object({
  ideaId: z.number().int().positive('アイデアIDは正の整数で入力してください'),
  feasibilityScore: z
    .number()
    .int('スコアは整数で入力してください')
    .min(1, 'スコアは1以上で入力してください')
    .max(10, 'スコアは10以下で入力してください'),
  impactScore: z
    .number()
    .int('スコアは整数で入力してください')
    .min(1, 'スコアは1以上で入力してください')
    .max(10, 'スコアは10以下で入力してください'),
  innovationScore: z
    .number()
    .int('スコアは整数で入力してください')
    .min(1, 'スコアは1以上で入力してください')
    .max(10, 'スコアは10以下で入力してください'),
  comment: z
    .string()
    .max(1000, 'コメントは1000文字以内で入力してください')
    .optional(),
});

export type CreateEvaluationInput = z.infer<typeof createEvaluationSchema>;
