# backend ドメインエンティティ

## 概要

backend ユニットのドメインエンティティ（データモデル）の詳細定義です。

---

## エンティティ関連図

```
+------------------+
|      User        |
+------------------+
| id               |
| username         |
| password         |
| role             |
| isDeleted        |
| createdAt        |
+------------------+
        |
        | 1:N (author)
        v
+------------------+       +------------------+
|      Idea        |------>|    IdeaImage     |
+------------------+ 1:N   +------------------+
| id               |       | id               |
| title            |       | ideaId           |
| description      |       | filePath         |
| expectedEffect   |       | createdAt        |
| status           |       +------------------+
| authorId         |
| createdAt        |
+------------------+
        |
        | 1:N
        v
+------------------+       +------------------+
|   Evaluation     |       |   Recognition    |
+------------------+       +------------------+
| id               |       | id               |
| ideaId           |       | ideaId           |
| evaluatorId      |       | rank             |
| feasibilityScore |       | recognizedAt     |
| impactScore      |       +------------------+
| innovationScore  |              ^
| comment          |              |
| createdAt        |              | 1:N
+------------------+              |
        ^                  +------+
        |
        | N:1 (evaluator)
        |
+-------+
|
User
```

---

## 1. User（ユーザー）

### 定義

| フィールド | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| id | Integer | ○ | auto | 主キー、自動採番 |
| username | String | ○ | - | ユーザー名（一意） |
| password | String | ○ | - | ハッシュ化されたパスワード |
| role | String | ○ | 'employee' | ロール（employee/panel_member/admin） |
| isDeleted | Boolean | ○ | false | 論理削除フラグ |
| createdAt | DateTime | ○ | now() | 作成日時 |

### 制約

- `username` は一意（UNIQUE制約）
- `username` は大文字小文字を区別しない
- `role` は列挙値のみ許可

### リレーション

| 関連先 | 関連タイプ | 外部キー | 説明 |
|--------|----------|---------|------|
| Idea | 1:N | Idea.authorId | 提出したアイデア |
| Evaluation | 1:N | Evaluation.evaluatorId | 行った評価 |

### Prisma スキーマ

```prisma
model User {
  id          Int          @id @default(autoincrement())
  username    String       @unique
  password    String
  role        String       @default("employee")
  isDeleted   Boolean      @default(false)
  createdAt   DateTime     @default(now())
  ideas       Idea[]
  evaluations Evaluation[]
}
```

---

## 2. Idea（アイデア）

### 定義

| フィールド | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| id | Integer | ○ | auto | 主キー、自動採番 |
| title | String | ○ | - | タイトル（1-100文字） |
| description | String | ○ | - | 説明文（1-2000文字） |
| expectedEffect | String | ○ | - | 期待される効果（1-1000文字） |
| status | String | ○ | 'draft' | ステータス（draft/submitted） |
| authorId | Integer | ○ | - | 著者のユーザーID |
| createdAt | DateTime | ○ | now() | 作成日時 |

### 制約

- `status` は列挙値のみ許可（draft, submitted）
- `authorId` は User.id を参照

### リレーション

| 関連先 | 関連タイプ | 外部キー | 説明 |
|--------|----------|---------|------|
| User | N:1 | authorId | 著者 |
| IdeaImage | 1:N | IdeaImage.ideaId | 添付画像 |
| Evaluation | 1:N | Evaluation.ideaId | 受けた評価 |
| Recognition | 1:N | Recognition.ideaId | 表彰 |

### Prisma スキーマ

```prisma
model Idea {
  id             Int           @id @default(autoincrement())
  title          String
  description    String
  expectedEffect String
  status         String        @default("draft")
  authorId       Int
  author         User          @relation(fields: [authorId], references: [id])
  createdAt      DateTime      @default(now())
  images         IdeaImage[]
  evaluations    Evaluation[]
  recognitions   Recognition[]
}
```

---

## 3. IdeaImage（アイデア画像）

### 定義

| フィールド | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| id | Integer | ○ | auto | 主キー、自動採番 |
| ideaId | Integer | ○ | - | アイデアID |
| filePath | String | ○ | - | ファイルパス |
| createdAt | DateTime | ○ | now() | アップロード日時 |

### 制約

- `ideaId` は Idea.id を参照
- アイデア削除時にカスケード削除

### リレーション

| 関連先 | 関連タイプ | 外部キー | 説明 |
|--------|----------|---------|------|
| Idea | N:1 | ideaId | 所属アイデア |

### Prisma スキーマ

```prisma
model IdeaImage {
  id        Int      @id @default(autoincrement())
  ideaId    Int
  idea      Idea     @relation(fields: [ideaId], references: [id], onDelete: Cascade)
  filePath  String
  createdAt DateTime @default(now())
}
```

---

## 4. Evaluation（評価）

### 定義

| フィールド | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| id | Integer | ○ | auto | 主キー、自動採番 |
| ideaId | Integer | ○ | - | 評価対象アイデアID |
| evaluatorId | Integer | ○ | - | 評価者のユーザーID |
| feasibilityScore | Integer | ○ | - | 実現可能性スコア（1-10） |
| impactScore | Integer | ○ | - | インパクトスコア（1-10） |
| innovationScore | Integer | ○ | - | 革新性スコア（1-10） |
| comment | String | × | null | フィードバックコメント |
| createdAt | DateTime | ○ | now() | 評価日時 |

### 制約

- `ideaId` は Idea.id を参照
- `evaluatorId` は User.id を参照
- `(ideaId, evaluatorId)` の組み合わせは一意（1人1回のみ評価可能）
- スコアは 1-10 の範囲

### リレーション

| 関連先 | 関連タイプ | 外部キー | 説明 |
|--------|----------|---------|------|
| Idea | N:1 | ideaId | 評価対象アイデア |
| User | N:1 | evaluatorId | 評価者 |

### Prisma スキーマ

```prisma
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
```

---

## 5. Recognition（表彰）

### 定義

| フィールド | 型 | 必須 | デフォルト | 説明 |
|-----------|-----|------|-----------|------|
| id | Integer | ○ | auto | 主キー、自動採番 |
| ideaId | Integer | ○ | - | 表彰対象アイデアID |
| rank | Integer | ○ | - | 順位（1, 2, 3） |
| recognizedAt | DateTime | ○ | now() | 表彰日時 |

### 制約

- `ideaId` は Idea.id を参照
- `rank` は 1, 2, 3 のいずれか

### リレーション

| 関連先 | 関連タイプ | 外部キー | 説明 |
|--------|----------|---------|------|
| Idea | N:1 | ideaId | 表彰対象アイデア |

### Prisma スキーマ

```prisma
model Recognition {
  id           Int      @id @default(autoincrement())
  ideaId       Int
  idea         Idea     @relation(fields: [ideaId], references: [id])
  rank         Int
  recognizedAt DateTime @default(now())
}
```

---

## 完全なPrismaスキーマ

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
  isDeleted   Boolean      @default(false)
  createdAt   DateTime     @default(now())
  ideas       Idea[]
  evaluations Evaluation[]
}

model Idea {
  id             Int           @id @default(autoincrement())
  title          String
  description    String
  expectedEffect String
  status         String        @default("draft")
  authorId       Int
  author         User          @relation(fields: [authorId], references: [id])
  createdAt      DateTime      @default(now())
  images         IdeaImage[]
  evaluations    Evaluation[]
  recognitions   Recognition[]
}

model IdeaImage {
  id        Int      @id @default(autoincrement())
  ideaId    Int
  idea      Idea     @relation(fields: [ideaId], references: [id], onDelete: Cascade)
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

*作成日: 2026-01-17*
