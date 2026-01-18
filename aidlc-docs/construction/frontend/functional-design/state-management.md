# frontend 状態管理仕様

## 概要

frontend ユニットの状態管理パターンを定義します。

---

## 状態管理アーキテクチャ

```
+------------------------------------------------------------------+
|                        React Application                          |
+------------------------------------------------------------------+
|                                                                    |
|  +------------------------------------------------------------+  |
|  |                    Context Providers                        |  |
|  |  +------------------+  +------------------+                 |  |
|  |  | AuthProvider     |  | NotificationProvider|              |  |
|  |  | - user           |  | - notifications   |                |  |
|  |  | - token          |  | - add/remove      |                |  |
|  |  | - login/logout   |  +------------------+                 |  |
|  |  +------------------+                                       |  |
|  +------------------------------------------------------------+  |
|                                                                    |
|  +------------------------------------------------------------+  |
|  |                    Custom Hooks (API)                       |  |
|  |  +------------+  +------------+  +------------+             |  |
|  |  | useIdeas   |  | useEval    |  | useUsers   |             |  |
|  |  | - fetch    |  | - fetch    |  | - fetch    |             |  |
|  |  | - create   |  | - create   |  | - create   |             |  |
|  |  | - update   |  |            |  | - update   |             |  |
|  |  | - delete   |  |            |  | - delete   |             |  |
|  |  +------------+  +------------+  +------------+             |  |
|  +------------------------------------------------------------+  |
|                                                                    |
+------------------------------------------------------------------+
```

---

## Context定義

### 1. AuthContext

**責務**: 認証状態の管理

```typescript
interface AuthContextValue {
  // 状態
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // アクション
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

interface User {
  id: number;
  username: string;
  role: 'employee' | 'panel_member' | 'admin';
}
```

**初期化フロー**:
```
1. アプリ起動
2. localStorage から token を取得
3. token が存在する場合:
   a. API で token を検証（GET /auth/me）
   b. 成功: user を設定、isAuthenticated = true
   c. 失敗: token を削除、isAuthenticated = false
4. token が存在しない場合:
   a. isAuthenticated = false
5. isLoading = false
```

**login処理フロー**:
```
1. POST /auth/login (username, password)
2. 成功:
   a. token を localStorage に保存
   b. user を state に設定
   c. isAuthenticated = true
   d. ダッシュボードへ遷移
3. 失敗:
   a. エラーメッセージを throw
```

**logout処理フロー**:
```
1. localStorage から token を削除
2. user = null
3. isAuthenticated = false
4. ログインページへ遷移
```

---

### 2. NotificationContext

**責務**: トースト通知の管理

```typescript
interface NotificationContextValue {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}
```

**addNotification処理**:
```
1. 一意のIDを生成（uuid または Date.now）
2. notifications 配列に追加
3. duration 後に自動で removeNotification を呼び出し
```

---

## カスタムフック定義

### 1. useAuth

**責務**: AuthContext へのアクセス

```typescript
function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
```

---

### 2. useIdeas

**責務**: アイデア関連のAPI呼び出しと状態管理

```typescript
interface UseIdeasReturn {
  // 一覧取得
  ideas: Idea[];
  isLoading: boolean;
  error: string | null;
  fetchIdeas: () => Promise<void>;

  // マイアイデア取得
  myIdeas: Idea[];
  fetchMyIdeas: () => Promise<void>;

  // 個別取得
  getIdea: (id: number) => Promise<Idea>;

  // CRUD操作
  createIdea: (data: CreateIdeaDto) => Promise<Idea>;
  updateIdea: (id: number, data: UpdateIdeaDto) => Promise<Idea>;
  deleteIdea: (id: number) => Promise<void>;
  submitIdea: (id: number) => Promise<Idea>;

  // 画像操作
  uploadImage: (ideaId: number, file: File) => Promise<void>;
  deleteImage: (ideaId: number, imageId: number) => Promise<void>;
}

interface Idea {
  id: number;
  title: string;
  description: string;
  expectedEffect: string;
  status: 'draft' | 'submitted';
  author: User;
  images: IdeaImage[];
  evaluations?: Evaluation[];
  finalScore: number | null;
  createdAt: string;
}

interface CreateIdeaDto {
  title: string;
  description: string;
  expectedEffect: string;
  status: 'draft' | 'submitted';
}

interface UpdateIdeaDto {
  title?: string;
  description?: string;
  expectedEffect?: string;
}
```

**fetchIdeas処理**:
```
1. isLoading = true
2. GET /ideas
3. 成功: ideas = response.data
4. 失敗: error = エラーメッセージ
5. isLoading = false
```

---

### 3. useEvaluation

**責務**: 評価関連のAPI呼び出しと状態管理

