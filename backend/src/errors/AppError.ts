export class AppError extends Error {
  public readonly code: string;
  public readonly statusCode: number;

  constructor(code: string, message: string, statusCode: number = 400) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'AppError';
    Error.captureStackTrace(this, this.constructor);
  }
}

// Authentication Errors
export const AuthErrors = {
  INVALID_CREDENTIALS: new AppError('AUTH_001', 'ユーザー名またはパスワードが正しくありません', 401),
  ACCOUNT_DISABLED: new AppError('AUTH_002', 'このアカウントは無効化されています', 401),
  TOKEN_REQUIRED: new AppError('AUTH_003', '認証トークンが必要です', 401),
  TOKEN_INVALID: new AppError('AUTH_004', '認証トークンが無効または期限切れです', 401),
};

// User Errors
export const UserErrors = {
  USERNAME_EXISTS: new AppError('USER_001', 'このユーザー名は既に使用されています', 409),
  PASSWORD_TOO_SHORT: new AppError('USER_002', 'パスワードは6文字以上で入力してください', 400),
  USER_NOT_FOUND: new AppError('USER_003', 'ユーザーが見つかりません', 404),
  INVALID_ROLE: new AppError('USER_004', '無効なロールです', 400),
};

// Idea Errors
export const IdeaErrors = {
  VALIDATION_ERROR: new AppError('IDEA_001', '入力内容に不備があります', 400),
  IDEA_NOT_FOUND: new AppError('IDEA_002', 'アイデアが見つかりません', 404),
  NO_PERMISSION: new AppError('IDEA_003', 'このアイデアを操作する権限がありません', 403),
  CANNOT_EDIT_SUBMITTED: new AppError('IDEA_004', '提出済みのアイデアは編集できません', 400),
  CANNOT_DELETE_SUBMITTED: new AppError('IDEA_005', '提出済みのアイデアは削除できません', 400),
  ALREADY_SUBMITTED: new AppError('IDEA_006', 'このアイデアは既に提出されています', 400),
};

// Evaluation Errors
export const EvaluationErrors = {
  IDEA_NOT_FOUND: new AppError('EVAL_001', 'アイデアが見つかりません', 404),
  CANNOT_EVALUATE_DRAFT: new AppError('EVAL_002', '下書き状態のアイデアは評価できません', 400),
  NO_PERMISSION: new AppError('EVAL_003', '評価する権限がありません', 403),
  CANNOT_EVALUATE_OWN: new AppError('EVAL_004', '自分のアイデアは評価できません', 400),
  ALREADY_EVALUATED: new AppError('EVAL_005', 'このアイデアは既に評価済みです', 400),
  INVALID_SCORE: new AppError('EVAL_006', 'スコアは1〜10の整数で入力してください', 400),
};

// Image Errors
export const ImageErrors = {
  INVALID_FORMAT: new AppError('IMAGE_001', '対応していないファイル形式です', 400),
  FILE_TOO_LARGE: new AppError('IMAGE_002', 'ファイルサイズが上限を超えています', 400),
  MAX_IMAGES_REACHED: new AppError('IMAGE_003', '画像の最大数に達しています', 400),
};

export function createError(code: string, message: string, statusCode: number = 400): AppError {
  return new AppError(code, message, statusCode);
}
