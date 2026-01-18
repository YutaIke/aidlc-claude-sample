# コンポーネントメソッド定義

## 概要

各コンポーネントのメソッドシグネチャを定義します。詳細なビジネスルールは機能設計（CONSTRUCTION フェーズ）で定義します。

---

## バックエンド - Controllers

### AuthController

| メソッド | HTTPメソッド | エンドポイント | 説明 |
|---------|-------------|---------------|------|
| `login` | POST | `/api/auth/login` | ユーザー認証、JWTトークン発行 |
| `logout` | POST | `/api/auth/logout` | ログアウト処理 |
| `me` | GET | `/api/auth/me` | 現在のユーザー情報取得 |
| `refresh` | POST | `/api/auth/refresh` | トークンリフレッシュ |

---

### UserController

| メソッド | HTTPメソッド | エンドポイント | 説明 |
|---------|-------------|---------------|------|
| `getAll` | GET | `/api/users` | ユーザー一覧取得 |
| `getById` | GET | `/api/users/:id` | ユーザー詳細取得 |
| `create` | POST | `/api/users` | ユーザー作成 |
| `update` | PUT | `/api/users/:id` | ユーザー更新 |
| `delete` | DELETE | `/api/users/:id` | ユーザー削除 |
| `updateRole` | PATCH | `/api/users/:id/role` | ロール変更 |
| `resetPassword` | PATCH | `/api/users/:id/password` | パスワードリセット |
| `getPanelMembers` | GET | `/api/users/panel-members` | パネルメンバー一覧取得 |

---

### IdeaController

| メソッド | HTTPメソッド | エンドポイント | 説明 |
|---------|-------------|---------------|------|
| `getAll` | GET | `/api/ideas` | 公開アイデア一覧取得 |
| `getById` | GET | `/api/ideas/:id` | アイデア詳細取得 |
| `getMyIdeas` | GET | `/api/ideas/my` | 自分のアイデア一覧取得 |
| `create` | POST | `/api/ideas` | アイデア作成 |
| `update` | PUT | `/api/ideas/:id` | アイデア更新 |
| `delete` | DELETE | `/api/ideas/:id` | アイデア削除 |
| `submit` | PATCH | `/api/ideas/:id/submit` | 下書きを提出 |
| `uploadImage` | POST | `/api/ideas/:id/images` | 画像アップロード |
| `deleteImage` | DELETE | `/api/ideas/:id/images/:imageId` | 画像削除 |

---

### EvaluationController

| メソッド | HTTPメソッド | エンドポイント | 説明 |
|---------|-------------|---------------|------|
| `getPendingIdeas` | GET | `/api/evaluations/pending` | 未評価アイデア一覧取得 |
| `getMyEvaluations` | GET | `/api/evaluations/my` | 自分の評価履歴取得 |
| `getByIdeaId` | GET | `/api/ideas/:id/evaluations` | アイデアの評価一覧取得 |
| `create` | POST | `/api/evaluations` | 評価登録 |
| `getIdeaScore` | GET | `/api/ideas/:id/score` | アイデアの最終スコア取得 |

---

### DashboardController

| メソッド | HTTPメソッド | エンドポイント | 説明 |
|---------|-------------|---------------|------|
| `getLeaderboard` | GET | `/api/dashboard/leaderboard` | リーダーボード取得 |
| `getStatistics` | GET | `/api/dashboard/statistics` | 統計情報取得 |
| `refresh` | POST | `/api/dashboard/refresh` | ダッシュボード手動更新 |

---

### RecognitionController

| メソッド | HTTPメソッド | エンドポイント | 説明 |
|---------|-------------|---------------|------|
| `getAll` | GET | `/api/recognitions` | 表彰一覧取得 |
| `create` | POST | `/api/recognitions` | 表彰実行 |
| `getMyRecognitions` | GET | `/api/recognitions/my` | 自分の表彰取得 |

---

## バックエンド - Services

### AuthService

```typescript
interface AuthService {
  // ユーザー認証とトークン発行
  login(username: string, password: string): Promise<{ token: string; user: User }>;

  // トークン検証
  verifyToken(token: string): Promise<User>;

  // トークンリフレッシュ
  refreshToken(token: string): Promise<{ token: string }>;

  // パスワードハッシュ化
  hashPassword(password: string): Promise<string>;

  // パスワード検証
  comparePassword(password: string, hash: string): Promise<boolean>;
}
```

---

### UserService

```typescript
interface UserService {
  // ユーザー一覧取得（フィルタリング対応）
  findAll(filter?: UserFilter): Promise<User[]>;

  // ユーザー詳細取得
  findById(id: number): Promise<User | null>;

  // ユーザー作成
  create(data: CreateUserDto): Promise<User>;

  // ユーザー更新
  update(id: number, data: UpdateUserDto): Promise<User>;

  // ユーザー削除
  delete(id: number): Promise<void>;

  // ロール変更
  updateRole(id: number, role: UserRole): Promise<User>;

  // パスワードリセット
  resetPassword(id: number, newPassword: string): Promise<void>;

  // パネルメンバー一覧取得
  findPanelMembers(): Promise<User[]>;
}
```

