# サービス定義

## 概要

サービスレイヤーは、ビジネスロジックのオーケストレーションを担当します。レイヤードアーキテクチャにおいて、Controller と Repository の間に位置し、複数のコンポーネントを協調させます。

---

## サービスアーキテクチャ

```
+------------------------------------------------------------------+
|                         Controllers                               |
|  AuthController | UserController | IdeaController | ...          |
+------------------------------------------------------------------+
         |                |                |
         v                v                v
+------------------------------------------------------------------+
|                          Services                                 |
|  +----------------+  +----------------+  +--------------------+  |
|  | AuthService    |  | UserService    |  | IdeaService        |  |
|  | - login        |  | - CRUD         |  | - CRUD             |  |
|  | - verifyToken  |  | - roleManage   |  | - imageManage      |  |
|  +----------------+  +----------------+  +--------------------+  |
|                                                                   |
|  +----------------+  +----------------+  +--------------------+  |
|  | EvaluationSvc  |  | DashboardSvc   |  | RecognitionSvc     |  |
|  | - evaluate     |  | - leaderboard  |  | - recognize        |  |
|  | - calcScore    |  | - statistics   |  | - notify           |  |
|  +----------------+  +----------------+  +--------------------+  |
+------------------------------------------------------------------+
         |                |                |
         v                v                v
+------------------------------------------------------------------+
|                        Repositories                               |
|  UserRepository | IdeaRepository | EvaluationRepository | ...    |
+------------------------------------------------------------------+
```

---

## サービス詳細

### 1. AuthService

**責務**: 認証・認可のビジネスロジック

| 項目 | 内容 |
|------|------|
| **主な責務** | JWT発行・検証、パスワード管理、セッション制御 |
| **依存Repository** | UserRepository |
| **オーケストレーション** | なし（単独で完結） |

**処理フロー - ログイン**:
```
1. ユーザー名でユーザー検索 (UserRepository)
2. パスワード検証 (bcrypt)
3. JWT生成 (jsonwebtoken)
4. トークンとユーザー情報を返却
```

---

### 2. UserService

**責務**: ユーザー管理のビジネスロジック

| 項目 | 内容 |
|------|------|
| **主な責務** | ユーザーCRUD、ロール管理、パネルメンバー任命 |
| **依存Repository** | UserRepository |
| **依存Service** | AuthService（パスワードハッシュ化） |

**処理フロー - ユーザー作成**:
```
1. ユーザー名の重複チェック (UserRepository)
2. パスワードハッシュ化 (AuthService)
3. ユーザー作成 (UserRepository)
4. 作成されたユーザーを返却
```

**処理フロー - ロール変更**:
```
1. ユーザー存在確認 (UserRepository)
2. ロール更新 (UserRepository)
3. 更新されたユーザーを返却
```

---

### 3. IdeaService

**責務**: アイデア管理のビジネスロジック

| 項目 | 内容 |
|------|------|
| **主な責務** | アイデアCRUD、下書き管理、画像管理 |
| **依存Repository** | IdeaRepository, IdeaImageRepository |
| **オーケストレーション** | 画像とアイデアの整合性管理 |

**処理フロー - アイデア提出**:
```
1. アイデア存在確認 (IdeaRepository)
2. ステータスが draft か確認
3. ステータスを submitted に更新 (IdeaRepository)
4. 更新されたアイデアを返却
```

**処理フロー - 画像アップロード**:
```
1. アイデア存在確認 (IdeaRepository)
2. ファイル形式・サイズ検証
3. ファイル保存（ローカルストレージ）
4. 画像レコード作成 (IdeaImageRepository)
5. 画像情報を返却
```

---

### 4. EvaluationService

**責務**: 評価のビジネスロジック

| 項目 | 内容 |
|------|------|
| **主な責務** | 評価登録、スコア計算、評価状況管理 |
| **依存Repository** | EvaluationRepository, IdeaRepository |
| **オーケストレーション** | スコア計算ロジック |

