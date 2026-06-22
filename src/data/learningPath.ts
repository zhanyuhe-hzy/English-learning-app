// 零基础学习方法与学习路径
export interface LearningStage {
  id: string;
  stage: string;
  title: string;
  duration: string;
  goal: string;
  tasks: string[];
  tips: string[];
  resources: { name: string; description: string; type: 'book' | 'app' | 'video' | 'podcast' }[];
}

export interface LearningMethod {
  id: string;
  title: string;
  icon: string;
  description: string;
  steps: string[];
  benefits: string[];
  warnings?: string[];
}

export const learningPath: LearningStage[] = [
  {
    id: 'stage1',
    stage: 'Stage 1',
    title: '音标与发音基础',
    duration: '2-4 周',
    goal: '掌握 48 个国际音标，能正确拼读单词。',
    tasks: [
      '认识 48 个国际音标（元音 + 辅音）',
      '掌握元音的长短音区别',
      '学会 5 个常见双元音（/eɪ/, /aɪ/, /ɔɪ/, /aʊ/, /əʊ/）',
      '掌握常见辅音（爆破音、摩擦音、破擦音）',
      '练习单词重音和句子节奏',
    ],
    tips: [
      '音标是英语学习的基石，必须扎实',
      '每天听 10 分钟原声音频跟读',
      '录音对比，发现自己发音问题',
      '不要急，每个音标都对应口腔具体位置',
    ],
    resources: [
      { name: 'BBC Learning English', description: '英式发音权威教程', type: 'video' },
      { name: 'Rachel English', description: '美式发音 YouTube 频道', type: 'video' },
    ],
  },
  {
    id: 'stage2',
    stage: 'Stage 2',
    title: '基础词汇积累',
    duration: '4-8 周',
    goal: '积累 1000-2000 个高频词汇。',
    tasks: [
      '学习日常生活高频词（500 个）',
      '掌握常见名词、动词、形容词',
      '通过场景记忆单词（食物、颜色、家庭等）',
      '每天记忆 20 个新单词',
      '通过阅读和听力巩固',
    ],
    tips: [
      '高频词优先：先学出现频率最高的 1000 词',
      '用句子记单词：不要孤立背单词',
      '建立自己的单词本：分类整理',
      '坚持每天复习：遗忘曲线',
    ],
    resources: [
      { name: 'Anki', description: '间隔重复软件，科学抗遗忘', type: 'app' },
      { name: '多邻国 Duolingo', description: '游戏化学习入门', type: 'app' },
    ],
  },
  {
    id: 'stage3',
    stage: 'Stage 3',
    title: '基础语法框架',
    duration: '4-6 周',
    goal: '掌握英语语法的核心规则。',
    tasks: [
      '理解英语句子基本结构（主谓宾）',
      '掌握五种基本时态（一般现在、过去、将来、进行、完成）',
      '学习常用句型（There be、It is...）',
      '理解名词单复数和动词变化',
      '学习基础介词和冠词使用',
    ],
    tips: [
      '语法是规则，不要死记硬背',
      '通过例句理解语法',
      '做语法练习题巩固',
      '初学阶段先掌握最常见的 80% 用法',
    ],
    resources: [
      { name: 'English Grammar in Use', description: '剑桥英语语法书', type: 'book' },
      { name: 'Grammar Girl', description: '通俗易懂的语法博客', type: 'podcast' },
    ],
  },
  {
    id: 'stage4',
    stage: 'Stage 4',
    title: '听力与口语',
    duration: '8-12 周',
    goal: '能听懂日常对话，尝试开口说。',
    tasks: [
      '每天听 30 分钟适合自己水平的材料',
      '从慢速英语开始（VOA Special English）',
      '尝试跟读模仿',
      '大声朗读简单短文',
      '找语伴练习日常对话',
    ],
    tips: [
      '精听与泛听结合',
      '听不懂的地方反复听',
      '跟读时注意语调、连读、弱读',
      '不要怕说错，开口最重要',
    ],
    resources: [
      { name: '每日英语听力', description: '海量听力材料', type: 'app' },
      { name: 'Tandem', description: '全球语伴交换平台', type: 'app' },
    ],
  },
  {
    id: 'stage5',
    stage: 'Stage 5',
    title: '阅读与写作',
    duration: '持续进行',
    goal: '能阅读简单英文文章，书写日常邮件。',
    tasks: [
      '每天阅读 20 分钟英文文章',
      '从分级读物开始（牛津书虫等）',
      '学习常用写作模板（邮件、便条）',
      '尝试用英语写日记',
      '积累高级词汇和短语',
    ],
    tips: [
      '选择感兴趣的主题',
      '不要每个生词都查，先猜意思',
      '写作要敢于表达，语法慢慢改',
      '模仿地道的表达方式',
    ],
    resources: [
      { name: 'Graded Readers', description: '牛津书虫分级读物', type: 'book' },
      { name: 'Quora / Reddit', description: '英文社区', type: 'app' },
    ],
  },
];

