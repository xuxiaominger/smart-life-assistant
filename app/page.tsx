"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Phone,
  MapPin,
  Video,
  Scale,
  Heart,
  Wallet,
  Smile,
  Home,
  ChevronRight,
  X,
  Sparkles,
  Brain,
  Clock,
  TrendingUp,
  TrendingDown,
  Moon,
  Sun,
  Lightbulb,
  MessageCircle,
  MessageSquare,
  Play,
  Pause,
  Settings,
  FolderOpen,
  Users,
  AlertCircle,
  Camera,
  Upload,
  Download,
  FileImage,
  Loader2,
} from "lucide-react";

// 模拟数据
const mockDocuments = [
  { id: 1, name: "合同要点总结.pdf", type: "pdf", date: "2024-01-15", summary: "房屋租赁合同关键条款：租期1年，租金月付，押金2个月..." },
  { id: 2, name: "会议记录.docx", type: "doc", date: "2024-01-14", summary: "项目进度会议：完成UI设计，进入开发阶段..." },
  { id: 3, name: "产品截图.png", type: "image", date: "2024-01-13", summary: "OCR识别：APP界面设计稿，主要功能模块展示..." },
  { id: 4, name: "资料包.zip", type: "archive", date: "2024-01-12", summary: "包含：用户调研报告.pdf、市场分析.xlsx、竞品对比.docx" },
];

const mockCallRecords = [
  { id: 1, name: "张律师", duration: "5:32", date: "2024-01-15", transcript: "关于案件进展的沟通，确认下周开庭时间..." },
  { id: 2, name: "客户李总", duration: "12:15", date: "2024-01-14", transcript: "合同细节讨论，确定最终条款..." },
  { id: 3, name: "同事王明", duration: "3:45", date: "2024-01-13", transcript: "工作交接事项..." },
];

const mockLocations = [
  { id: 1, name: "北京市朝阳区", time: "14:30", lat: 39.9042, lng: 116.4074 },
  { id: 2, name: "国贸CBD", time: "12:00", lat: 39.9088, lng: 116.3975 },
  { id: 3, name: "回家路上", time: "18:45", lat: 39.9143, lng: 116.4278 },
];

const mockLegalNews = [
  { id: 1, title: "男子因在群里发'抢红包'被误认为抢劫被判3年", category: "搞笑", summary: "真实案例：群聊中一句玩笑话引发的乌龙案件" },
  { id: 2, title: "老人碰瓷电动车反被撞骨折索赔10万", category: "尴尬", summary: "监控录像证明系自行摔倒" },
  { id: 3, title: "公司996工作制被员工录音举报", category: "愤怒", summary: "劳动仲裁：公司赔偿加班费" },
];

const mockLaws = [
  { id: 1, name: "《民法典》合同编", date: "2024-01-15", summary: "合同订立、效力、履行、变更等核心要点" },
  { id: 2, name: "《劳动法》加班规定", date: "2024-01-14", summary: "加班时间限制、加班费计算标准" },
  { id: 3, name: "《刑法》故意伤害罪", date: "2024-01-13", summary: "伤害程度认定、量刑标准" },
];

const mockHealthData = {
  steps: 8543,
  sleep: 7.5,
  calories: 2150,
  heartRate: 72,
};

const mockTransactions = [
  { id: 1, source: "微信", type: "支出", amount: 68, category: "餐饮", date: "今天 12:30", description: "午餐" },
  { id: 2, source: "支付宝", type: "收入", amount: 15000, category: "工资", date: "昨天 09:00", description: "月薪" },
  { id: 3, source: "招商银行", type: "支出", amount: 2999, category: "购物", date: "昨天 15:20", description: "电子产品" },
  { id: 4, source: "微信", type: "支出", amount: 15, category: "交通", date: "前天 08:15", description: "地铁" },
  { id: 5, source: "支付宝", type: "支出", amount: 128, category: "餐饮", date: "前天 19:00", description: "晚餐" },
];

const moodPrompts = [
  "今天让你感到最有成就感的事情是什么？",
  "有没有什么事情让你感到焦虑？",
  "工作中有遇到什么挑战吗？",
];

// 微信自动化模块数据
const mockWeChatGroups = [
  { id: 1, name: "项目交流群", newFiles: 3, lastActive: "10分钟前" },
  { id: 2, name: "法律资源共享", newFiles: 5, lastActive: "30分钟前" },
  { id: 3, name: "同事群", newFiles: 1, lastActive: "1小时前" },
  { id: 4, name: "客户沟通群", newFiles: 2, lastActive: "2小时前" },
];