---

### IdeaService

```typescript
interface IdeaService {
  // 公開アイデア一覧取得
  findAllPublic(): Promise<Idea[]>;

  // 自分のアイデア一覧取得
  findByAuthor(authorId: number): Promise<Idea[]>;

  // アイデア詳細取得
  findById(id: number): Promise<Idea | null>;

  // アイデア作成（下書き/提出）
  create(data: CreateIdeaDto, authorId: number): Promise<Idea>;

  // アイデア更新（下書きのみ）
  update(id: number, data: UpdateIdeaDto): Promise<Idea>;

  // アイデア削除（下書きのみ）
  delete(id: number): Promise<void>;

  // 下書きを提出
  submit(id: number): Promise<Idea>;

  // 画像アップロード
  uploadImage(ideaId: number, file: File): Promise<IdeaImage>;

  // 画像削除
  deleteImage(ideaId: number, imageId: number): Promise<void>;
}
```

---

### EvaluationService

```typescript
interface EvaluationService {
  // 未評価アイデア一覧取得
  findPendingIdeas(evaluatorId: number): Promise<Idea[]>;

  // 自分の評価履歴取得
  findByEvaluator(evaluatorId: number): Promise<Evaluation[]>;

  // アイデアの評価一覧取得
  findByIdeaId(ideaId: number): Promise<Evaluation[]>;

  // 評価登録
  create(data: CreateEvaluationDto, evaluatorId: number): Promise<Evaluation>;

  // 最終スコア計算（最高・最低点除外の平均）
  calculateFinalScore(ideaId: number): Promise<number | null>;

  // 評価済みかチェック
  hasEvaluated(ideaId: number, evaluatorId: number): Promise<boolean>;
}
```

---

### DashboardService

```typescript
interface DashboardService {
  // リーダーボード取得
  getLeaderboard(): Promise<LeaderboardEntry[]>;

  // 統計情報取得
  getStatistics(): Promise<DashboardStatistics>;

  // ダッシュボード更新（スコア再計算）
  refresh(): Promise<void>;

  // 上位Nアイデア取得
  getTopIdeas(limit: number): Promise<Idea[]>;
}
```

---

### RecognitionService

```typescript
interface RecognitionService {
  // 表彰一覧取得
  findAll(): Promise<Recognition[]>;

  // 表彰実行（上位3アイデア）
  createRecognitions(): Promise<Recognition[]>;

  // 自分の表彰取得
  findByUserId(userId: number): Promise<Recognition[]>;

  // 通知生成
  notifyRecognizedUsers(recognitions: Recognition[]): Promise<void>;
}
```

---

## バックエンド - Repositories

### 共通インターフェース

```typescript
interface BaseRepository<T> {
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  create(data: Partial<T>): Promise<T>;
  update(id: number, data: Partial<T>): Promise<T>;
  delete(id: number): Promise<void>;
}
```

### 個別メソッド

| Repository | 追加メソッド | 説明 |
|-----------|-------------|------|
| UserRepository | `findByUsername(username: string)` | ユーザー名で検索 |
| UserRepository | `findByRole(role: UserRole)` | ロールで検索 |
| IdeaRepository | `findByAuthorId(authorId: number)` | 著者IDで検索 |
| IdeaRepository | `findByStatus(status: IdeaStatus)` | ステータスで検索 |
| EvaluationRepository | `findByIdeaId(ideaId: number)` | アイデアIDで検索 |
| EvaluationRepository | `findByEvaluatorId(evaluatorId: number)` | 評価者IDで検索 |
| RecognitionRepository | `findByIdeaId(ideaId: number)` | アイデアIDで検索 |

---

## 型定義

### DTOs（Data Transfer Objects）

```typescript
// ユーザー作成
interface CreateUserDto {
  username: string;
  password: string;
  role: 'employee' | 'panel_member' | 'admin';
}

// ユーザー更新
interface UpdateUserDto {
  username?: string;
  role?: 'employee' | 'panel_member' | 'admin';
}

// アイデア作成
interface CreateIdeaDto {
  title: string;
  description: string;
  expectedEffect: string;
  status: 'draft' | 'submitted';
}

// アイデア更新
interface UpdateIdeaDto {
  title?: string;
  description?: string;
  expectedEffect?: string;
}

// 評価作成
interface CreateEvaluationDto {
  ideaId: number;
  feasibilityScore: number;  // 1-10
  impactScore: number;       // 1-10
  innovationScore: number;   // 1-10
  comment?: string;
}
```

### レスポンス型

```typescript
// リーダーボードエントリ
interface LeaderboardEntry {
  rank: number;
  idea: Idea;
  finalScore: number;
  evaluationCount: number;
  isRecognized: boolean;
}

// ダッシュボード統計
interface DashboardStatistics {
  totalIdeas: number;
  totalEvaluations: number;
  totalUsers: number;
  averageScore: number;
}

// エラーレスポンス
interface ErrorResponse {
  error: {
    code: string;
    message: string;
  };
}
```

---

*作成日: 2026-01-17*
