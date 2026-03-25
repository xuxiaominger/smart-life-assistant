import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const { width } = Dimensions.get('window');

// 模拟数据
const mockDocuments = [
  { id: 1, name: '合同要点总结.pdf', type: 'pdf', date: '2024-01-15', summary: '房屋租赁合同关键条款：租期1年，租金月付，押金2个月...' },
  { id: 2, name: '会议记录.docx', type: 'doc', date: '2024-01-14', summary: '项目进度会议：完成UI设计，进入开发阶段...' },
  { id: 3, name: '产品截图.png', type: 'image', date: '2024-01-13', summary: 'OCR识别：APP界面设计稿，主要功能模块展示...' },
  { id: 4, name: '资料包.zip', type: 'archive', date: '2024-01-12', summary: '包含：用户调研报告.pdf、市场分析.xlsx、竞品对比.docx' },
];

const mockCallRecords = [
  { id: 1, name: '张律师', duration: '5:32', date: '2024-01-15', transcript: '关于案件进展的沟通，确认下周开庭时间...' },
  { id: 2, name: '客户李总', duration: '12:15', date: '2024-01-14', transcript: '合同细节讨论，确定最终条款...' },
  { id: 3, name: '同事王明', duration: '3:45', date: '2024-01-13', transcript: '工作交接事项...' },
];

const mockLocations = [
  { id: 1, name: '北京市朝阳区', time: '14:30' },
  { id: 2, name: '国贸CBD', time: '12:00' },
  { id: 3, name: '回家路上', time: '18:45' },
];

const mockLegalNews = [
  { id: 1, title: '男子因在群里发抢红包被误认为抢劫被判3年', category: '搞笑' },
  { id: 2, title: '老人碰瓷电动车反被撞骨折索赔10万', category: '尴尬' },
  { id: 3, title: '公司996工作制被员工录音举报', category: '愤怒' },
];

const mockLaws = [
  { id: 1, name: '《民法典》合同编', date: '2024-01-15', summary: '合同订立、效力、履行、变更等核心要点' },
  { id: 2, name: '《劳动法》加班规定', date: '2024-01-14', summary: '加班时间限制、加班费计算标准' },
  { id: 3, name: '《刑法》故意伤害罪', date: '2024-01-13', summary: '伤害程度认定、量刑标准' },
];

const mockHealthData = {
  steps: 8543,
  sleep: 7.5,
  calories: 2150,
  heartRate: 72,
};

const mockTransactions = [
  { id: 1, source: '微信', type: '支出', amount: 68, category: '餐饮', date: '今天 12:30', description: '午餐' },
  { id: 2, source: '支付宝', type: '收入', amount: 15000, category: '工资', date: '昨天 09:00', description: '月薪' },
  { id: 3, source: '招商银行', type: '支出', amount: 2999, category: '购物', date: '昨天 15:20', description: '电子产品' },
  { id: 4, source: '微信', type: '支出', amount: 15, category: '交通', date: '前天 08:15', description: '地铁' },
  { id: 5, source: '支付宝', type: '支出', amount: 128, category: '餐饮', date: '前天 19:00', description: '晚餐' },
];

const modules = [
  { id: 'document', name: '文档整理', color: '#007AFF', emoji: '📄' },
  { id: 'call', name: '通话录音', color: '#34C759', emoji: '📞' },
  { id: 'footprint', name: '足迹记录', color: '#AF52DE', emoji: '📍' },
  { id: 'video', name: '短视频', color: '#FF9500', emoji: '🎬' },
  { id: 'legal', name: '法律分析', color: '#FF3B30', emoji: '⚖️' },
  { id: 'health', name: '健康数据', color: '#FF2D55', emoji: '❤️' },
  { id: 'accounting', name: '记账本', color: '#5AC8FA', emoji: '💰' },
  { id: 'mood', name: '心情', color: '#FFCC00', emoji: '😊' },
];

function DocumentScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>文档智能整理</Text>
        <Text style={styles.tag}>AI 已处理</Text>
      </View>
      {mockDocuments.map((doc) => (
        <View key={doc.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#E3F2FD' }]}>
              <Text style={styles.iconText}>📄</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{doc.name}</Text>
              <Text style={styles.itemDate}>{doc.date}</Text>
            </View>
          </View>
          <Text style={styles.itemSummary}>{doc.summary}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function CallRecordScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>通话录音识别</Text>
        <Text style={[styles.tag, { backgroundColor: '#C8E6C9' }]}>3条新记录</Text>
      </View>
      {mockCallRecords.map((call) => (
        <View key={call.id} style={styles.itemCard}>
          <View style={styles.itemHeader}>
            <View style={[styles.iconCircle, { backgroundColor: '#C8E6C9' }]}>
              <Text style={styles.iconText}>📞</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{call.name}</Text>
              <Text style={styles.itemDate}>{call.date} · {call.duration}</Text>
            </View>
          </View>
          <Text style={styles.itemSummary}>{call.transcript}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function FootprintScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>足迹记录</Text>
        <Text style={[styles.tag, { backgroundColor: '#E1BEE7' }]}>今日 3 处</Text>
      </View>
      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>🗺️</Text>
        <Text style={styles.mapSubtext}>地图预览区域</Text>
        <Text style={styles.mapHint}>Google Maps API 预留</Text>
      </View>
      {mockLocations.map((loc) => (
        <View key={loc.id} style={styles.locationItem}>
          <View style={styles.dot} />
          <Text style={styles.locationName}>{loc.name}</Text>
          <Text style={styles.locationTime}>{loc.time}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

function VideoScriptScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>短视频脚本</Text>
        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateBtnText}>✨ AI 生成</Text>
        </TouchableOpacity>
      </View>
      {mockLegalNews.map((news) => (
        <View key={news.id} style={styles.itemCard}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{news.category}</Text>
          </View>
          <Text style={styles.newsTitle}>{news.title}</Text>
          <TouchableOpacity style={styles.generateLink}>
            <Text style={styles.generateLinkText}>生成 2 分钟脚本 →</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

function LegalAnalysisScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>法律条文分析</Text>
        <Text style={[styles.tag, { backgroundColor: '#FFCDD2' }]}>今日更新</Text>
      </View>
      {mockLaws.map((law) => (
        <View key={law.id} style={styles.itemCard}>
          <View style={styles.lawHeader}>
            <Text style={styles.lawIcon}>⚖️</Text>
            <Text style={styles.lawName}>{law.name}</Text>
            <Text style={styles.lawDate}>{law.date}</Text>
          </View>
          <Text style={styles.lawSummary}>{law.summary}</Text>
          <TouchableOpacity style={styles.generateLink}>
            <Text style={styles.generateLinkText}>🤖 AI 深度分析 →</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

function HealthScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>健康数据</Text>
        <Text style={[styles.tag, { backgroundColor: '#F8BBD9' }]}>❤️ 小米运动</Text>
      </View>
      <View style={styles.healthGrid}>
        <View style={[styles.healthCard, { backgroundColor: '#007AFF' }]}>
          <Text style={styles.healthIcon}>☀️</Text>
          <Text style={styles.healthValue}>{mockHealthData.steps}</Text>
          <Text style={styles.healthLabel}>步数</Text>
        </View>
        <View style={[styles.healthCard, { backgroundColor: '#AF52DE' }]}>
          <Text style={styles.healthIcon}>🌙</Text>
          <Text style={styles.healthValue}>{mockHealthData.sleep}h</Text>
          <Text style={styles.healthLabel}>睡眠</Text>
        </View>
        <View style={[styles.healthCard, { backgroundColor: '#FF9500' }]}>
          <Text style={styles.healthValue}>{mockHealthData.calories}</Text>
          <Text style={styles.healthLabel}>千卡</Text>
        </View>
        <View style={[styles.healthCard, { backgroundColor: '#FF2D55' }]}>
          <Text style={styles.healthValue}>{mockHealthData.heartRate}</Text>
          <Text style={styles.healthLabel}>心率</Text>
        </View>
      </View>
    </ScrollView>
  );
}

function AccountingScreen() {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>记账本</Text>
        <View style={styles.balanceRow}>
          <Text style={[styles.balance, { color: '#34C759' }]}>收 15000</Text>
          <Text style={[styles.balance, { color: '#FF3B30' }]}>支 3210</Text>
        </View>
      </View>
      <View style={styles.timeline}>
        {mockTransactions.map((tx) => (
          <View key={tx.id} style={styles.txItem}>
            <View style={[styles.txDot, { backgroundColor: tx.type === '收入' ? '#34C759' : '#FF3B30' }]} />
            <View style={styles.txContent}>
              <View style={styles.txHeader}>
                <Text style={[styles.txAmount, { color: tx.type === '收入' ? '#34C759' : '#FF3B30' }]}>
                  {tx.type === '收入' ? '+' : '-'}{tx.amount}元
                </Text>
                <Text style={styles.txSource}>{tx.source}</Text>
              </View>
              <Text style={styles.txDesc}>{tx.description} · {tx.category}</Text>
              <Text style={styles.txDate}>{tx.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

function MoodScreen() {
  const [selected, setSelected] = useState(0);
  const moods = ['😊 开心', '😰 焦虑', '😤 愤怒', '😢 难过'];
  const prompts = [
    '今天让你感到最有成就感的事情是什么？',
    '有没有什么事情让你感到焦虑？',
    '工作中有遇到什么挑战吗？',
    '有什么事情让你感到难过吗？',
  ];

  return (
    <ScrollView style={styles.screen}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>心情记录本</Text>
        <Text style={[styles.tag, { backgroundColor: '#FFF9C4' }]}>ENFP 专属</Text>
      </View>
      <View style={styles.moodSelector}>
        {moods.map((mood, i) => (
          <TouchableOpacity
            key={i}
            style={[styles.moodBtn, selected === i && styles.moodBtnActive]}
            onPress={() => setSelected(i)}
          >
            <Text style={[styles.moodBtnText, selected === i && styles.moodBtnTextActive]}>{mood}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.aiBox}>
        <Text style={styles.aiTitle}>💡 AI 心理导师</Text>
        <Text style={styles.aiPrompt}>{prompts[selected]}</Text>
        <Text style={styles.aiAdvice}>
          作为法律工作者，细心严谨很重要哦！试着每天花5分钟记录工作心得吧~
        </Text>
      </View>
      <TouchableOpacity style={styles.recordBtn}>
        <Text style={styles.recordBtnText}>💬 记录今日心情</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function HomeScreen({ navigation }: any) {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>智能生活，触手可及</Text>
        <Text style={styles.heroSubtitle}>整合 9 大功能模块，AI 驱动的生活效率工具</Text>
      </View>
      <View style={styles.moduleGrid}>
        {modules.map((module) => (
          <TouchableOpacity
            key={module.id}
            style={[styles.moduleCard, { backgroundColor: module.color }]}
            onPress={() => navigation.navigate(module.id)}
          >
            <Text style={styles.moduleEmoji}>{module.emoji}</Text>
            <Text style={styles.moduleName}>{module.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.footer}>本 Demo 展示预期 UI 效果</Text>
    </ScrollView>
  );
}

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F5F7" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFF' },
          headerTintColor: '#007AFF',
          headerTitleStyle: { fontWeight: '600' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '智能生活助手' }}
        />
        <Stack.Screen name="document" component={DocumentScreen} options={{ title: '文档整理' }} />
        <Stack.Screen name="call" component={CallRecordScreen} options={{ title: '通话录音' }} />
        <Stack.Screen name="footprint" component={FootprintScreen} options={{ title: '足迹记录' }} />
        <Stack.Screen name="video" component={VideoScriptScreen} options={{ title: '短视频脚本' }} />
        <Stack.Screen name="legal" component={LegalAnalysisScreen} options={{ title: '法律分析' }} />
        <Stack.Screen name="health" component={HealthScreen} options={{ title: '健康数据' }} />
        <Stack.Screen name="accounting" component={AccountingScreen} options={{ title: '记账本' }} />
        <Stack.Screen name="mood" component={MoodScreen} options={{ title: '心情记录' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  hero: {
    padding: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1D1D1F',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#86868B',
    textAlign: 'center',
  },
  moduleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  moduleCard: {
    width: (width - 40) / 2,
    padding: 20,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  moduleEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moduleName: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#FFF',
    margin: 16,
    padding: 20,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1D1D1F',
  },
  tag: {
    fontSize: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#E3F2FD',
    color: '#007AFF',
  },
  itemCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  itemInfo: {
    marginLeft: 12,
    flex: 1,
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  itemDate: {
    fontSize: 12,
    color: '#86868B',
  },
  itemSummary: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  mapPlaceholder: {
    height: 200,
    backgroundColor: '#E8E8ED',
    marginHorizontal: 16,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  mapText: {
    fontSize: 48,
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 16,
    color: '#86868B',
  },
  mapHint: {
    fontSize: 12,
    color: '#AEAEB2',
    marginTop: 4,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#AF52DE',
    marginRight: 12,
  },
  locationName: {
    flex: 1,
    fontSize: 14,
    color: '#1D1D1F',
  },
  locationTime: {
    fontSize: 12,
    color: '#86868B',
  },
  generateBtn: {
    backgroundColor: '#FF9500',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  generateBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 13,
  },
  categoryBadge: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 11,
    color: '#FF9500',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  generateLink: {
    marginTop: 8,
  },
  generateLinkText: {
    fontSize: 13,
    color: '#007AFF',
  },
  lawHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  lawIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  lawName: {
    flex: 1,
    fontSize: 15,
    fontWeight: '500',
    color: '#1D1D1F',
  },
  lawDate: {
    fontSize: 12,
    color: '#86868B',
  },
  lawSummary: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  healthGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
  },
  healthCard: {
    width: (width - 40) / 2,
    padding: 20,
    borderRadius: 16,
    margin: 4,
    alignItems: 'center',
  },
  healthIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  healthValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF',
  },
  healthLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  balanceRow: {
    flexDirection: 'row',
    gap: 12,
  },
  balance: {
    fontSize: 14,
    fontWeight: '500',
  },
  timeline: {
    padding: 16,
  },
  txItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  txDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
    marginRight: 12,
  },
  txContent: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12,
  },
  txHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  txAmount: {
    fontSize: 15,
    fontWeight: '600',
  },
  txSource: {
    fontSize: 11,
    color: '#86868B',
  },
  txDesc: {
    fontSize: 13,
    color: '#1D1D1F',
  },
  txDate: {
    fontSize: 11,
    color: '#AEAEB2',
    marginTop: 4,
  },
  moodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 8,
  },
  moodBtn: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#FFF',
    borderRadius: 12,
    alignItems: 'center',
  },
  moodBtnActive: {
    backgroundColor: '#007AFF',
  },
  moodBtnText: {
    fontSize: 13,
    color: '#666',
  },
  moodBtnTextActive: {
    color: '#FFF',
    fontWeight: '500',
  },
  aiBox: {
    backgroundColor: '#FFFDE7',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  aiTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1D1D1F',
    marginBottom: 8,
  },
  aiPrompt: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
  },
  aiAdvice: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
  },
  recordBtn: {
    backgroundColor: '#007AFF',
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 32,
  },
  recordBtnText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 15,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    color: '#AEAEB2',
    marginTop: 16,
    marginBottom: 32,
  },
});
