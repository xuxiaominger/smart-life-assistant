# 智能生活助手 (Smart Life Assistant)

一款整合9大功能模块的AI驱动生活效率工具，参照苹果官网风格设计UI，同时提供HTTP网页版和APP移动版。

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6)

## 功能特性

### 1. 📄 文档智能整理
- 微信收到的图片和PDF使用OCR扫描后AI自动归纳要点
- 压缩包提取文件名生成Markdown清单
- Word文档AI自动归纳要点

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
│   └── globals.css         # 全局样式
├── mobile/                 # React Native (APP版本)
│   ├── App.tsx             # 主应用
│   ├── app.json            # Expo配置
│   └── package.json        # 依赖配置
├── docs/                   # 工程文档
│   ├── SPEC.md             # 需求规格文档
│   ├── API.md              # 接口文档
│   └── ARCHITECTURE.md     # 架构文档
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

## 注意事项

1. 本项目为Demo版本，部分功能使用模拟数据展示UI效果
2. 实际使用需要配置对应的第三方API Key
3. 涉及敏感数据的功能（微信、银行等）需要用户自行获取数据授权

## License

MIT License