**処理フロー - 評価登録**:
```
1. アイデア存在確認 (IdeaRepository)
2. 重複評価チェック (EvaluationRepository)
3. スコア範囲検証（1-10）
4. 評価作成 (EvaluationRepository)
5. 作成された評価を返却
```

**処理フロー - 最終スコア計算**:
```
1. アイデアの全評価取得 (EvaluationRepository)
2. 評価数が3未満の場合は null を返却
3. 各基準ごとに最高・最低点を除外
4. 残りの平均を計算
5. 3基準の平均を最終スコアとして返却
```

---

### 5. DashboardService

**責務**: ダッシュボード・リーダーボードのビジネスロジック

| 項目 | 内容 |
|------|------|
| **主な責務** | リーダーボード生成、統計計算、手動更新 |
| **依存Repository** | IdeaRepository, EvaluationRepository, UserRepository |
| **依存Service** | EvaluationService（スコア計算） |

**処理フロー - リーダーボード生成**:
```
1. 提出済みアイデア一覧取得 (IdeaRepository)
2. 各アイデアの最終スコア計算 (EvaluationService)
3. スコア降順でソート
4. ランク付け（同点は同順位）
5. 表彰済みフラグ付与
6. リーダーボードを返却
```

**処理フロー - 統計情報取得**:
```
1. 総アイデア数取得 (IdeaRepository)
2. 総評価数取得 (EvaluationRepository)
3. 総ユーザー数取得 (UserRepository)
4. 平均スコア計算
5. 統計情報を返却
```

---

### 6. RecognitionService

**責務**: 表彰のビジネスロジック

| 項目 | 内容 |
|------|------|
| **主な責務** | 表彰実行、通知生成 |
| **依存Repository** | RecognitionRepository, IdeaRepository |
| **依存Service** | DashboardService（上位アイデア取得） |

**処理フロー - 表彰実行**:
```
1. リーダーボードから上位3アイデア取得 (DashboardService)
2. 既存の表彰をクリア (RecognitionRepository)
3. 上位3アイデアに対して表彰レコード作成 (RecognitionRepository)
4. 提出者への通知生成
5. 表彰結果を返却
```

---

## サービス間依存関係

```
+------------------+
|   AuthService    |
+------------------+
         ^
         |
+------------------+
|   UserService    |
+------------------+

+------------------+
|   IdeaService    |
+------------------+

+------------------+     +------------------+
| EvaluationService| --> | DashboardService |
+------------------+     +------------------+
                                  |
                                  v
                         +------------------+
                         |RecognitionService|
                         +------------------+
```

**依存の方向**:
- UserService → AuthService（パスワードハッシュ化）
- DashboardService → EvaluationService（スコア計算）
- RecognitionService → DashboardService（上位アイデア取得）

---

## 横断的関心事

### エラーハンドリング

全サービスで統一されたエラーレスポンス形式を使用：

```typescript
class AppError extends Error {
  constructor(
    public code: string,
    public message: string,
    public statusCode: number = 400
  ) {
    super(message);
  }
}

// 使用例
throw new AppError('AUTH_001', '認証に失敗しました', 401);
throw new AppError('IDEA_001', 'アイデアが見つかりません', 404);
throw new AppError('EVAL_001', 'すでに評価済みです', 400);
```

### バリデーション

サービス層でビジネスルールのバリデーションを実施：

```typescript
// EvaluationService での例
if (score < 1 || score > 10) {
  throw new AppError('EVAL_002', 'スコアは1〜10の範囲で入力してください');
}
```

### トランザクション管理

複数Repository操作時はPrismaのトランザクションを使用：

```typescript
// RecognitionService での例
await prisma.$transaction(async (tx) => {
  await tx.recognition.deleteMany({});
  await tx.recognition.createMany({ data: recognitions });
});
```

---

*作成日: 2026-01-17*
