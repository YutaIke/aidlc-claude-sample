# コンポーネント依存関係

## 概要

Ideation Portalのコンポーネント間依存関係と通信パターンを定義します。

---

## 全体アーキテクチャ図

```
+------------------------------------------------------------------+
|                      Client (Browser)                             |
+------------------------------------------------------------------+
                              |
                              | HTTP/REST
                              v
+------------------------------------------------------------------+
|                     Frontend (React.js)                           |
|                                                                   |
|  +------------------+     +------------------+                    |
|  |   AuthContext    |<--->|   API Client     |                    |
|  | (認証状態管理)    |     |   (Axios)        |                    |
|  +------------------+     +------------------+                    |
|           |                       |                               |
|           v                       v                               |
|  +------------------+     +------------------+                    |
|  |  Pages/Components|<--->|  Custom Hooks    |                    |
|  +------------------+     +------------------+                    |
+------------------------------------------------------------------+
                              |
                              | REST API (JSON)
                              v
+------------------------------------------------------------------+
|                     Backend (Node.js + Express)                   |
|                                                                   |
|  +------------------+                                             |
|  |   Middleware     |  (認証チェック、エラーハンドリング)          |
|  +------------------+                                             |
|           |                                                       |
|           v                                                       |
|  +------------------+     +------------------+                    |
|  |   Controllers    |---->|    Services      |                    |
|  +------------------+     +------------------+                    |
|                                   |                               |
|                                   v                               |
|                          +------------------+                     |
|                          |  Repositories    |                     |
|                          |    (Prisma)      |                     |
|                          +------------------+                     |
+------------------------------------------------------------------+
                              |
                              | SQL
                              v
+------------------------------------------------------------------+
|                     Database (SQLite)                             |
|  +----------+  +----------+  +----------+  +----------+          |
|  |   User   |  |   Idea   |  |Evaluation|  |Recognition|          |
|  +----------+  +----------+  +----------+  +----------+          |
|                     |                                             |
|                     v                                             |
|               +----------+                                        |
|               |IdeaImage |                                        |
|               +----------+                                        |
+------------------------------------------------------------------+
```

---

## バックエンド依存関係マトリクス

### Controller → Service 依存

| Controller | 依存するService |
|-----------|----------------|
| AuthController | AuthService |
| UserController | UserService |
| IdeaController | IdeaService |
| EvaluationController | EvaluationService |
| DashboardController | DashboardService |
| RecognitionController | RecognitionService |

### Service → Service 依存

| Service | 依存するService | 理由 |
|---------|----------------|------|
| UserService | AuthService | パスワードハッシュ化 |
| DashboardService | EvaluationService | スコア計算 |
| RecognitionService | DashboardService | 上位アイデア取得 |

### Service → Repository 依存

| Service | 依存するRepository |
|---------|-------------------|
| AuthService | UserRepository |
| UserService | UserRepository |
| IdeaService | IdeaRepository, IdeaImageRepository |
| EvaluationService | EvaluationRepository, IdeaRepository |
| DashboardService | IdeaRepository, EvaluationRepository, UserRepository |
| RecognitionService | RecognitionRepository, IdeaRepository |

---

## 依存関係図（詳細）

```
+----------------+
| AuthController |
+----------------+
        |
        v
+----------------+
|  AuthService   |
+----------------+
        |
        v
+----------------+
| UserRepository |
+----------------+

+----------------+
| UserController |
+----------------+
        |
        v
+----------------+     +----------------+
|  UserService   |---->|  AuthService   |
+----------------+     +----------------+
        |
        v
+----------------+
| UserRepository |
+----------------+

+----------------+
| IdeaController |
+----------------+
        |
        v
+----------------+
|  IdeaService   |
+----------------+
        |
        +-----------------+
        v                 v
+----------------+ +------------------+
| IdeaRepository | |IdeaImageRepository|
+----------------+ +------------------+

+----------------------+
| EvaluationController |
+----------------------+
        |
        v
+----------------------+
|  EvaluationService   |
+----------------------+
        |
        +-----------------+
        v                 v
+--------------------+ +----------------+
|EvaluationRepository| | IdeaRepository |
+--------------------+ +----------------+

+---------------------+
| DashboardController |
+---------------------+
        |
        v
+---------------------+     +--------------------+
|  DashboardService   |---->| EvaluationService  |
+---------------------+     +--------------------+
        |
        +------------------+------------------+
        v                  v                  v
+----------------+ +--------------------+ +----------------+
| IdeaRepository | |EvaluationRepository| | UserRepository |
+----------------+ +--------------------+ +----------------+

+-----------------------+
| RecognitionController |
+-----------------------+
        |
        v
+-----------------------+     +-------------------+
|  RecognitionService   |---->| DashboardService  |
+-----------------------+     +-------------------+
        |
        +-----------------+
        v                 v
+----------------------+ +----------------+
|RecognitionRepository | | IdeaRepository |
+----------------------+ +----------------+
```

---

## データフロー図

### ログインフロー

