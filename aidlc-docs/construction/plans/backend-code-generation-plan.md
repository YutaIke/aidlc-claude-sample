# backend コード生成計画

## 計画概要

backend ユニットのコードを生成します。機能設計で定義したビジネスロジック、ビジネスルール、ドメインエンティティに基づいて実装します。

**技術スタック**:
- ランタイム: Node.js
- フレームワーク: Express.js
- ORM: Prisma
- 認証: JWT (jsonwebtoken)
- パスワード: bcrypt
- バリデーション: Zod

**コード配置**:
- ワークスペースルート: `/Users/yuta/workspace/aidlc-sample`
- バックエンドコード: `/Users/yuta/workspace/aidlc-sample/backend/`

---

## 生成ステップ

### Part 1: プロジェクトセットアップ
- [ ] Step 1: プロジェクト構造の作成
- [ ] Step 2: package.json の生成
- [ ] Step 3: TypeScript設定（tsconfig.json）
- [ ] Step 4: Prismaスキーマの生成

### Part 2: 共通基盤
- [ ] Step 5: エラーハンドリング（errors/）
- [ ] Step 6: ミドルウェア（middleware/）
- [ ] Step 7: バリデーションスキーマ（schemas/）
- [ ] Step 8: 型定義（types/）

### Part 3: リポジトリ層
- [ ] Step 9: UserRepository
- [ ] Step 10: IdeaRepository
- [ ] Step 11: EvaluationRepository
- [ ] Step 12: RecognitionRepository

### Part 4: サービス層
- [ ] Step 13: AuthService
- [ ] Step 14: UserService
- [ ] Step 15: IdeaService
- [ ] Step 16: EvaluationService
- [ ] Step 17: DashboardService
- [ ] Step 18: RecognitionService

### Part 5: コントローラー層
- [ ] Step 19: AuthController
- [ ] Step 20: UserController
- [ ] Step 21: IdeaController
- [ ] Step 22: EvaluationController
- [ ] Step 23: DashboardController
- [ ] Step 24: RecognitionController

### Part 6: アプリケーション統合
- [ ] Step 25: ルーター設定（routes/）
- [ ] Step 26: アプリケーションエントリーポイント（app.ts）
- [ ] Step 27: サーバー起動（server.ts）

### Part 7: データベース初期化
- [ ] Step 28: シードデータ（prisma/seed.ts）

---

## ディレクトリ構成

```
backend/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── idea.controller.ts
│   │   ├── evaluation.controller.ts
│   │   ├── dashboard.controller.ts
│   │   └── recognition.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── idea.service.ts
│   │   ├── evaluation.service.ts
│   │   ├── dashboard.service.ts
│   │   └── recognition.service.ts
│   ├── repositories/
│   │   ├── user.repository.ts
│   │   ├── idea.repository.ts
│   │   ├── evaluation.repository.ts
│   │   └── recognition.repository.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── error.middleware.ts
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   ├── user.schema.ts
│   │   ├── idea.schema.ts
│   │   └── evaluation.schema.ts
│   ├── errors/
│   │   └── AppError.ts
│   ├── types/
│   │   └── index.ts
│   ├── routes/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── .env.example
```

---

## ストーリーマッピング

| ストーリーID | タイトル | 関連ステップ |
|-------------|---------|-------------|
| US-001 | ユーザーログイン | Step 6, 13, 19 |
| US-002 | ユーザーログアウト | Step 13, 19 |
| US-003 | ロールに応じた画面表示 | Step 6 |
| US-004 | アイデア一覧の閲覧 | Step 10, 15, 21 |
| US-005 | 新規アイデアの提出 | Step 10, 15, 21 |
| US-006 | アイデアの下書き保存 | Step 10, 15, 21 |
| US-007 | アイデアへの画像添付 | Step 10, 15, 21 |
| US-008 | 自分のアイデア管理 | Step 10, 15, 21 |
| US-009 | 評価結果とフィードバックの閲覧 | Step 11, 16, 22 |
| US-010 | 評価対象アイデアの確認 | Step 11, 16, 22 |
| US-011 | アイデアへのスコア入力 | Step 11, 16, 22 |
| US-012 | フィードバックコメントの入力 | Step 11, 16, 22 |
| US-013 | 自分の評価履歴の確認 | Step 11, 16, 22 |
| US-014 | ユーザーアカウントの作成 | Step 9, 14, 20 |
| US-015 | ユーザーアカウントの編集・削除 | Step 9, 14, 20 |
| US-016 | パネルメンバーの任命 | Step 9, 14, 20 |
| US-017 | ダッシュボードの更新 | Step 17, 23 |
| US-018 | 上位アイデアの表彰 | Step 12, 18, 24 |

---

*作成日: 2026-01-18*
