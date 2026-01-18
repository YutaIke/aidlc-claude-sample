# ユニット - ストーリーマッピング

## 概要

18件のユーザーストーリーと2つのユニット（frontend, backend）の対応関係を定義します。

---

## マッピングサマリー

| ユニット | ストーリー数 | 主な責務 |
|---------|-------------|---------|
| **frontend** | 18件 | UI表示、フォーム入力、状態管理 |
| **backend** | 18件 | API提供、ビジネスロジック、データ永続化 |

**注**: すべてのストーリーは両ユニットで実装が必要です（フルスタック）。

---

## ストーリーマッピング詳細

### 共通ストーリー（認証）

| ストーリーID | タイトル | frontend | backend |
|-------------|---------|----------|---------|
| US-001 | ユーザーログイン | LoginPage, useAuth | AuthController, AuthService |
| US-002 | ユーザーログアウト | Header (logout button), useAuth | AuthController |
| US-003 | ロールに応じた画面表示 | Sidebar, PrivateRoute | authMiddleware, roleMiddleware |

---

### 一般従業員ストーリー

| ストーリーID | タイトル | frontend | backend |
|-------------|---------|----------|---------|
| US-004 | アイデア一覧の閲覧 | IdeaListPage, IdeaCard, useIdeas | IdeaController.getAll |
| US-005 | 新規アイデアの提出 | IdeaFormPage, useIdeas | IdeaController.create |
| US-006 | アイデアの下書き保存 | IdeaFormPage (draft mode) | IdeaController.create (status=draft) |
| US-007 | アイデアへの画像添付 | IdeaFormPage (image upload) | IdeaController.uploadImage |
| US-008 | 自分のアイデア管理 | MyIdeasPage, IdeaCard | IdeaController.getMyIdeas |
| US-009 | 評価結果とフィードバックの閲覧 | IdeaDetailPage (score display) | EvaluationController.getByIdeaId |

---

### 評価パネルメンバーストーリー

| ストーリーID | タイトル | frontend | backend |
|-------------|---------|----------|---------|
| US-010 | 評価対象アイデアの確認 | EvaluationPage (pending list) | EvaluationController.getPendingIdeas |
| US-011 | アイデアへのスコア入力 | EvaluationForm | EvaluationController.create |
| US-012 | フィードバックコメントの入力 | EvaluationForm (comment field) | EvaluationController.create |
| US-013 | 自分の評価履歴の確認 | EvaluationPage (history tab) | EvaluationController.getMyEvaluations |

---

### 管理者ストーリー

| ストーリーID | タイトル | frontend | backend |
|-------------|---------|----------|---------|
| US-014 | ユーザーアカウントの作成 | UserManagementPage, UserForm | UserController.create |
| US-015 | ユーザーアカウントの編集・削除 | UserManagementPage, UserForm, ConfirmDialog | UserController.update, delete |
| US-016 | パネルメンバーの任命 | PanelManagementPage | UserController.updateRole |
| US-017 | ダッシュボードの更新 | DashboardPage (refresh button) | DashboardController.refresh |
| US-018 | 上位アイデアの表彰 | DashboardPage (recognize button) | RecognitionController.create |

---

## ユニット別実装一覧

### Unit: frontend

#### 実装対象ページ

| ページ | 関連ストーリー | 優先度 |
|--------|--------------|--------|
| LoginPage | US-001 | Must |
| DashboardPage | US-017, US-018 | Must |
| IdeaListPage | US-004 | Must |
| IdeaDetailPage | US-009 | Must |
| IdeaFormPage | US-005, US-006, US-007 | Must |
| MyIdeasPage | US-008 | Must |
| EvaluationPage | US-010, US-011, US-012, US-013 | Must |
| UserManagementPage | US-014, US-015 | Must |
| PanelManagementPage | US-016 | Must |

#### 実装対象コンポーネント

| コンポーネント | 関連ストーリー |
|--------------|--------------|
| Header | US-002, US-003 |
| Sidebar | US-003 |
| IdeaCard | US-004, US-008 |
| EvaluationForm | US-011, US-012 |
| LeaderboardTable | US-017 |
| UserForm | US-014, US-015 |
| ConfirmDialog | US-015 |
| Notification | US-018 |

#### 実装対象フック

| フック | 関連ストーリー |
|-------|--------------|
| useAuth | US-001, US-002, US-003 |
| useIdeas | US-004, US-005, US-006, US-007, US-008 |
| useEvaluation | US-009, US-010, US-011, US-012, US-013 |
| useUsers | US-014, US-015, US-016 |
| useDashboard | US-017, US-018 |

---

### Unit: backend

#### 実装対象Controller

| Controller | 関連ストーリー | 優先度 |
|-----------|--------------|--------|
| AuthController | US-001, US-002 | Must |
| UserController | US-014, US-015, US-016 | Must |
| IdeaController | US-004, US-005, US-006, US-007, US-008 | Must |
| EvaluationController | US-009, US-010, US-011, US-012, US-013 | Must |
| DashboardController | US-017 | Should |
| RecognitionController | US-018 | Must |

#### 実装対象Service

| Service | 関連ストーリー |
|---------|--------------|
| AuthService | US-001, US-002 |
| UserService | US-014, US-015, US-016 |
| IdeaService | US-004, US-005, US-006, US-007, US-008 |
| EvaluationService | US-009, US-010, US-011, US-012, US-013 |
| DashboardService | US-017 |
| RecognitionService | US-018 |

#### 実装対象Repository

| Repository | 関連エンティティ |
|-----------|----------------|
| UserRepository | User |
| IdeaRepository | Idea, IdeaImage |
| EvaluationRepository | Evaluation |
| RecognitionRepository | Recognition |

---

## 実装順序（推奨）

### Phase 1: 基盤（Must - 認証・基本機能）

```
backend:
  1. Prisma セットアップ、スキーマ定義
  2. AuthController/Service（US-001, US-002）
  3. UserController/Service（US-014）
  4. IdeaController/Service（US-004, US-005）

frontend:
  1. プロジェクトセットアップ
  2. AuthContext, useAuth（US-001, US-002, US-003）
  3. LoginPage（US-001）
  4. DashboardPage（基本表示）
  5. IdeaListPage（US-004）
  6. IdeaFormPage（US-005）
```

### Phase 2: コア機能（Must - 評価・管理）

```
backend:
  5. IdeaController/Service 拡張（US-006, US-007, US-008）
  6. EvaluationController/Service（US-010, US-011, US-012）
  7. UserController 拡張（US-015, US-016）

frontend:
  7. MyIdeasPage（US-008）
  8. IdeaFormPage 拡張（US-006, US-007）
  9. EvaluationPage（US-010, US-011, US-012）
  10. UserManagementPage（US-014, US-015）
  11. PanelManagementPage（US-016）
```

### Phase 3: 追加機能（Should/Could）

```
backend:
  8. EvaluationController 拡張（US-009, US-013）
  9. DashboardController/Service（US-017）
  10. RecognitionController/Service（US-018）

frontend:
  12. IdeaDetailPage 拡張（US-009）
  13. EvaluationPage 履歴タブ（US-013）
  14. DashboardPage 更新・表彰（US-017, US-018）
```

---

## 優先度別サマリー

| 優先度 | ストーリー数 | ストーリーID |
|--------|------------|-------------|
| **Must** | 10 | US-001, US-002, US-003, US-004, US-005, US-008, US-010, US-011, US-014, US-018 |
| **Should** | 5 | US-006, US-007, US-012, US-015, US-017 |
| **Could** | 3 | US-009, US-013, US-016 |

---

*作成日: 2026-01-17*
