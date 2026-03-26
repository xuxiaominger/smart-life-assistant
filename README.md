# 智能生活助手 (Smart Life Assistant)

一款整合10大功能模块的AI驱动生活效率工具，参照苹果官网风格设计UI，同时提供HTTP网页版和APP移动版。

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6)
![DeepSeek-OCR](https://img.shields.io/badge/DeepSeek--OCR-Integrated-purple)

## 功能特性

### 1. 📄 文档智能整理 (DeepSeek-OCR)
- **DeepSeek-OCR 集成** - 高精度文字识别
- 支持图片 OCR (PNG、JPG、JPEG)
- 支持 PDF 文档批量识别
- 三种识别模式：自由识别 / 文档转换 / 图片分析
- 自动转换为 Markdown 格式
- GPU 加速，~2500 tokens/s 处理速度

### 2. 📞 通话录音识别
- 小米手机通话录音转文字
- 支持搜索和查看转录内容

### 3. 📍 足迹记录
- 记录手机经过的所有位置
- Google Maps轨迹可视化

### 4. 🎬 短视频脚本生成
- 收集法律/经济领域的搞笑、尴尬、愤怒事件
- AI改编为周星驰无厘头风格2分钟短视频脚本

### 5. ⚖️ 法律条文分析
- 自动抓取法律图书馆网站最新法律条文
- AI深度分析条文要点，方便记忆与背诵

### 6. ❤️ 健康数据同步
- 小米运动步数与睡眠时间同步
- 仪表盘可视化展示

### 7. 💰 记账本
- 微信、支付宝、招商银行收支统计
- 垂直时间线 + 树状图展示

### 8. 😊 心情记录本
- AI心理引导，针对ENFP性格
- 引导成为细心高效的法律工作者

### 9. 🏠 统一主页
- 苹果官网设计风格
- HTTP网页版 + APP移动版双版本

### 10. 💬 微信群监控自动化
- 自动监控微信群文件消息
- 支持 PDF、Word、Excel、图片、压缩包检测
- 自动下载并整理文件
- Python win32api + UIAutomation 后端支持
- PyQt6 现代 GUI 界面

## 技术栈

### HTTP 版本
- Next.js 15 (App Router)
- Tailwind CSS 3.4
- Framer Motion 11
- TypeScript 5.7

### APP 版本
- React Native 0.76
- Expo 52
- React Navigation 7
- TypeScript 5.3

## 项目结构

```
smart-life-assistant/
├── app/                    # Next.js App Router (HTTP版本)
│   ├── page.tsx            # 主页
│   ├── layout.tsx          # 布局
│   ├── globals.css         # 全局样式
│   └── api/
│       └── ocr/            # OCR API 接口
│           └── route.ts
├── mobile/                 # React Native (APP版本)
│   ├── App.tsx             # 主应用
│   ├── app.json            # Expo配置
│   └── package.json        # 依赖配置
├── docs/                   # 工程文档
│   ├── SPEC.md             # 需求规格文档
│   ├── API.md              # 接口文档
│   ├── ARCHITECTURE.md     # 架构文档
│   ├── deepseek_ocr.py     # DeepSeek-OCR Python 后端
│   └── wechat_monitor.py   # 微信监控 Python 后端
└── package.json            # 根依赖配置
```

## 快速开始

### HTTP 版本

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### APP 版本

```bash
# 进入移动端目录
cd mobile

# 安装依赖
npm install

# 启动Expo开发服务器
npm start

# 运行在Android
npm run android

# 运行在iOS
npm run ios
```

## 配置说明

### DeepSeek-OCR 配置

DeepSeek-OCR 提供高精度文字识别功能，支持多种运行模式：

#### 1. Python 后端运行 (推荐用于生产)

```bash
# 安装依赖
pip install torch transformers pillow pymupdf PyQt6

# 可选：安装 vLLM 加速 (需要 CUDA)
pip install vllm>=0.8.5

# 运行 GUI 模式
cd docs
python deepseek_ocr.py --gui

# 处理单个文件
python deepseek_ocr.py --file image.png
python deepseek_ocr.py --file document.pdf

# 选择模型大小
python deepseek_ocr.py --model large --file image.png  # 高精度
python deepseek_ocr.py --model tiny --file image.png   # 快速
```

#### 2. HTTP API 调用

```bash
# POST /api/ocr
curl -X POST http://localhost:3000/api/ocr \
  -H "Content-Type: application/json" \
  -d '{
    "base64Image": "...",
    "mode": "document",
    "prompt": "Convert the document to markdown"
  }'
```

#### 3. OCR 模式说明

| 模式 | 说明 | 适用场景 |
|------|------|----------|
| `free_ocr` | 自由识别 | 通用图片文字提取 |
| `document` | 文档转换 | PDF/文档转 Markdown |
| `image_analysis` | 图片分析 | 详细描述图片内容 |

### 微信监控配置

```bash
# 运行微信监控后端 (需要 Windows)
cd docs
python wechat_monitor.py
```

### AI 服务配置

项目预留了以下AI服务接口，需要配置对应的API Key才能使用：

```typescript
// 环境变量配置
OPENAI_API_KEY=your_openai_key
GOOGLE_MAPS_API_KEY=your_google_maps_key
GOOGLE_OCR_API_KEY=your_google_ocr_key
```

### 模块接口预留

由于微信、小米、支付宝等平台没有开放相关API，部分功能采用模拟数据展示UI效果：

- 文档整理模块：预留文件选择器接口
- 通话录音模块：预留语音转文字接口
- 足迹记录模块：预留Google Maps接口
- 健康数据模块：预留小米运动接口
- 记账本模块：预留各平台API接口

## 部署

### HTTP 版本

推荐部署到 Vercel：

```bash
npm i -g vercel
vercel deploy
```

### APP 版本

使用 Expo EAS Build：

```bash
cd mobile
eas build
```

## 界面预览

主页采用苹果官网设计风格：
- 大留白、简洁设计
- 卡片式布局
- 优雅动画过渡

## 文档

- [需求规格说明书](./docs/SPEC.md)
- [API接口文档](./docs/API.md)
- [架构设计文档](./docs/ARCHITECTURE.md)
- [DeepSeek-OCR 后端](./docs/deepseek_ocr.py)
- [微信监控后端](./docs/wechat_monitor.py)

## 注意事项

1. 本项目为Demo版本，部分功能使用模拟数据展示UI效果
2. 实际使用需要配置对应的第三方API Key
3. 涉及敏感数据的功能（微信、银行等）需要用户自行获取数据授权

## License

MIT License
