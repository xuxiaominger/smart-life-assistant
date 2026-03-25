# 智能生活助手 - API 接口文档

## 1. 概述

本文档描述智能生活助手应用的API接口规范。所有接口均为预留接口，实际调用需要配置对应的API Key。

## 2. AI 服务接口

### 2.1 OpenAI GPT 接口

```typescript
interface OpenAIConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

interface AIGenerateRequest {
  prompt: string;
  maxTokens?: number;
  temperature?: number;
}

interface AIGenerateResponse {
  content: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}
```

### 2.2 AI 文档归纳接口

```typescript
interface DocumentSummaryRequest {
  content: string;
  documentType: 'pdf' | 'doc' | 'image';
}

interface DocumentSummaryResponse {
  summary: string;
  keyPoints: string[];
  tags: string[];
}
```

### 2.3 AI 短视频脚本生成接口

```typescript
interface VideoScriptRequest {
  story: string;
  style: '周星驰无厘头';
  duration: number; // 秒
}

interface VideoScriptResponse {
  title: string;
  scenes: {
    time: string;
    content: string;
    dialogue: string;
  }[];
  totalDuration: number;
}
```

### 2.4 AI 心理引导接口

```typescript
interface MoodAnalysisRequest {
  mood: string;
  personality: 'ENFP';
  target: '细心高效的法律工作者';
}

interface MoodAnalysisResponse {
  question: string;
  suggestions: string[];
  encouragement: string;
}
```

## 3. 第三方服务接口

### 3.1 OCR 服务

```typescript
interface OCRConfig {
  provider: 'google' | 'tesseract';
  apiKey?: string;
}

interface OCRRequest {
  imageUrl: string;
  language?: string;
}

interface OCRResponse {
  text: string;
  confidence: number;
  boundingBoxes: Box[];
}
```

### 3.2 语音转文字服务

```typescript
interface SpeechToTextConfig {
  provider: 'google' | 'whisper';
  apiKey?: string;
}

interface SpeechToTextRequest {
  audioUrl: string;
  language?: string;
}

interface SpeechToTextResponse {
  transcript: string;
  confidence: number;
  words: Word[];
}
```

### 3.3 地图服务

```typescript
interface MapsConfig {
  provider: 'google' | 'amap';
  apiKey: string;
}

interface LocationPoint {
  lat: number;
  lng: number;
  timestamp: number;
  name?: string;
}

interface LocationTrack {
  points: LocationPoint[];
  totalDistance: number;
}
```

### 3.4 健康数据服务

```typescript
interface HealthData {
  steps: number;
  sleep: {
    duration: number;
    deepSleep: number;
    lightSleep: number;
    remSleep: number;
  };
  calories: number;
  heartRate: number;
}
```

## 4. 数据存储接口

### 4.1 本地存储

```typescript
interface StorageService {
  get<T>(key: string): Promise<T | null>;
  set<T>(key: string, value: T): Promise<void>;
  remove(key: string): Promise<void>;
  clear(): Promise<void>;
}
```

### 4.2 数据模型

```typescript
interface Transaction {
  id: string;
  source: 'wechat' | 'alipay' | 'cmb';
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description: string;
  timestamp: number;
}

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'archive';
  content?: string;
  summary?: string;
  tags: string[];
  timestamp: number;
}

interface CallRecord {
  id: string;
  name: string;
  duration: string;
  transcript?: string;
  timestamp: number;
}

interface MoodEntry {
  id: string;
  mood: string;
  content: string;
  aiResponse: string;
  timestamp: number;
}
```

## 5. API 调用示例

### 5.1 文档归纳

```typescript
const summarizeDocument = async (content: string) => {
  const response = await fetch('/api/ai/summarize', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content, documentType: 'pdf' })
  });
  return response.json();
};
```

### 5.2 记账记录

```typescript
const addTransaction = async (transaction: Omit<Transaction, 'id'>) => {
  const response = await fetch('/api/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction)
  });
  return response.json();
};
```

---

**文档版本：** 1.0
**创建日期：** 2024-01-15