const mockWeChatFiles = [
  { id: 1, group: "项目交流群", name: "需求文档.pdf", type: "pdf", size: "2.3MB", time: "今天 10:30" },
  { id: 2, group: "法律资源共享", name: "案例分析.zip", type: "archive", size: "15MB", time: "今天 10:15" },
  { id: 3, group: "项目交流群", name: "设计稿.png", type: "image", size: "3.2MB", time: "今天 09:45" },
  { id: 4, group: "法律资源共享", name: "合同模板.docx", type: "doc", size: "156KB", time: "今天 09:20" },
  { id: 5, group: "同事群", name: "会议纪要.pdf", type: "pdf", size: "890KB", time: "昨天 18:30" },
];

const mockWeChatLogs = [
  { id: 1, time: "10:35:22", action: "检测到新文件", detail: "需求文档.pdf", status: "success" },
  { id: 2, time: "10:35:20", action: "切换群聊", detail: "法律资源共享", status: "info" },
  { id: 3, time: "10:35:18", action: "自动下载", detail: "案例分析.zip", status: "success" },
  { id: 4, time: "10:35:15", action: "检测到新文件", detail: "设计稿.png", status: "success" },
  { id: 5, time: "10:35:10", action: "开始监控", detail: "4个群聊", status: "info" },
];

