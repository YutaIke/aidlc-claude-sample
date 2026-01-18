# コンポーネント定義

## 概要

Ideation Portalは、レイヤードアーキテクチャ（Controller → Service → Repository）を採用し、フロントエンド（React.js）とバックエンド（Node.js）の2層構成で設計します。

---

## アーキテクチャ概要

```
+------------------------------------------------------------------+
|                        Frontend (React.js)                        |
|  +--------------------+  +--------------------+  +--------------+ |
|  |    Pages           |  |    Components      |  |   Hooks      | |
|  | - LoginPage        |  | - Header           |  | - useAuth    | |
|  | - DashboardPage    |  | - IdeaCard         |  | - useIdeas   | |
|  | - IdeaListPage     |  | - EvaluationForm   |  | - useEval    | |
|  | - IdeaDetailPage   |  | - LeaderboardTable |  |              | |
|  | - IdeaFormPage     |  | - UserForm         |  |              | |
|  | - MyIdeasPage      |  | - Notification     |  |              | |
|  | - EvaluationPage   |  |                    |  |              | |
|  | - UserMgmtPage     |  |                    |  |              | |
|  | - PanelMgmtPage    |  |                    |  |              | |
|  +--------------------+  +--------------------+  +--------------+ |
+------------------------------------------------------------------+
                              | REST API
                              v
+------------------------------------------------------------------+
|                        Backend (Node.js)                          |
|  +------------------------------------------------------------+  |
|  |                      Controllers                            |  |
|  |  AuthController | UserController | IdeaController          |  |
|  |  EvaluationController | DashboardController | RecogController|  |
|  +------------------------------------------------------------+  |
|                              |                                    |
|  +------------------------------------------------------------+  |
|  |                       Services                              |  |
|  |  AuthService | UserService | IdeaService                   |  |
|  |  EvaluationService | DashboardService | RecognitionService |  |
|  +------------------------------------------------------------+  |
|                              |                                    |
|  +------------------------------------------------------------+  |
|  |                      Repositories (Prisma)                  |  |
|  |  UserRepository | IdeaRepository | EvaluationRepository    |  |
|  |  RecognitionRepository                                      |  |
|  +------------------------------------------------------------+  |
+------------------------------------------------------------------+
                              |
                              v
+------------------------------------------------------------------+
|                        Database (SQLite)                          |
|  User | Idea | IdeaImage | Evaluation | Recognition              |
+------------------------------------------------------------------+
```

---

## バックエンドコンポーネント

### 1. AuthController / AuthService

**責務**: ユーザー認証・認可の処理

| 項目 | 内容 |
|------|------|
| **コンポーネント名** | Auth |
| **レイヤー** | Controller, Service |
| **責務** | ログイン、ログアウト、JWT発行・検証、ロールベース認可 |
| **関連ストーリー** | US-001, US-002, US-003 |

**主な機能**:
- ユーザー名/パスワードによる認証
- JWTトークンの発行・更新
- トークン検証ミドルウェア
- ロールベースのアクセス制御

---

### 2. UserController / UserService / UserRepository

**責務**: ユーザーアカウント管理

| 項目 | 内容 |
|------|------|
| **コンポーネント名** | User |
| **レイヤー** | Controller, Service, Repository |
| **責務** | ユーザーCRUD、ロール管理、パネルメンバー任命 |
| **関連ストーリー** | US-014, US-015, US-016 |

**主な機能**:
- ユーザー作成・編集・削除
- ロール変更（従業員 ↔ パネルメンバー ↔ 管理者）
- パスワードリセット
- ユーザー一覧・検索

---

### 3. IdeaController / IdeaService / IdeaRepository

**責務**: アイデア管理

| 項目 | 内容 |
|------|------|
| **コンポーネント名** | Idea |
| **レイヤー** | Controller, Service, Repository |
| **責務** | アイデアCRUD、下書き管理、画像添付、公開一覧 |
| **関連ストーリー** | US-004, US-005, US-006, US-007, US-008 |

**主な機能**:
- アイデア作成（下書き/提出）
- アイデア編集・削除（下書きのみ）
- 画像アップロード・管理
- アイデア一覧取得（公開/自分のみ）
- アイデア詳細取得

---

### 4. EvaluationController / EvaluationService / EvaluationRepository