```typescript
interface UseEvaluationReturn {
  // 未評価アイデア取得
  pendingIdeas: Idea[];
  fetchPendingIdeas: () => Promise<void>;

  // 評価履歴取得
  myEvaluations: Evaluation[];
  fetchMyEvaluations: () => Promise<void>;

  // アイデアの評価取得
  getEvaluationsByIdea: (ideaId: number) => Promise<Evaluation[]>;

  // 評価登録
  createEvaluation: (data: CreateEvaluationDto) => Promise<Evaluation>;

  // ローディング状態
  isLoading: boolean;
  error: string | null;
}

interface Evaluation {
  id: number;
  ideaId: number;
  evaluator: User;
  feasibilityScore: number;
  impactScore: number;
  innovationScore: number;
  comment: string | null;
  createdAt: string;
}

interface CreateEvaluationDto {
  ideaId: number;
  feasibilityScore: number;
  impactScore: number;
  innovationScore: number;
  comment?: string;
}
```

---

### 4. useUsers

**責務**: ユーザー管理関連のAPI呼び出しと状態管理

```typescript
interface UseUsersReturn {
  // ユーザー一覧取得
  users: User[];
  isLoading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;

  // パネルメンバー取得
  panelMembers: User[];
  employees: User[];

  // CRUD操作
  createUser: (data: CreateUserDto) => Promise<User>;
  updateUser: (id: number, data: UpdateUserDto) => Promise<User>;
  deleteUser: (id: number) => Promise<void>;

  // ロール変更
  updateRole: (id: number, role: string) => Promise<User>;
}

interface CreateUserDto {
  username: string;
  password: string;
  role: 'employee' | 'panel_member' | 'admin';
}

interface UpdateUserDto {
  username?: string;
  password?: string;
  role?: 'employee' | 'panel_member' | 'admin';
}
```

---

### 5. useDashboard

**責務**: ダッシュボード関連のAPI呼び出しと状態管理

```typescript
interface UseDashboardReturn {
  // 統計情報
  statistics: DashboardStatistics | null;
  fetchStatistics: () => Promise<void>;

  // リーダーボード
  leaderboard: LeaderboardEntry[];
  fetchLeaderboard: () => Promise<void>;

  // 更新（管理者のみ）
  refreshLeaderboard: () => Promise<void>;

  // 表彰（管理者のみ）
  recognizeTop3: () => Promise<void>;

  // ローディング状態
  isLoading: boolean;
  error: string | null;
}

interface DashboardStatistics {
  totalIdeas: number;
  totalEvaluations: number;
  totalUsers: number;
  averageScore: number | null;
}

interface LeaderboardEntry {
  rank: number;
  idea: Idea;
  finalScore: number;
  isRecognized: boolean;
  recognitionRank: 1 | 2 | 3 | null;
}
```

---

## API クライアント設定

### Axios インスタンス

```typescript
// api/client.ts
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター（トークン付与）
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// レスポンスインターセプター（エラーハンドリング）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## エラーハンドリング

### APIエラーの処理

```typescript
interface ApiError {
  code: string;
  message: string;
}

// バックエンドからのエラーコードをユーザーフレンドリーなメッセージに変換
const errorMessages: Record<string, string> = {
  AUTH_001: 'ユーザー名またはパスワードが正しくありません',
  AUTH_002: 'このアカウントは無効化されています',
  AUTH_003: 'ログインが必要です',
  AUTH_004: 'セッションが切れました。再度ログインしてください',
  USER_001: 'このユーザー名は既に使用されています',
  USER_002: 'パスワードは6文字以上で入力してください',
  // ... 他のエラーコード
};

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const apiError = error.response?.data as ApiError;
    if (apiError?.code && errorMessages[apiError.code]) {
      return errorMessages[apiError.code];
    }
    return apiError?.message || 'エラーが発生しました';
  }
  return 'エラーが発生しました';
}
```

---

## フォームバリデーション

### React Hook Form + Zod

```typescript
// schemas/idea.schema.ts
import { z } from 'zod';

export const createIdeaSchema = z.object({
  title: z.string()
    .min(1, 'タイトルは必須です')
    .max(100, 'タイトルは100文字以内で入力してください'),
  description: z.string()
    .min(1, '説明は必須です')
    .max(2000, '説明は2000文字以内で入力してください'),
  expectedEffect: z.string()
    .min(1, '期待される効果は必須です')
    .max(1000, '期待される効果は1000文字以内で入力してください'),
});

export type CreateIdeaFormData = z.infer<typeof createIdeaSchema>;
```

```typescript
// schemas/evaluation.schema.ts
export const createEvaluationSchema = z.object({
  feasibilityScore: z.number()
    .int('整数で入力してください')
    .min(1, '1以上で入力してください')
    .max(10, '10以下で入力してください'),
  impactScore: z.number()
    .int('整数で入力してください')
    .min(1, '1以上で入力してください')
    .max(10, '10以下で入力してください'),
  innovationScore: z.number()
    .int('整数で入力してください')
    .min(1, '1以上で入力してください')
    .max(10, '10以下で入力してください'),
  comment: z.string()
    .max(1000, 'コメントは1000文字以内で入力してください')
    .optional(),
});
```

---

## ローカルストレージ

### 保存項目

| キー | 内容 | 用途 |
|------|------|------|
| `token` | JWTトークン | 認証 |

**注意**: ユーザー情報はトークンから取得するため、別途保存しない

---

*作成日: 2026-01-18*