// 模块组件
function DocumentModule() {
  const [isOCRProcessing, setIsOCRProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<string | null>(null);
  const [ocrMode, setOcrMode] = useState<'free_ocr' | 'document' | 'image_analysis'>('document');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const handleOCR = async (file: File) => {
    setIsOCRProcessing(true);
    setSelectedFile(file.name);
    setOcrResult(null);

    try {
      // 将文件转换为 base64
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64 = (e.target?.result as string)?.split(',')[1];

        // 调用 OCR API
        const response = await fetch('/api/ocr', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            base64Image: base64,
            mode: ocrMode,
            prompt: ocrMode === 'document' ? 'Convert the document to markdown' : 'Free OCR',
          }),
        });

        const result = await response.json();

        if (result.success) {
          setOcrResult(result.markdown || result.text);
        } else {
          setOcrResult(`OCR 识别失败: ${result.error}`);
        }

        setIsOCRProcessing(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      setOcrResult('OCR 处理失败，请重试');
      setIsOCRProcessing(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleOCR(file);
    }
  };

  const clearOCRResult = () => {
    setOcrResult(null);
    setSelectedFile(null);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">文档智能整理</h3>
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          DeepSeek-OCR
        </span>
      </div>

      {/* OCR 上传区域 */}
      <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border-2 border-dashed border-blue-200">
        <div className="text-center">
          {isOCRProcessing ? (
            <div className="py-4">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mx-auto mb-2" />
              <p className="text-sm text-gray-600">正在使用 DeepSeek-OCR 识别中...</p>
              <p className="text-xs text-gray-400 mt-1">文件: {selectedFile}</p>
            </div>
          ) : (
            <>
              <Camera className="w-10 h-10 text-blue-400 mx-auto mb-2" />
              <p className="text-sm text-gray-700 mb-3">上传图片或 PDF 进行 OCR 识别</p>

              <div className="flex justify-center gap-2 mb-3">
                {(['free_ocr', 'document', 'image_analysis'] as const).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setOcrMode(mode)}
                    className={`px-3 py-1 text-xs rounded-full transition-colors ${
                      ocrMode === mode
                        ? 'bg-blue-500 text-white'
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    {mode === 'free_ocr' ? '自由识别' : mode === 'document' ? '文档转换' : '图片分析'}
                  </button>
                ))}
              </div>

              <label className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-xl cursor-pointer hover:bg-blue-600 transition-colors">
                <Upload className="w-4 h-4" />
                选择文件识别
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>

              <p className="text-xs text-gray-400 mt-2">支持 PNG、JPG、PDF 格式</p>
            </>
          )}
        </div>
      </div>

      {/* OCR 结果显示 */}
      {ocrResult && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <FileImage className="w-4 h-4 text-purple-500" />
              OCR 识别结果
            </h4>
            <button
              onClick={clearOCRResult}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              清空
            </button>
          </div>
          <div className="bg-gray-900 rounded-2xl p-4 max-h-64 overflow-y-auto">
            <pre className="text-sm text-gray-100 whitespace-pre-wrap font-mono">
              {ocrResult}
            </pre>
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
            <span>Powered by DeepSeek-OCR</span>
            <button className="flex items-center gap-1 text-blue-500 hover:text-blue-600">
              <Download className="w-3 h-3" />
              导出 Markdown
            </button>
          </div>
        </div>
      )}

      {/* 文档列表 */}
      <div className="space-y-3">
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{doc.name}</p>
                <p className="text-sm text-gray-500">{doc.date}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
            <p className="mt-2 text-sm text-gray-600">{doc.summary}</p>
          </div>
        ))}
      </div>

      {/* DeepSeek-OCR 说明 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">DeepSeek-OCR 集成</h4>
            <p className="text-sm text-gray-500 mt-1">
              使用 DeepSeek-OCR 进行高精度文字识别，支持 PDF 文档转换和图片 OCR。
              需要在本地运行 <code className="bg-gray-100 px-1 rounded">deepseek_ocr.py</code>。
            </p>
            <div className="flex gap-2 mt-2">
              <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">GPU 加速</span>
              <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">~2500 tokens/s</span>
              <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded">多语言</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CallRecordModule() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">通话录音识别</h3>
        <span className="text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full">3条新记录</span>
      </div>
      <div className="space-y-3">
        {mockCallRecords.map((call) => (
          <div key={call.id} className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{call.name}</p>
                  <p className="text-sm text-gray-500">{call.date} · {call.duration}</p>
                </div>
              </div>
            </div>
            <p className="mt-2 text-sm text-gray-600">{call.transcript}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function FootprintModule() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">足迹记录</h3>
        <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">今日 3 处</span>
      </div>
      <div className="h-48 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-purple-500 mx-auto mb-2" />
          <p className="text-gray-500">地图预览区域</p>
          <p className="text-xs text-gray-400">Google Maps API 预留</p>
        </div>
      </div>
      <div className="space-y-2">
        {mockLocations.map((loc) => (
          <div key={loc.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="flex-1 text-gray-700">{loc.name}</span>
            <span className="text-sm text-gray-400">{loc.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VideoScriptModule() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">短视频脚本</h3>
        <button className="text-xs bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          AI 生成
        </button>
      </div>
      <div className="space-y-3">
        {mockLegalNews.map((news) => (
          <div key={news.id} className="p-4 bg-gray-50 rounded-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">{news.category}</span>
            </div>
            <p className="font-medium text-gray-900 mb-1">{news.title}</p>
            <p className="text-sm text-gray-500">{news.summary}</p>
            <button className="mt-3 text-sm text-blue-600 flex items-center gap-1">
              生成 2 分钟脚本 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function LegalAnalysisModule() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">法律条文分析</h3>
        <span className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full">今日更新</span>
      </div>
      <div className="space-y-3">
        {mockLaws.map((law) => (
          <div key={law.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900 flex items-center gap-2">
                <Scale className="w-4 h-4 text-red-500" />
                {law.name}
              </p>
              <span className="text-xs text-gray-400">{law.date}</span>
            </div>
            <p className="text-sm text-gray-600">{law.summary}</p>
            <button className="mt-2 text-sm text-blue-600 flex items-center gap-1">
              <Brain className="w-4 h-4" />
              AI 深度分析 <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function HealthSyncModule() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">健康数据</h3>
        <span className="text-xs bg-pink-100 text-pink-600 px-3 py-1 rounded-full flex items-center gap-1">
          <Heart className="w-3 h-3" />
          小米运动
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-2">
            <Sun className="w-5 h-5 opacity-80" />
            <span className="text-xs opacity-80">今日</span>
          </div>
          <p className="text-3xl font-bold">{mockHealthData.steps}</p>
          <p className="text-sm opacity-80">步数</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl text-white">
          <div className="flex items-center justify-between mb-2">
            <Moon className="w-5 h-5 opacity-80" />
            <span className="text-xs opacity-80">昨晚</span>
          </div>
          <p className="text-3xl font-bold">{mockHealthData.sleep}h</p>
          <p className="text-sm opacity-80">睡眠</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl text-white">
          <p className="text-2xl font-bold">{mockHealthData.calories}</p>
          <p className="text-sm opacity-80">千卡</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl text-white">
          <p className="text-2xl font-bold">{mockHealthData.heartRate}</p>
          <p className="text-sm opacity-80">心率</p>
        </div>
      </div>
    </div>
  );
}

function AccountingModule() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">记账本</h3>
        <div className="flex gap-2">
          <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded">收 15000</span>
          <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">支 3210</span>
        </div>
      </div>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-4">
          {mockTransactions.map((tx) => (
            <div key={tx.id} className="relative flex items-center gap-4 pl-6">
              <div className={`absolute left-5 w-5 h-5 rounded-full border-4 border-white ${
                tx.type === '收入' ? 'bg-green-500' : 'bg-red-500'
              }`} />
              <div className="flex-1 p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${
                      tx.type === '收入' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {tx.type === '收入' ? '+' : '-'}{tx.amount}元
                    </span>
                    <span className="text-xs text-gray-400">{tx.source}</span>
                  </div>
                  <span className="text-xs text-gray-400">{tx.date}</span>
                </div>
                <p className="text-sm text-gray-700 mt-1">{tx.description} · {tx.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MoodJournalModule() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">心情记录本</h3>
        <span className="text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">ENFP 专属</span>
      </div>
      <div className="mb-4">
        <div className="flex gap-2 mb-3">
          {['😊 开心', '😰 焦虑', '😤 愤怒', '😢 难过'].map((mood, i) => (
            <button
              key={i}
              onClick={() => setSelected(i)}
              className={`flex-1 py-2 rounded-xl text-sm transition-colors ${
                selected === i ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-5 h-5 text-yellow-600" />
            <span className="font-medium text-gray-900">AI 心理导师</span>
          </div>
          <p className="text-sm text-gray-700">{moodPrompts[selected]}</p>
          <p className="mt-3 text-sm text-gray-500">
            作为法律工作者，细心严谨很重要哦！试着每天花5分钟记录工作心得吧~
          </p>
        </div>
      </div>
      <button className="w-full py-3 bg-blue-500 text-white rounded-xl font-medium flex items-center justify-center gap-2">
        <MessageCircle className="w-5 h-5" />
        记录今日心情
      </button>
    </div>
  );
}

// 微信自动化模块
function WeChatAutomationModule() {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [monitoringGroups, setMonitoringGroups] = useState(mockWeChatGroups);
  const [detectedFiles, setDetectedFiles] = useState(mockWeChatFiles);

  const handleStart = () => {
    setIsRunning(true);
    setProgress(0);
    // 模拟进度
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 10;
      });
    }, 500);
  };

  const handleStop = () => {
    setIsRunning(false);
    setProgress(0);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">微信群监控</h3>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-500 animate-pulse' : 'bg-gray-300'}`} />
          <span className="text-xs text-gray-500">{isRunning ? '监控中' : '已停止'}</span>
        </div>
      </div>

      {/* 控制面板 */}
      <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-2xl">
        <button
          onClick={isRunning ? handleStop : handleStart}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
            isRunning
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {isRunning ? <><Pause className="w-4 h-4" /> 停止</> : <><Play className="w-4 h-4" /> 开始监控</>}
        </button>

        <div className="flex-1">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>扫描进度</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
          <Settings className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* 监控群列表 */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-medium text-gray-900 flex items-center gap-2">
            <Users className="w-4 h-4" />
            监控群列表 ({monitoringGroups.length})
          </h4>
          <button className="text-xs text-blue-500 hover:text-blue-600">+ 添加群</button>
        </div>
        <div className="space-y-2">
          {monitoringGroups.map((group) => (
            <div key={group.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{group.name}</p>
                  <p className="text-xs text-gray-400">最后活跃: {group.lastActive}</p>
                </div>
              </div>
              {group.newFiles > 0 && (
                <span className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full">
                  {group.newFiles} 个新文件
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 检测到的文件 */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
          <FolderOpen className="w-4 h-4" />
          检测到的文件 ({detectedFiles.length})
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {detectedFiles.map((file) => (
            <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  file.type === 'pdf' ? 'bg-red-100' :
                  file.type === 'doc' ? 'bg-blue-100' :
                  file.type === 'image' ? 'bg-green-100' :
                  'bg-purple-100'
                }`}>
                  <FileText className={`w-4 h-4 ${
                    file.type === 'pdf' ? 'text-red-600' :
                    file.type === 'doc' ? 'text-blue-600' :
                    file.type === 'image' ? 'text-green-600' :
                    'text-purple-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{file.name}</p>
                  <p className="text-xs text-gray-400">{file.group} · {file.size}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400">{file.time}</span>
                <button className="text-xs text-blue-500 hover:text-blue-600">下载</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 操作日志 */}
      <div>
        <h4 className="font-medium text-gray-900 flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4" />
          操作日志
        </h4>
        <div className="bg-gray-900 rounded-xl p-3 max-h-32 overflow-y-auto">
          {mockWeChatLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-2 text-xs mb-2">
              <span className="text-gray-500 font-mono">{log.time}</span>
              <span className={`px-1.5 py-0.5 rounded ${
                log.status === 'success' ? 'bg-green-900 text-green-400' :
                log.status === 'error' ? 'bg-red-900 text-red-400' :
                'bg-blue-900 text-blue-400'
              }`}>
                {log.action}
              </span>
              <span className="text-gray-300">{log.detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Python 后端提示 */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-100">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">需要 Python 后端支持</h4>
            <p className="text-sm text-gray-500 mt-1">
              微信自动化需要运行 Python 后端服务，使用 win32api + UIAutomation 控制微信窗口。
              请在本地运行 <code className="bg-gray-100 px-1 rounded">wechat_monitor.py</code>。
            </p>
            <button className="mt-2 text-sm text-purple-600 hover:text-purple-700 font-medium">
              查看 Python 代码 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 主页面
export default function HomePage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const modules = [
    { id: 'wechat', name: '微信监控', icon: MessageSquare, color: 'bg-green-500' },
    { id: 'document', name: '文档整理', icon: FileText, color: 'bg-blue-500' },
    { id: 'call', name: '通话录音', icon: Phone, color: 'bg-green-600' },
    { id: 'footprint', name: '足迹记录', icon: MapPin, color: 'bg-purple-500' },
    { id: 'video', name: '短视频', icon: Video, color: 'bg-orange-500' },
    { id: 'legal', name: '法律分析', icon: Scale, color: 'bg-red-500' },
    { id: 'health', name: '健康数据', icon: Heart, color: 'bg-pink-500' },
    { id: 'accounting', name: '记账本', icon: Wallet, color: 'bg-teal-500' },
    { id: 'mood', name: '心情', icon: Smile, color: 'bg-yellow-500' },
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">智能生活助手</h1>
                <p className="text-xs text-gray-500">Smart Life Assistant</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <X className="w-6 h-6" /> : <Home className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero 区域 */}
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              智能生活，触手可及
            </h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              整合 10 大功能模块，AI 驱动的生活效率工具
            </p>
          </motion.div>

          {/* 功能网格 */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {modules.map((module, index) => (
              <motion.button
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveModule(module.id)}
                className={`${module.color} p-6 rounded-3xl text-white transition-all hover:scale-105 hover:shadow-lg active:scale-95`}
              >
                <module.icon className="w-8 h-8 mb-3" />
                <p className="font-semibold">{module.name}</p>
              </motion.button>
            ))}
          </div>
        </section>

        {/* 模块详情展示 */}
        <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="wait">
            {!activeModule ? (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="md:col-span-2 lg:col-span-2"
                >
                  <DocumentModule />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <HealthSyncModule />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <AccountingModule />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <MoodJournalModule />
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <VideoScriptModule />
                </motion.div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="md:col-span-2 lg:col-span-3"
              >
                {activeModule === 'wechat' && <WeChatAutomationModule />}
                {activeModule === 'document' && <DocumentModule />}
                {activeModule === 'call' && <CallRecordModule />}
                {activeModule === 'footprint' && <FootprintModule />}
                {activeModule === 'video' && <VideoScriptModule />}
                {activeModule === 'legal' && <LegalAnalysisModule />}
                {activeModule === 'health' && <HealthSyncModule />}
                {activeModule === 'accounting' && <AccountingModule />}
                {activeModule === 'mood' && <MoodJournalModule />}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* 底部提示 */}
        <section className="mt-16 text-center">
          <p className="text-sm text-gray-400">
            本 Demo 展示预期 UI 效果，部分功能需要配置真实 API
          </p>
          <p className="text-xs text-gray-300 mt-2">
            Powered by Next.js + React Native | Design: Apple Style
          </p>
        </section>
      </main>
    </div>
  );
}
