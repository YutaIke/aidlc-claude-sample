# ユニット定義

## 概要

Ideation Portalは2つのユニットで構成されます。

| ユニット | 技術スタック | 責務 |
|---------|-------------|------|
| **frontend** | React.js | ユーザーインターフェース、状態管理、API通信 |
| **backend** | Node.js + Express + Prisma | REST API、ビジネスロジック、データ永続化 |

---

## ユニット構成図

```
+------------------------------------------------------------------+
|                        Ideation Portal                            |
+------------------------------------------------------------------+
|                                                                   |
|  +-----------------------------+  +-----------------------------+ |
|  |     Unit: frontend          |  |      Unit: backend          | |
|  |     (React.js)              |  |      (Node.js)              | |
|  +-----------------------------+  +-----------------------------+ |
|  |                             |  |                             | |
|  |  src/                       |  |  src/                       | |
|  |  ├── components/            |  |  ├── controllers/           | |
|  |  ├── pages/                 |  |  ├── services/              | |
|  |  ├── hooks/                 |  |  ├── repositories/          | |
|  |  ├── contexts/              |  |  ├── middleware/            | |
|  |  ├── api/                   |  |  ├── prisma/                | |
|  |  └── utils/                 |  |  └── utils/                 | |
|  |                             |  |                             | |
|  +-----------------------------+  +-----------------------------+ |
|              |                              ^                     |
|              |        REST API (JSON)       |                     |
|              +----------------------------->+                     |
|                                                                   |
+------------------------------------------------------------------+
                                |
                                v
                       +------------------+
                       |     SQLite       |
                       |   (データベース)  |
                       +------------------+
```

---

## Unit 1: frontend

### 基本情報

| 項目 | 内容 |
|------|------|
| **ユニット名** | frontend |
| **技術スタック** | React.js, React Router, Axios, React Hook Form |
| **ディレクトリ** | `frontend/` |
| **ビルドツール** | Vite |
| **テストツール** | Vitest, React Testing Library |

### 責務

- ユーザーインターフェースの表示・操作
- フォーム入力とクライアント側バリデーション
- 認証状態の管理（JWT保持）
- バックエンドAPIとの通信
- ルーティング（ページ遷移）
- ロールに応じた画面表示制御

### ディレクトリ構成

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/               # APIクライアント
│   │   └── client.ts      # Axios設定、共通処理
│   ├── components/        # 再利用可能なUIコンポーネント
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── IdeaCard.tsx
│   │   ├── EvaluationForm.tsx
│   │   ├── LeaderboardTable.tsx
│   │   ├── UserForm.tsx
│   │   ├── Notification.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── ConfirmDialog.tsx
│   ├── contexts/          # Reactコンテキスト
│   │   └── AuthContext.tsx
│   ├── hooks/             # カスタムフック
│   │   ├── useAuth.ts
│   │   ├── useIdeas.ts
│   │   ├── useEvaluation.ts
│   │   ├── useUsers.ts
│   │   └── useDashboard.ts
│   ├── pages/             # ページコンポーネント
│   │   ├── LoginPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── IdeaListPage.tsx
│   │   ├── IdeaDetailPage.tsx
│   │   ├── IdeaFormPage.tsx
│   │   ├── MyIdeasPage.tsx
│   │   ├── EvaluationPage.tsx
│   │   ├── UserManagementPage.tsx
│   │   └── PanelManagementPage.tsx
│   ├── utils/             # ユーティリティ関数
│   │   └── validation.ts
│   ├── App.tsx            # ルートコンポーネント
│   ├── main.tsx           # エントリーポイント
│   └── index.css          # グローバルスタイル
├── package.json
├── vite.config.ts
└── tsconfig.json
```

### 主要な依存関係

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-router-dom": "^6.x",
    "axios": "^1.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x"
  },
  "devDependencies": {
    "vite": "^5.x",
    "typescript": "^5.x",
    "vitest": "^1.x",
    "@testing-library/react": "^14.x"
  }
}
```

---

## Unit 2: backend

### 基本情報

| 項目 | 内容 |
|------|------|
| **ユニット名** | backend |
| **技術スタック** | Node.js, Express, Prisma, JWT, bcrypt |
| **ディレクトリ** | `backend/` |
| **ビルドツール** | TypeScript (tsc) |
| **テストツール** | Jest |

### 責務

- REST APIエンドポイントの提供
- 認証・認可（JWT発行・検証）
- ビジネスロジックの実行
- データベースアクセス（Prisma ORM）
- 入力バリデーション
- エラーハンドリング

