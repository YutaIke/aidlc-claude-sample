# frontend コンポーネント動作仕様

## 概要

frontend ユニットの各コンポーネントの動作仕様を定義します。

---

## レイアウトコンポーネント

### 1. Header

**責務**: ナビゲーション、ユーザー情報表示、ログアウト

**Props**:
```typescript
interface HeaderProps {
  user: User | null;
  onLogout: () => void;
}
```

**動作仕様**:
| イベント | 動作 |
|---------|------|
| ロゴクリック | ダッシュボードへ遷移 |
| ユーザー名クリック | ドロップダウンメニュー表示 |
| ログアウトクリック | ログアウト処理実行、ログインページへ遷移 |

**表示条件**:
- 未認証時: 非表示（ログインページでは表示しない）
- 認証済み: ユーザー名とロールを表示

---

### 2. Sidebar

**責務**: ロール別メニュー表示

**Props**:
```typescript
interface SidebarProps {
  userRole: 'employee' | 'panel_member' | 'admin';
  currentPath: string;
}
```

**メニュー項目**:
| メニュー | パス | employee | panel_member | admin |
|---------|------|----------|--------------|-------|
| ダッシュボード | /dashboard | ○ | ○ | ○ |
| アイデア一覧 | /ideas | ○ | ○ | ○ |
| マイアイデア | /my-ideas | ○ | ○ | ○ |
| 新規アイデア | /ideas/new | ○ | ○ | ○ |
| 評価 | /evaluations | - | ○ | ○ |
| ユーザー管理 | /admin/users | - | - | ○ |
| パネル管理 | /admin/panels | - | - | ○ |

**動作仕様**:
- 現在のパスに対応するメニューをハイライト
- ロールに応じてメニュー項目をフィルタリング

---

## フォームコンポーネント

### 3. EvaluationForm

**責務**: アイデア評価の入力

**Props**:
```typescript
interface EvaluationFormProps {
  ideaId: number;
  ideaTitle: string;
  onSubmit: (evaluation: CreateEvaluationDto) => Promise<void>;
  onCancel: () => void;
}

interface CreateEvaluationDto {
  ideaId: number;
  feasibilityScore: number;
  impactScore: number;
  innovationScore: number;
  comment?: string;
}
```

**フォームフィールド**:
| フィールド | 入力方式 | 必須 | バリデーション |
|-----------|---------|------|---------------|
| feasibilityScore | スライダー + 数値入力 | ○ | 1-10の整数 |
| impactScore | スライダー + 数値入力 | ○ | 1-10の整数 |
| innovationScore | スライダー + 数値入力 | ○ | 1-10の整数 |
| comment | テキストエリア | - | 最大1000文字 |

**動作仕様**:
| イベント | 動作 |
|---------|------|
| スライダー変更 | 数値入力フィールドも連動して更新 |
| 数値入力変更 | スライダーも連動して更新 |
| キャンセルクリック | モーダルを閉じる |
| 送信クリック | バリデーション → API呼び出し → 成功時モーダル閉じる |
| 送信エラー | エラーメッセージをトーストで表示 |

---

### 4. UserForm

**責務**: ユーザー作成・編集

**Props**:
```typescript
interface UserFormProps {
  user?: User;  // 編集時のみ
  onSubmit: (data: CreateUserDto | UpdateUserDto) => Promise<void>;
  onCancel: () => void;
}

interface CreateUserDto {
  username: string;
  password: string;
  role: 'employee' | 'panel_member' | 'admin';
}

interface UpdateUserDto {
  username?: string;
  password?: string;
  role?: 'employee' | 'panel_member' | 'admin';
}
```

**フォームフィールド**:
| フィールド | 入力方式 | 必須（新規） | 必須（編集） | バリデーション |
|-----------|---------|-------------|-------------|---------------|
| username | テキスト | ○ | ○ | 3-50文字、英数字とアンダースコアのみ |
| password | パスワード | ○ | - | 6-100文字 |
| role | セレクト | ○ | ○ | employee/panel_member/admin |

**動作仕様**:
| イベント | 動作 |
|---------|------|
| 新規モード | 全フィールド空、パスワード必須 |
| 編集モード | 既存値を表示、パスワードは任意（空欄なら変更なし） |
| ユーザー名重複エラー | フィールド下にエラー表示 |

---

### 5. ConfirmDialog

