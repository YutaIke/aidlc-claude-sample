# アプリケーション設計計画

## 計画概要

要件定義とユーザーストーリーを分析し、Ideation Portalのコンポーネント、メソッド、サービスを設計します。

---

## 設計ステップ

### Part 1: コンポーネント設計
- [x] Step 1: 認証コンポーネントの定義
- [x] Step 2: ユーザー管理コンポーネントの定義
- [x] Step 3: アイデア管理コンポーネントの定義
- [x] Step 4: 評価コンポーネントの定義
- [x] Step 5: ダッシュボードコンポーネントの定義
- [x] Step 6: 表彰コンポーネントの定義

### Part 2: メソッド設計
- [x] Step 7: 各コンポーネントのメソッドシグネチャ定義
- [x] Step 8: 入出力型の定義

### Part 3: サービス設計
- [x] Step 9: サービスレイヤーの定義
- [x] Step 10: サービス間のオーケストレーション設計

### Part 4: 依存関係設計
- [x] Step 11: コンポーネント依存関係マトリクス作成
- [x] Step 12: データフロー図作成

### Part 5: 成果物生成
- [x] Step 13: components.md の生成
- [x] Step 14: component-methods.md の生成
- [x] Step 15: services.md の生成
- [x] Step 16: component-dependency.md の生成
- [x] Step 17: 設計の整合性検証

---

## 設計質問

### Q1: アーキテクチャパターン

バックエンドのアーキテクチャパターンを選択してください。

A) レイヤードアーキテクチャ（Controller → Service → Repository）
B) クリーンアーキテクチャ（UseCase → Entity → Gateway）
C) シンプルなMVCパターン
D) Other (please describe after [Answer]: tag below)

[Answer]: A（レイヤードアーキテクチャ：Controller → Service → Repository）

---

### Q2: APIエンドポイント設計

REST APIのエンドポイント設計スタイルを選択してください。

A) リソースベース（/api/ideas, /api/users, /api/evaluations）
B) 機能ベース（/api/submitIdea, /api/evaluateIdea）
C) Other (please describe after [Answer]: tag below)

[Answer]: A（リソースベース、RESTful標準準拠）

---

### Q3: 認証トークン管理

認証トークンの管理方法を選択してください。

A) JWT（ステートレス、トークンに情報を含む）
B) セッションベース（サーバー側でセッション管理）
C) Other (please describe after [Answer]: tag below)

[Answer]: A（JWT、ステートレス認証）

---

### Q4: データアクセス層

データアクセス層の実装方法を選択してください。

A) ORM使用（Sequelize, Prismaなど）
B) SQLクエリビルダー使用（Knex.jsなど）
C) 生SQLクエリ
D) Other (please describe after [Answer]: tag below)

[Answer]: A（ORM使用、Prisma）

---

### Q5: バリデーション配置

入力バリデーションの配置場所を選択してください。

A) フロントエンドとバックエンド両方（二重バリデーション）
B) バックエンドのみ（セキュリティ重視）
C) Other (please describe after [Answer]: tag below)

[Answer]: A（フロントエンドとバックエンド両方）

---

### Q6: エラーハンドリング

エラーレスポンスの形式を選択してください。

A) 統一されたエラーレスポンス形式（{error: {code, message}}）
B) HTTPステータスコードのみ
C) Other (please describe after [Answer]: tag below)

[Answer]: A（統一されたエラーレスポンス形式）

---

## 回答サマリー

| 質問 | 回答 |
|------|------|
| Q1: アーキテクチャパターン | A) レイヤードアーキテクチャ |
| Q2: APIエンドポイント設計 | A) リソースベース（RESTful） |
| Q3: 認証トークン管理 | A) JWT |
| Q4: データアクセス層 | A) ORM使用（Prisma） |
| Q5: バリデーション配置 | A) 両方（二重バリデーション） |
| Q6: エラーハンドリング | A) 統一されたエラーレスポンス形式 |

---

*作成日: 2026-01-17*