export const learningMethods: LearningMethod[] = [
  {
    id: 'm1',
    title: '沉浸式学习法',
    icon: '🌍',
    description: '将英语融入日常生活环境，模拟母语者的学习方式。',
    steps: [
      '把手机、电脑系统语言改成英文',
      '社交媒体关注英文账号',
      '听英文播客、看英文视频',
      '用英语写日记、笔记',
      '思考时尝试用英语表达',
    ],
    benefits: [
      '培养英语思维',
      '接触真实语言环境',
      '学习地道表达',
      '进步速度快',
    ],
    warnings: [
      '初期会感到不适',
      '需要长期坚持',
    ],
  },
  {
    id: 'm2',
    title: '间隔重复法（Anki）',
    icon: '🧠',
    description: '基于遗忘曲线，在即将忘记时复习。',
    steps: [
      '制作高质量单词卡片（单词 + 例句 + 配图）',
      '每天固定时间复习',
      '诚实评估自己的记忆程度',
      '坚持每天 20-30 分钟',
    ],
    benefits: [
      '高效利用时间',
      '长期记忆效果好',
      '科学性强',
    ],
  },
  {
    id: 'm3',
    title: '影子跟读法（Shadowing）',
    icon: '👂',
    description: '跟着原声同步复述，训练听力和口语。',
    steps: [
      '选择适合水平的音频（带原文）',
      '听一遍理解内容',
      '边听边跟读，模仿语音语调',
      '录音对比，调整发音',
    ],
    benefits: [
      '提高发音准确度',
      '改善语流和节奏',
      '提升听力反应速度',
    ],
    warnings: [
      '需要较高专注度',
      '初期会感觉跟不上',
    ],
  },
  {
    id: 'm4',
    title: '输出驱动法',
    icon: '✍️',
    description: '以输出（说/写）倒逼输入（读/听）学习。',
    steps: [
      '确定一个输出目标（如写一篇文章）',
      '在写作/表达中发现自己的不足',
      '针对性学习相关词汇和语法',
      '完成后请老师或语伴反馈',
    ],
    benefits: [
      '学习目标明确',
      '进步实用性强',
      '激发学习动力',
    ],
  },
  {
    id: 'm5',
    title: '场景化学习法',
    icon: '🎬',
    description: '在具体场景中学习英语，活学活用。',
    steps: [
      '选择感兴趣的场景（旅行、点餐等）',
      '学习该场景的核心表达',
      '模拟场景练习',
      '真实场景中应用',
    ],
    benefits: [
      '学习内容实用',
      '记忆更加牢固',
      '学完就能用',
    ],
  },
  {
    id: 'm6',
    title: '可理解输入法 i+1',
    icon: '📚',
    description: 'Krashen 理论：选择略高于自己水平的材料。',
    steps: [
      '评估自己的当前水平',
      '选择 70-80% 能理解，20-30% 新内容的材料',
      '大量阅读和听力输入',
      '让大脑自然吸收新知识',
    ],
    benefits: [
      '学习压力小',
      '无痛提升',
      '符合语言习得规律',
    ],
  },
];

export const dailyRoutine = {
  morning: [
    '起床后听 10 分钟英语新闻/播客',
    '用英语思考今天要做什么',
  ],
  day: [
    '午休时阅读 1 篇英文短文',
    '用英语记下有趣的想法',
  ],
  evening: [
    '跟读 10 分钟口语材料',
    '复习 20 个单词',
    '用英语写日记 5 分钟',
  ],
};
