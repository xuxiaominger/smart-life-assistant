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

// 模块组件
function DocumentModule() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-900">文档智能整理</h3>
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">AI 已处理</span>
      </div>
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

// 主页面
export default function HomePage() {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const modules = [
    { id: 'document', name: '文档整理', icon: FileText, color: 'bg-blue-500' },
    { id: 'call', name: '通话录音', icon: Phone, color: 'bg-green-500' },
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
              整合 9 大功能模块，AI 驱动的生活效率工具
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
