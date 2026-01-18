# ユニット依存関係

## 概要

2つのユニット間の依存関係と通信パターンを定義します。

---

## 依存関係マトリクス

| 依存元 | 依存先 | 依存タイプ | 説明 |
|--------|--------|-----------|------|
| frontend | backend | REST API | HTTPリクエストでデータ取得・更新 |
| backend | SQLite | データベース | Prisma ORM経由でデータ永続化 |

---

## 依存関係図

```
+------------------+
|     frontend     |
|    (React.js)    |
+------------------+
         |
         | HTTP/REST (JSON)
         | - GET/POST/PUT/DELETE
         | - Authorization: Bearer <JWT>
         v
+------------------+
|     backend      |
|    (Node.js)     |
+------------------+
         |
         | SQL (Prisma ORM)
         v
+------------------+
|     SQLite       |
|   (dev.db)       |
+------------------+
```

---

## 通信インターフェース

### API エンドポイント一覧

| カテゴリ | エンドポイント | メソッド | 説明 |
|---------|---------------|---------|------|
| **認証** | `/api/auth/login` | POST | ログイン |
| | `/api/auth/logout` | POST | ログアウト |
| | `/api/auth/me` | GET | 現在のユーザー情報取得 |
| **ユーザー** | `/api/users` | GET | ユーザー一覧取得 |
| | `/api/users` | POST | ユーザー作成 |
| | `/api/users/:id` | GET | ユーザー詳細取得 |
| | `/api/users/:id` | PUT | ユーザー更新 |
| | `/api/users/:id` | DELETE | ユーザー削除 |
| | `/api/users/:id/role` | PATCH | ロール変更 |
| | `/api/users/panel-members` | GET | パネルメンバー一覧 |
| **アイデア** | `/api/ideas` | GET | 公開アイデア一覧 |
| | `/api/ideas` | POST | アイデア作成 |
| | `/api/ideas/my` | GET | 自分のアイデア一覧 |
| | `/api/ideas/:id` | GET | アイデア詳細 |
| | `/api/ideas/:id` | PUT | アイデア更新 |
| | `/api/ideas/:id` | DELETE | アイデア削除 |
| | `/api/ideas/:id/submit` | PATCH | 下書き提出 |
| | `/api/ideas/:id/images` | POST | 画像アップロード |
| | `/api/ideas/:id/images/:imageId` | DELETE | 画像削除 |
| **評価** | `/api/evaluations` | POST | 評価登録 |
| | `/api/evaluations/pending` | GET | 未評価アイデア一覧 |
| | `/api/evaluations/my` | GET | 自分の評価履歴 |
| | `/api/ideas/:id/evaluations` | GET | アイデアの評価一覧 |
| | `/api/ideas/:id/score` | GET | 最終スコア取得 |
| **ダッシュボード** | `/api/dashboard/leaderboard` | GET | リーダーボード |
| | `/api/dashboard/statistics` | GET | 統計情報 |
| | `/api/dashboard/refresh` | POST | 手動更新 |
| **表彰** | `/api/recognitions` | GET | 表彰一覧 |
| | `/api/recognitions` | POST | 表彰実行 |
| | `/api/recognitions/my` | GET | 自分の表彰 |

---

## リクエスト/レスポンス形式

### 共通ヘッダー

```
Content-Type: application/json
Authorization: Bearer <JWT Token>  (認証が必要なエンドポイント)
```

### 成功レスポンス

```json
{
  "data": { ... }
}
```

### エラーレスポンス

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "エラーメッセージ"
  }
}
```

### HTTPステータスコード

| コード | 意味 | 使用場面 |
|--------|------|---------|
| 200 | OK | 成功（GET, PUT, PATCH） |
| 201 | Created | 成功（POST - 作成） |
| 204 | No Content | 成功（DELETE） |
| 400 | Bad Request | バリデーションエラー |
| 401 | Unauthorized | 認証エラー |
| 403 | Forbidden | 権限エラー |
| 404 | Not Found | リソース未発見 |
| 500 | Internal Server Error | サーバーエラー |

---

## 開発時の起動順序

```
1. backend を起動
   cd backend
   npm run dev
   (http://localhost:3001 で起動)

2. frontend を起動
   cd frontend
   npm run dev
   (http://localhost:5173 で起動)
   (backend への API 呼び出しは proxy 設定で転送)
```

---

## CORS設定

```typescript
// backend/src/app.ts
import cors from 'cors';

app.use(cors({
  origin: 'http://localhost:5173',  // frontend の URL
  credentials: true
}));
```

---

## ビルド順序

```
1. backend をビルド
   cd backend
   npm run build
   npx prisma generate
   npx prisma migrate deploy

2. frontend をビルド
   cd frontend
   npm run build
   (dist/ フォルダに出力)

3. 統合
   backend が frontend/dist を静的ファイルとして配信
   または、別々に配信
```

---

## テスト依存関係

| ユニット | テストタイプ | 依存 |
|---------|------------|------|
| frontend | ユニットテスト | モックAPI |
| frontend | E2Eテスト | backend（実際のAPI） |
| backend | ユニットテスト | モックRepository |
| backend | 統合テスト | テスト用SQLite |

---

*作成日: 2026-01-17*
