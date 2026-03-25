# 智能生活助手 - 架构设计文档

## 1. 系统架构

### 1.1 整体架构

智能生活助手采用前后端分离架构：

```
┌─────────────────────────────────────────────────────────┐
│                    客户端层                              │
├─────────────────────┬───────────────────────────────────┤
│   HTTP 版本         │           APP 版本                │
│   (Next.js)        │    (React Native + Expo)          │
└─────────────────────┴───────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    共享服务层                             │
├─────────────────────────────────────────────────────────┤
│  • 状态管理 (Zustand / Context)                        │
│  • 数据存储 (AsyncStorage / SQLite)                     │
│  • 路由导航 (React Navigation)                          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    业务模块层                            │
├─────────────────────────────────────────────────────────┤
│  • 文档整理模块    • 通话录音模块   • 足迹记录模块      │
│  • 视频脚本模块    • 法律分析模块   • 健康数据模块      │
│  • 记账本模块      • 心情记录模块   • 主页模块          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    第三方服务层                          │
├─────────────────────────────────────────────────────────┤
│  • OpenAI API     • Google Maps    • 小米运动 API      │
│  • OCR 服务        • 语音转文字      • 爬虫服务          │
└─────────────────────────────────────────────────────────┘
```

### 1.2 技术栈

#### HTTP 版本
- **框架：** Next.js 15 (App Router)
- **样式：** Tailwind CSS 3.4
- **动画：** Framer Motion 11
- **图表：** Recharts 2
- **图标：** Lucide React
- **语言：** TypeScript 5.7

#### APP 版本
- **框架：** React Native 0.76 + Expo 52
- **导航：** React Navigation 7
- **动画：** React Native Reanimated 3.16
- **状态：** React Context
- **语言：** TypeScript 5.3

## 2. 模块设计

### 2.1 文档整理模块

```
DocumentModule
├── DocumentList       # 文档列表组件
├── DocumentCard       # 文档卡片组件
├── OCRPreview         # OCR识别预览
└── AISummary          # AI归纳结果
```

**数据流：**
1. 用户选择文件
2. 文件上传到服务器/本地处理
3. 调用OCR服务识别内容
4. 调用AI服务归纳要点
5. 存储并展示结果

### 2.2 记账本模块

```
AccountingModule
├── TimelineView       # 时间线视图
├── TreeChart          # 树状图组件
├── TransactionCard    # 交易记录卡片
└── StatisticsPanel    # 统计面板
```

**数据流：**
1. 获取微信/支付宝/银行数据（预留接口）
2. 手动记账
3. 存储交易记录
4. 按时间排序展示
5. 生成统计图表

### 2.3 心情记录模块

```
MoodJournalModule
├── MoodSelector       # 心情选择器
├── AIChatbox         # AI对话组件
├── PromptGenerator   # 引导语生成器
└── MoodHistory       # 历史记录
```

**数据流：**
1. 用户选择当前心情
2. 生成AI引导问题
3. 用户记录内容
4. AI给出建议
5. 存储记录

## 3. 状态管理

### 3.1 全局状态

```typescript
interface AppState {
  // 用户状态
  user: User | null;
  isAuthenticated: boolean;

  // 数据状态
  documents: Document[];
  transactions: Transaction[];
  callRecords: CallRecord[];
  moodEntries: MoodEntry[];
  healthData: HealthData | null;

  // UI状态
  activeModule: string | null;
  theme: 'light' | 'dark';
}
```

### 3.2 状态管理方案

- **HTTP版本：** 使用React Context + useReducer
- **APP版本：** 使用React Context

## 4. 数据存储

### 4.1 本地存储

```typescript
// HTTP版本
- localStorage / sessionStorage

// APP版本
- AsyncStorage (轻量数据)
- SQLite (大量数据)
```

### 4.2 数据表设计

```sql
-- 交易记录表
CREATE TABLE transactions (
  id TEXT PRIMARY KEY,
  source TEXT NOT NULL,
  type TEXT NOT NULL,
  amount REAL NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  timestamp INTEGER NOT NULL
);

-- 文档表
CREATE TABLE documents (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  content TEXT,
  summary TEXT,
  tags TEXT,
  timestamp INTEGER NOT NULL
);

-- 心情记录表
CREATE TABLE mood_entries (
  id TEXT PRIMARY KEY,
  mood TEXT NOT NULL,
  content TEXT,
  ai_response TEXT,
  timestamp INTEGER NOT NULL
);
```

## 5. API 预留设计

### 5.1 服务层抽象

```typescript
// AI服务抽象
interface AIService {
  summarize(content: string): Promise<Summary>;
  generateScript(story: string): Promise<Script>;
  analyzeMood(mood: string): Promise<AIResponse>;
}

// 第三方服务抽象
interface OCRService {
  recognize(image: Image): Promise<OCRResult>;
}

interface SpeechService {
  transcript(audio: Audio): Promise<Transcript>;
}

interface MapsService {
  getLocation(): Promise<Location>;
  getTrack(): Promise<Track>;
}
```

### 5.2 配置管理

```typescript
interface AppConfig {
  openai: {
    apiKey: string;
    model: string;
  };
  google: {
    mapsApiKey: string;
    ocrApiKey: string;
    speechApiKey: string;
  };
  xiaomi: {
    appKey: string;
    appSecret: string;
  };
}
```

## 6. 部署方案

### 6.1 HTTP 版本部署

- **平台：** Vercel / Netlify
- **域名：** 可配置自定义域名

### 6.2 APP 版本部署

- **Android：** 生成APK/AAB
- **iOS：** 生成IPA（需要Apple Developer）
- **Expo：** 可通过EAS Build生成

---

**文档版本：** 1.0
**创建日期：** 2024-01-15