### ディレクトリ構成

```
backend/
├── prisma/
│   ├── schema.prisma      # データベーススキーマ
│   └── migrations/        # マイグレーションファイル
├── src/
│   ├── controllers/       # コントローラー層
│   │   ├── authController.ts
│   │   ├── userController.ts
│   │   ├── ideaController.ts
│   │   ├── evaluationController.ts
│   │   ├── dashboardController.ts
│   │   └── recognitionController.ts
│   ├── services/          # サービス層
│   │   ├── authService.ts
│   │   ├── userService.ts
│   │   ├── ideaService.ts
│   │   ├── evaluationService.ts
│   │   ├── dashboardService.ts
│   │   └── recognitionService.ts
│   ├── repositories/      # リポジトリ層
│   │   ├── userRepository.ts
│   │   ├── ideaRepository.ts
│   │   ├── evaluationRepository.ts
│   │   └── recognitionRepository.ts
│   ├── middleware/        # ミドルウェア
│   │   ├── authMiddleware.ts
│   │   ├── roleMiddleware.ts
│   │   └── errorMiddleware.ts
│   ├── routes/            # ルート定義
│   │   ├── authRoutes.ts
│   │   ├── userRoutes.ts
│   │   ├── ideaRoutes.ts
│   │   ├── evaluationRoutes.ts
│   │   ├── dashboardRoutes.ts
│   │   └── recognitionRoutes.ts
│   ├── utils/             # ユーティリティ
│   │   ├── errors.ts      # カスタムエラークラス
│   │   └── validation.ts  # バリデーションスキーマ
│   ├── types/             # 型定義
│   │   └── index.ts
│   ├── app.ts             # Expressアプリケーション設定
│   └── server.ts          # サーバー起動
├── uploads/               # 画像アップロード先
├── package.json
├── tsconfig.json
└── jest.config.js
```

### 主要な依存関係

```json
{
  "dependencies": {
    "express": "^4.x",
    "@prisma/client": "^5.x",
    "jsonwebtoken": "^9.x",
    "bcrypt": "^5.x",
    "zod": "^3.x",
    "multer": "^1.x",
    "cors": "^2.x"
  },
  "devDependencies": {
    "prisma": "^5.x",
    "typescript": "^5.x",
    "ts-node": "^10.x",
    "jest": "^29.x",
    "@types/express": "^4.x",
    "@types/jsonwebtoken": "^9.x",
    "@types/bcrypt": "^5.x"
  }
}
```

### データベーススキーマ（Prisma）

```prisma
// prisma/schema.prisma

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id          Int          @id @default(autoincrement())
  username    String       @unique
  password    String
  role        String       @default("employee")
  createdAt   DateTime     @default(now())
  ideas       Idea[]
  evaluations Evaluation[]
}

model Idea {
  id             Int          @id @default(autoincrement())
  title          String
  description    String
  expectedEffect String
  status         String       @default("draft")
  authorId       Int
  author         User         @relation(fields: [authorId], references: [id])
  createdAt      DateTime     @default(now())
  images         IdeaImage[]
  evaluations    Evaluation[]
  recognitions   Recognition[]
}

model IdeaImage {
  id        Int      @id @default(autoincrement())
  ideaId    Int
  idea      Idea     @relation(fields: [ideaId], references: [id])
  filePath  String
  createdAt DateTime @default(now())
}

model Evaluation {
  id               Int      @id @default(autoincrement())
  ideaId           Int
  idea             Idea     @relation(fields: [ideaId], references: [id])
  evaluatorId      Int
  evaluator        User     @relation(fields: [evaluatorId], references: [id])
  feasibilityScore Int
  impactScore      Int
  innovationScore  Int
  comment          String?
  createdAt        DateTime @default(now())

  @@unique([ideaId, evaluatorId])
}

model Recognition {
  id           Int      @id @default(autoincrement())
  ideaId       Int
  idea         Idea     @relation(fields: [ideaId], references: [id])
  rank         Int
  recognizedAt DateTime @default(now())
}
```

---

## コード配置ルール

| 配置場所 | 内容 |
|---------|------|
| `frontend/` | フロントエンドユニットのすべてのコード |
| `backend/` | バックエンドユニットのすべてのコード |
| `aidlc-docs/` | AI-DLCドキュメント（コードは配置しない） |

---

*作成日: 2026-01-17*