```
User                Frontend              Backend                 Database
 |                     |                     |                        |
 |---(1) Login Form--->|                     |                        |
 |                     |---(2) POST /login-->|                        |
 |                     |                     |---(3) Find User------->|
 |                     |                     |<--(4) User Data--------|
 |                     |                     |---(5) Verify Password  |
 |                     |                     |---(6) Generate JWT     |
 |                     |<--(7) JWT Token-----|                        |
 |<--(8) Store Token---|                     |                        |
 |<--(9) Redirect------|                     |                        |
```

### アイデア提出フロー

```
Employee            Frontend              Backend                 Database
 |                     |                     |                        |
 |---(1) Fill Form---->|                     |                        |
 |                     |---(2) Validate----->|                        |
 |                     |---(3) POST /ideas-->|                        |
 |                     |                     |---(4) Verify Auth----->|
 |                     |                     |---(5) Create Idea----->|
 |                     |                     |<--(6) Idea Created-----|
 |                     |<--(7) Success-------|                        |
 |<--(8) Show Message--|                     |                        |
```

### 評価フロー

```
PanelMember         Frontend              Backend                 Database
 |                     |                     |                        |
 |---(1) View Idea---->|                     |                        |
 |                     |---(2) GET /idea/:id>|                        |
 |                     |                     |---(3) Get Idea-------->|
 |                     |<--(4) Idea Data-----|                        |
 |<--(5) Show Idea-----|                     |                        |
 |---(6) Enter Scores->|                     |                        |
 |                     |---(7) POST /eval--->|                        |
 |                     |                     |---(8) Check Duplicate->|
 |                     |                     |---(9) Create Eval----->|
 |                     |<--(10) Success------|                        |
 |<--(11) Confirmed----|                     |                        |
```

### ダッシュボード更新フロー

```
Admin               Frontend              Backend                 Database
 |                     |                     |                        |
 |---(1) Click Refresh>|                     |                        |
 |                     |---(2) POST /refresh>|                        |
 |                     |                     |---(3) Get All Ideas--->|
 |                     |                     |<--(4) Ideas List-------|
 |                     |                     |---(5) Get Evaluations->|
 |                     |                     |<--(6) Eval Data--------|
 |                     |                     |---(7) Calculate Scores |
 |                     |                     |---(8) Sort & Rank      |
 |                     |<--(9) Leaderboard---|                        |
 |<--(10) Updated View-|                     |                        |
```

---

## フロントエンド依存関係

### コンテキスト依存

```
+------------------+
|    App.tsx       |
+------------------+
        |
        v
+------------------+
|  AuthProvider    |  (認証状態をアプリ全体に提供)
+------------------+
        |
        +------------------------+
        v                        v
+------------------+    +------------------+
|   Router         |    |   Header         |
+------------------+    | (useAuth使用)     |
        |               +------------------+
        v
+------------------+
|   Pages          |
| (useAuth使用)     |
+------------------+
```

### フック依存

| Custom Hook | 依存するContext/API |
|-------------|-------------------|
| useAuth | AuthContext, /api/auth/* |
| useIdeas | /api/ideas/* |
| useEvaluation | /api/evaluations/* |
| useUsers | /api/users/* |
| useDashboard | /api/dashboard/* |

### ページ → コンポーネント依存

| Page | 使用するComponents |
|------|-------------------|
| LoginPage | - |
| DashboardPage | Header, Sidebar, LeaderboardTable |
| IdeaListPage | Header, Sidebar, IdeaCard |
| IdeaDetailPage | Header, Sidebar, EvaluationForm (Panel) |
| IdeaFormPage | Header, Sidebar |
| MyIdeasPage | Header, Sidebar, IdeaCard |
| EvaluationPage | Header, Sidebar, EvaluationForm |
| UserManagementPage | Header, Sidebar, UserForm, ConfirmDialog |
| PanelManagementPage | Header, Sidebar, ConfirmDialog |

---

## 通信パターン

### API通信

| パターン | 説明 | 使用箇所 |
|---------|------|---------|
| REST | リソースベースのHTTP通信 | 全API |
| JSON | データ形式 | Request/Response Body |
| JWT Bearer | 認証トークン | Authorization Header |

### エラーハンドリング

```typescript
// フロントエンド（API Client）
try {
  const response = await api.post('/ideas', data);
  return response.data;
} catch (error) {
  if (error.response?.data?.error) {
    // 統一エラー形式
    throw new Error(error.response.data.error.message);
  }
  throw error;
}
```

### 認証フロー

```
1. ログイン成功 → JWT取得
2. JWTをlocalStorageに保存
3. 以降のリクエストでAuthorizationヘッダーに付与
4. 401エラー → ログイン画面にリダイレクト
```

---

## 依存性注入

### バックエンド（コンストラクタインジェクション）

```typescript
// Service層での例
class UserService {
  constructor(
    private userRepository: UserRepository,
    private authService: AuthService
  ) {}
}

// Controller層での例
class UserController {
  constructor(private userService: UserService) {}
}
```

### テスト時のモック

```typescript
// モックRepositoryの注入
const mockUserRepository = {
  findById: jest.fn(),
  create: jest.fn(),
  // ...
};

const userService = new UserService(mockUserRepository, mockAuthService);
```

---

*作成日: 2026-01-17*
