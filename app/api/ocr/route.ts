import { NextRequest, NextResponse } from 'next/server';

// OCR API Route
// 支持与 DeepSeek-OCR Python 后端集成

interface OCRRequest {
  imageUrl?: string;
  base64Image?: string;
  pdfUrl?: string;
  mode?: 'free_ocr' | 'document' | 'image_analysis';
  prompt?: string;
}

interface OCRResponse {
  success: boolean;
  text?: string;
  markdown?: string;
  error?: string;
  processingTime?: number;
  model?: string;
  tokensUsed?: number;
}

// 模拟 OCR 处理延迟
const simulateOCR = async (content: string, type: 'image' | 'pdf'): Promise<OCRResponse> => {
  await new Promise(resolve => setTimeout(resolve, 1500));

  const hash = content.split('').reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);

  if (type === 'image') {
    return {
      success: true,
      text: `图片文字识别结果 (Demo)

文件标识: ${Math.abs(hash).toString(16).toUpperCase()}

识别的文字内容：
"智能生活助手 - Smart Life Assistant
基于 DeepSeek-OCR 的文字识别系统
支持图片、PDF 等多种格式文件的 OCR 识别"

其他检测到的文字：
- 标题：智能生活助手
- 副标题：文档智能整理功能
- 数字：2024、10+

状态：识别成功 ✓`,
      markdown: `# 图片文字识别结果

## 标题
智能生活助手

## 内容
基于 DeepSeek-OCR 的文字识别系统

## 识别详情
- **状态**: 成功
- **置信度**: 98.5%
- **语言**: 中文简体
- **文件标识**: ${Math.abs(hash).toString(16).toUpperCase()}

## 识别的文本
> "智能生活助手 - Smart Life Assistant
> 基于 DeepSeek-OCR 的文字识别系统
> 支持图片、PDF 等多种格式文件的 OCR 识别"`,
      processingTime: 1.5,
      model: 'DeepSeek-OCR-Large',
      tokensUsed: 256,
    };
  } else {
    return {
      success: true,
      text: `PDF 文档识别结果 (Demo)

文件标识: ${Math.abs(hash).toString(16).toUpperCase()}

--- 第 1 页 ---
文档标题：智能生活助手 - 功能说明

1. 文档智能整理
   - 支持图片 OCR 识别
   - 支持 PDF 文档解析
   - AI 自动提取关键信息
   - 智能摘要生成

2. 微信群监控
   - 自动检测群文件
   - 支持 OCR 识别
   - 自动下载整理

3. 法律条文分析
   - 法规智能检索
   - 案例关联分析
   - AI 风险提示

--- 第 2 页 ---
4. 短视频脚本生成
   - 周星驰风格生成
   - 法律/财经搞笑新闻
   - 一键生成脚本

5. 更多功能...
   (后续页内容省略)

状态：识别成功 ✓`,
      markdown: `# PDF 文档识别结果

## 文件信息
- **标识**: ${Math.abs(hash).toString(16).toUpperCase()}
- **页数**: 2+
- **状态**: 识别成功

---

## 第 1 页

### 智能生活助手 - 功能说明

1. **文档智能整理**
   - 支持图片 OCR 识别
   - 支持 PDF 文档解析
   - AI 自动提取关键信息

2. **微信群监控**
   - 自动检测群文件
   - 支持 OCR 识别

3. **法律条文分析**
   - 法规智能检索
   - AI 风险提示

---

## 第 2 页

### 短视频脚本生成
- 周星驰风格生成
- 一键生成脚本

### 更多功能
持续更新中...

---

**状态**: 识别成功 ✓`,
      processingTime: 3.2,
      model: 'DeepSeek-OCR-Large',
      tokensUsed: 512,
    };
  }
};

// DeepSeek-OCR API 端点
export async function POST(request: NextRequest) {
  try {
    const body: OCRRequest = await request.json();
    const { imageUrl, base64Image, pdfUrl, mode = 'free_ocr', prompt } = body;

    // 验证请求
    if (!imageUrl && !base64Image && !pdfUrl) {
      return NextResponse.json(
        { success: false, error: '请提供 imageUrl、base64Image 或 pdfUrl' },
        { status: 400 }
      );
    }

    // 确定处理类型
    const isPdf = !!pdfUrl;
    const content = pdfUrl || imageUrl || base64Image || '';

    // 调用模拟 OCR 或真实服务
    const result = await simulateOCR(content, isPdf ? 'pdf' : 'image');

    // 可以在这里添加与 Python 后端的集成
    // 例如通过 HTTP 请求调用本地运行的 deepseek_ocr.py 服务

    /*
    // 真实集成的示例代码
    const pythonServiceUrl = process.env.OCR_SERVICE_URL || 'http://localhost:8765';

    const response = await fetch(`${pythonServiceUrl}/ocr`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl,
        base64Image,
        pdfUrl,
        mode,
        prompt: prompt || (mode === 'document' ? 'Convert the document to markdown' : 'Free OCR'),
      }),
    });

    const result = await response.json();
    */

    return NextResponse.json(result);
  } catch (error) {
    console.error('OCR 处理错误:', error);
    return NextResponse.json(
      { success: false, error: 'OCR 处理失败' },
      { status: 500 }
    );
  }
}

// 获取支持的模式
export async function GET() {
  return NextResponse.json({
    success: true,
    modes: [
      {
        id: 'free_ocr',
        name: 'Free OCR',
        description: '自由识别模式，适用于所有类型的图片',
      },
      {
        id: 'document',
        name: 'Document',
        description: '文档模式，将文档转换为 Markdown 格式',
      },
      {
        id: 'image_analysis',
        name: 'Image Analysis',
        description: '图片分析模式，详细描述图片内容',
      },
    ],
    model: {
      name: 'DeepSeek-OCR',
      sizes: ['tiny', 'small', 'base', 'large'],
      default: 'large',
    },
    requirements: {
      python: '3.8+',
      pytorch: '2.0+',
      cuda: '11.8+',
    },
    endpoints: {
      api: '/api/ocr',
      websocket: '/api/ocr/ws',
    },
  });
}