**責務**: アイデア評価

| 項目 | 内容 |
|------|------|
| **コンポーネント名** | Evaluation |
| **レイヤー** | Controller, Service, Repository |
| **責務** | スコア入力、フィードバック、評価状況管理 |
| **関連ストーリー** | US-009, US-010, US-011, US-012, US-013 |

**主な機能**:
- 評価登録（3基準のスコア + フィードバック）
- 評価対象アイデア一覧（未評価/評価済み）
- 評価履歴参照
- 評価結果・フィードバック閲覧（提出者向け）

---

### 5. DashboardController / DashboardService

**責務**: ダッシュボード・リーダーボード

| 項目 | 内容 |
|------|------|
| **コンポーネント名** | Dashboard |
| **レイヤー** | Controller, Service |
| **責務** | スコア集計、ランキング計算、手動更新 |
| **関連ストーリー** | US-017 |

**主な機能**:
- 最終スコア計算（最高・最低点除外の平均）
- リーダーボード生成
- ダッシュボード手動更新トリガー
- 統計情報取得

---

### 6. RecognitionController / RecognitionService / RecognitionRepository

**責務**: 表彰管理

| 項目 | 内容 |
|------|------|
| **コンポーネント名** | Recognition |
| **レイヤー** | Controller, Service, Repository |
| **責務** | 上位3アイデアの表彰、通知 |
| **関連ストーリー** | US-018 |

**主な機能**:
- 表彰実行（上位3アイデア）
- 表彰履歴管理
- 表彰通知生成

---

## フロントエンドコンポーネント

### ページコンポーネント

| ページ名 | 責務 | 対象ユーザー |
|---------|------|-------------|
| **LoginPage** | ログインフォーム表示、認証処理 | 全ユーザー |
| **DashboardPage** | リーダーボード、統計表示 | 全ユーザー |
| **IdeaListPage** | 公開アイデア一覧表示 | 全ユーザー |
| **IdeaDetailPage** | アイデア詳細、評価結果表示 | 全ユーザー |
| **IdeaFormPage** | アイデア入力フォーム | 一般従業員 |
| **MyIdeasPage** | 自分のアイデア一覧 | 一般従業員 |
| **EvaluationPage** | 評価入力フォーム | パネルメンバー |
| **UserManagementPage** | ユーザー管理画面 | 管理者 |
| **PanelManagementPage** | パネルメンバー管理画面 | 管理者 |

### 共通コンポーネント

| コンポーネント名 | 責務 |
|-----------------|------|
| **Header** | ナビゲーション、ログアウトボタン、ユーザー情報表示 |
| **Sidebar** | ロール別メニュー表示 |
| **IdeaCard** | アイデアのカード形式表示 |
| **EvaluationForm** | 評価入力フォーム（3基準 + コメント） |
| **LeaderboardTable** | ランキングテーブル |
| **UserForm** | ユーザー作成・編集フォーム |
| **Notification** | 通知メッセージ表示 |
| **LoadingSpinner** | ローディング表示 |
| **ErrorMessage** | エラーメッセージ表示 |
| **ConfirmDialog** | 確認ダイアログ |

### カスタムフック

| フック名 | 責務 |
|---------|------|
| **useAuth** | 認証状態管理、ログイン/ログアウト処理 |
| **useIdeas** | アイデア一覧・詳細の取得・更新 |
| **useEvaluation** | 評価データの取得・登録 |
| **useUsers** | ユーザー一覧・管理 |
| **useDashboard** | ダッシュボードデータ取得 |

---

## 技術スタック詳細

| レイヤー | 技術 | 用途 |
|---------|------|------|
| フロントエンド | React.js | UIフレームワーク |
| 状態管理 | React Context / useState | グローバル状態管理 |
| HTTPクライアント | Axios | API通信 |
| フォーム管理 | React Hook Form | フォームバリデーション |
| バックエンド | Node.js + Express | APIサーバー |
| ORM | Prisma | データアクセス |
| 認証 | jsonwebtoken | JWT発行・検証 |
| パスワード | bcrypt | パスワードハッシュ化 |
| バリデーション | Zod | スキーマバリデーション |
| データベース | SQLite | データ永続化 |

---

*作成日: 2026-01-17*