**責務**: 確認ダイアログ表示

**Props**:
```typescript
interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;  // デフォルト: "確認"
  cancelLabel?: string;   // デフォルト: "キャンセル"
  confirmVariant?: 'primary' | 'danger';  // デフォルト: "primary"
  onConfirm: () => void;
  onCancel: () => void;
}
```

**動作仕様**:
| イベント | 動作 |
|---------|------|
| 確認クリック | onConfirm 実行 |
| キャンセルクリック | onCancel 実行 |
| 背景クリック | onCancel 実行 |
| Escキー | onCancel 実行 |

---

## 表示コンポーネント

### 6. IdeaCard

**責務**: アイデアのカード表示

**Props**:
```typescript
interface IdeaCardProps {
  idea: {
    id: number;
    title: string;
    description: string;
    author: { username: string };
    status: 'draft' | 'submitted';
    finalScore: number | null;
    images: { filePath: string }[];
  };
  onClick?: () => void;
  showActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}
```

**表示内容**:
- サムネイル画像（最初の画像、なければデフォルト画像）
- タイトル（最大2行、省略表示）
- 著者名
- スコア（確定時のみ、未確定は「--」）
- 下書きバッジ（status=draft の場合）

**動作仕様**:
| イベント | 動作 |
|---------|------|
| カードクリック | onClick 実行（詳細ページへ遷移） |
| 編集ボタンクリック | onEdit 実行（イベント伝播停止） |
| 削除ボタンクリック | onDelete 実行（イベント伝播停止） |

---

### 7. LeaderboardTable

**責務**: リーダーボード表示

**Props**:
```typescript
interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  onRefresh?: () => void;  // 管理者のみ
  onRecognize?: () => void;  // 管理者のみ
  isAdmin: boolean;
}

interface LeaderboardEntry {
  rank: number;
  idea: {
    id: number;
    title: string;
    author: { username: string };
  };
  finalScore: number;
  isRecognized: boolean;
  recognitionRank?: 1 | 2 | 3;
}
```

**表示内容**:
| 列 | 内容 |
|---|------|
| 順位 | 数字 + 同順位対応 |
| タイトル | クリックで詳細へ |
| 著者 | ユーザー名 |
| スコア | 小数点2桁 |
| 表彰 | 金/銀/銅アイコン |

**動作仕様**:
| イベント | 動作 |
|---------|------|
| 更新ボタンクリック | onRefresh 実行、ローディング表示 |
| 表彰ボタンクリック | 確認ダイアログ → onRecognize 実行 |
| タイトルクリック | アイデア詳細ページへ遷移 |

---

### 8. Notification

**責務**: トースト通知表示

**Props**:
```typescript
interface NotificationProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;  // デフォルト: 5000ms
  onClose: () => void;
}
```

**スタイル**:
| タイプ | 背景色 | アイコン |
|--------|--------|---------|
| success | 緑 (green-500) | CheckCircle |
| error | 赤 (red-500) | XCircle |
| warning | 黄 (yellow-500) | ExclamationTriangle |
| info | 青 (blue-500) | InformationCircle |

**動作仕様**:
| イベント | 動作 |
|---------|------|
| 表示 | 右上からスライドイン |
| duration経過 | 自動でフェードアウト、onClose実行 |
| 閉じるボタンクリック | フェードアウト、onClose実行 |

---

### 9. LoadingSpinner

**責務**: ローディング表示

**Props**:
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';  // デフォルト: 'md'
  fullScreen?: boolean;  // デフォルト: false
}
```

**サイズ**:
| サイズ | 寸法 |
|--------|------|
| sm | 16px |
| md | 32px |
| lg | 48px |

---

### 10. ErrorMessage

**責務**: エラーメッセージ表示

**Props**:
```typescript
interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}
```

**動作仕様**:
- エラーメッセージを赤色で表示
- リトライボタン（onRetry指定時のみ）

---

## PrivateRoute（認証ガード）

**責務**: 認証・認可チェック

**Props**:
```typescript
interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('employee' | 'panel_member' | 'admin')[];
}
```

**動作仕様**:
| 状態 | 動作 |
|------|------|
| 未認証 | /login へリダイレクト |
| 認証済み + ロール許可 | children を表示 |
| 認証済み + ロール不許可 | /dashboard へリダイレクト + エラートースト |

---

*作成日: 2026-01-18*
