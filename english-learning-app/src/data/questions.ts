export type SceneCategory =
  | 'daily'     // 日常对话
  | 'travel'    // 旅行交通
  | 'business'  // 商务职场
  | 'academic'  // 学术教育
  | 'tech'      // 科技数码
  | 'culture'   // 文化娱乐
  | 'shopping'  // 购物消费
  | 'emotion'   // 情感表达
  | 'health'    // 健康医疗
  | 'proverb';  // 谚语名言

export interface Question {
  id: string;
  sourceText: string;
  targetText: string;
  sourceLang: 'en' | 'zh';
  keyWords: string[];
  grammar: string;
  difficulty: 1 | 2 | 3 | 4 | 5;
  category: SceneCategory;
}

export const categoryLabels: Record<SceneCategory, string> = {
  daily: '日常对话',
  travel: '旅行交通',
  business: '商务职场',
  academic: '学术教育',
  tech: '科技数码',
  culture: '文化娱乐',
  shopping: '购物消费',
  emotion: '情感表达',
  health: '健康医疗',
  proverb: '谚语名言',
};

export const categoryEmoji: Record<SceneCategory, string> = {
  daily: '☕',
  travel: '✈️',
  business: '💼',
  academic: '📚',
  tech: '💻',
  culture: '🎬',
  shopping: '🛍️',
  emotion: '💗',
  health: '🏃',
  proverb: '📜',
};

export const questions: Question[] = [
  // ===== 1-20 日常对话 =====
  {
    id: '1', sourceText: '我每天早上七点起床。', targetText: 'I wake up at seven every morning.',
    sourceLang: 'zh', keyWords: ['wake up', 'every morning', '七点'],
    grammar: '一般现在时表示习惯性动作，时间频率副词放在句末。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '2', sourceText: 'She usually drinks coffee at breakfast.', targetText: '她通常在早餐时喝咖啡。',
    sourceLang: 'en', keyWords: ['usually', 'drinks', 'coffee', 'breakfast'],
    grammar: '一般现在时，she 第三人称单数动词加 s。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '3', sourceText: '他正在房间里做作业。', targetText: 'He is doing homework in his room.',
    sourceLang: 'zh', keyWords: ['is doing', 'homework', 'room'],
    grammar: '现在进行时 be + doing。地点介词 in。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '4', sourceText: 'The cat is sleeping on the sofa.', targetText: '那只猫正在沙发上睡觉。',
    sourceLang: 'en', keyWords: ['is sleeping', 'cat', 'sofa'],
    grammar: '现在进行时 be + doing。介词 on 表示在…上面。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '13', sourceText: '我昨天遇见了一位老朋友。', targetText: 'I met an old friend yesterday.',
    sourceLang: 'zh', keyWords: ['met', 'old friend', 'yesterday'],
    grammar: '一般过去时，meet 的过去式是 met。不定冠词 an。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '14', sourceText: 'She has already finished her homework.', targetText: '她已经完成了作业。',
    sourceLang: 'en', keyWords: ['has finished', 'already', 'homework'],
    grammar: '现在完成时，already 放在助动词后、动词前。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '29', sourceText: '我小时候怕黑。', targetText: 'I was afraid of the dark when I was a child.',
    sourceLang: 'zh', keyWords: ['was afraid of', 'dark', 'child'],
    grammar: 'be afraid of 害怕…。一般过去时。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '33', sourceText: '他拒绝回答我的问题。', targetText: 'He refused to answer my question.',
    sourceLang: 'zh', keyWords: ['refused', 'to answer', 'question'],
    grammar: 'refuse to do sth 拒绝做某事。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '35', sourceText: '我有困难时他会帮助我。', targetText: 'He will help me when I am in trouble.',
    sourceLang: 'zh', keyWords: ['will help', 'when', 'in trouble'],
    grammar: 'when 引导时间状语从句，主句将来时，从句用现在时。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '76', sourceText: 'She told me not to worry about her.', targetText: '她告诉我不要担心她。',
    sourceLang: 'en', keyWords: ['told me not to', 'worry about'],
    grammar: 'tell sb not to do sth 告诉某人不要做某事。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '97', sourceText: '窗户外边有一棵大树。', targetText: 'There is a big tree outside the window.',
    sourceLang: 'zh', keyWords: ['there is', 'big tree', 'outside'],
    grammar: 'There be 句型。outside the window 在窗外。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '101', sourceText: '请把窗户打开。', targetText: 'Please open the window.',
    sourceLang: 'zh', keyWords: ['please', 'open', 'window'],
    grammar: '祈使句以动词原形开头，please 用于礼貌请求。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '102', sourceText: 'Could you please pass me the salt?', targetText: '请把盐递给我好吗？',
    sourceLang: 'en', keyWords: ['Could you', 'pass me', 'salt'],
    grammar: 'Could you please do sth 礼貌请求句型。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '103', sourceText: '你叫什么名字？', targetText: 'What is your name?',
    sourceLang: 'zh', keyWords: ['what is', 'your name'],
    grammar: '特殊疑问句 what 询问身份。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '104', sourceText: 'How old are you?', targetText: '你多大了？',
    sourceLang: 'en', keyWords: ['how old', 'are you'],
    grammar: 'how old 询问年龄。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '105', sourceText: '我来自中国。', targetText: 'I come from China.',
    sourceLang: 'zh', keyWords: ['come from', 'China'],
    grammar: 'come from 来自…。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '106', sourceText: 'I usually go to bed at ten.', targetText: '我通常十点睡觉。',
    sourceLang: 'en', keyWords: ['usually', 'go to bed', 'at ten'],
    grammar: 'go to bed 就寝。频率副词位置。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '107', sourceText: '今天天气真好。', targetText: 'It is a lovely day today.',
    sourceLang: 'zh', keyWords: ['lovely day', 'today'],
    grammar: 'it 表示天气。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '108', sourceText: 'What do you do for a living?', targetText: '你是做什么工作的？',
    sourceLang: 'en', keyWords: ['what do you do', 'for a living'],
    grammar: '询问职业的固定表达。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '109', sourceText: '你住在几楼？', targetText: 'Which floor do you live on?',
    sourceLang: 'zh', keyWords: ['which floor', 'live on'],
    grammar: 'which 引导特殊疑问句。live on 住在某层。',
    difficulty: 2, category: 'daily',
  },

  // ===== 21-40 旅行交通 =====
  {
    id: '110', sourceText: '我想预订一张去北京的机票。', targetText: 'I would like to book a flight to Beijing.',
    sourceLang: 'zh', keyWords: ['would like to', 'book a flight', 'Beijing'],
    grammar: 'would like to do sth 想要做某事。book 预订。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '111', sourceText: 'Could you show me the way to the station?', targetText: '你能告诉我去车站的路吗？',
    sourceLang: 'en', keyWords: ['show me the way', 'station'],
    grammar: 'show sb the way to 给某人指去某地的路。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '112', sourceText: '请问最近的地铁站在哪里？', targetText: 'Excuse me, where is the nearest subway station?',
    sourceLang: 'zh', keyWords: ['excuse me', 'nearest', 'subway station'],
    grammar: 'where 引导地点状语。nearest 最高级。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '113', sourceText: 'How long does it take to get there?', targetText: '到那里要多久？',
    sourceLang: 'en', keyWords: ['how long', 'take', 'get there'],
    grammar: 'it takes + 时间 + to do sth 做某事要花多少时间。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '114', sourceText: '我把这趟旅行推迟到了下个月。', targetText: 'I put off the trip until next month.',
    sourceLang: 'zh', keyWords: ['put off', 'trip', 'until next month'],
    grammar: 'put off 推迟。until 表示直到。',
    difficulty: 3, category: 'travel',
  },
  {
    id: '115', sourceText: 'The hotel is within walking distance of the beach.', targetText: '这家酒店步行即可到达海滩。',
    sourceLang: 'en', keyWords: ['within walking distance', 'beach'],
    grammar: 'within walking distance 步行可达的距离。',
    difficulty: 3, category: 'travel',
  },
  {
    id: '116', sourceText: '请把我的行李搬上出租车。', targetText: 'Please put my luggage in the taxi.',
    sourceLang: 'zh', keyWords: ['luggage', 'taxi'],
    grammar: 'luggage 行李，不可数名词。in the taxi 在出租车上。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '117', sourceText: 'I missed my flight due to the traffic jam.', targetText: '由于堵车我误了航班。',
    sourceLang: 'en', keyWords: ['missed my flight', 'due to', 'traffic jam'],
    grammar: 'miss 错过。due to 由于。traffic jam 交通堵塞。',
    difficulty: 3, category: 'travel',
  },
  {
    id: '118', sourceText: '我们到达时天已经黑了。', targetText: 'It was already dark when we arrived.',
    sourceLang: 'zh', keyWords: ['already dark', 'when', 'arrived'],
    grammar: 'when 引导时间状语从句。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '119', sourceText: 'I will pick you up at the airport tomorrow.', targetText: '我明天去机场接你。',
    sourceLang: 'en', keyWords: ['pick up', 'at the airport', 'tomorrow'],
    grammar: 'pick up 接人。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '120', sourceText: '我想办理酒店入住。', targetText: 'I would like to check in at the hotel.',
    sourceLang: 'zh', keyWords: ['check in', 'hotel'],
    grammar: 'check in 办理入住。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '121', sourceText: 'Could I have a window seat, please?', targetText: '请给我一个靠窗的座位。',
    sourceLang: 'en', keyWords: ['window seat', 'please'],
    grammar: 'have a window seat 坐靠窗座位。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '122', sourceText: '从机场到市中心有多远？', targetText: 'How far is it from the airport to the city center?',
    sourceLang: 'zh', keyWords: ['how far', 'from...to...', 'airport', 'city center'],
    grammar: 'how far 询问距离。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '123', sourceText: 'I would like to extend my stay for two more nights.', targetText: '我想再多住两晚。',
    sourceLang: 'en', keyWords: ['extend', 'stay', 'two more nights'],
    grammar: 'extend my stay 延长住宿。',
    difficulty: 3, category: 'travel',
  },
  {
    id: '124', sourceText: '我们乘船横渡了太平洋。', targetText: 'We sailed across the Pacific Ocean.',
    sourceLang: 'zh', keyWords: ['sailed', 'across', 'Pacific Ocean'],
    grammar: 'sail across 乘船横渡。across 介词，横穿。',
    difficulty: 3, category: 'travel',
  },
  {
    id: '125', sourceText: 'Don not forget to bring your passport.', targetText: '别忘了带护照。',
    sourceLang: 'en', keyWords: ['forget to', 'bring', 'passport'],
    grammar: 'forget to do 忘记做某事。',
    difficulty: 1, category: 'travel',
  },
  {
    id: '126', sourceText: '我已经订好了回程机票。', targetText: 'I have already booked a return ticket.',
    sourceLang: 'zh', keyWords: ['have booked', 'return ticket'],
    grammar: '现在完成时表示已发生。return ticket 回程票。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '127', sourceText: 'The flight was delayed because of the storm.', targetText: '航班因为暴风雨延误了。',
    sourceLang: 'en', keyWords: ['delayed', 'because of', 'storm'],
    grammar: 'be delayed 被延误。because of + 名词。',
    difficulty: 3, category: 'travel',
  },
  {
    id: '128', sourceText: '请问洗手间在哪里？', targetText: 'Could you tell me where the restroom is?',
    sourceLang: 'zh', keyWords: ['restroom', 'where'],
    grammar: 'where 引导宾语从句。',
    difficulty: 2, category: 'travel',
  },
  {
    id: '129', sourceText: 'I am looking forward to visiting the Great Wall.', targetText: '我期待着参观长城。',
    sourceLang: 'en', keyWords: ['looking forward to', 'visiting', 'Great Wall'],
    grammar: 'look forward to + doing 期待做某事。',
    difficulty: 3, category: 'travel',
  },

  // ===== 41-60 商务职场 =====
  {
    id: '5', sourceText: '我们上周去了巴黎旅游。', targetText: 'We went to Paris for a trip last week.',
    sourceLang: 'zh', keyWords: ['went', 'Paris', 'last week'],
    grammar: '一般过去时，go 的过去式 went。for + 目的。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '130', sourceText: '我想申请贵公司的职位。', targetText: 'I would like to apply for the position in your company.',
    sourceLang: 'zh', keyWords: ['apply for', 'position', 'company'],
    grammar: 'apply for 申请。',
    difficulty: 3, category: 'business',
  },
  {
    id: '131', sourceText: 'I have five years of experience in marketing.', targetText: '我有五年的市场营销经验。',
    sourceLang: 'en', keyWords: ['five years of experience', 'marketing'],
    grammar: 'experience 经验，不可数。',
    difficulty: 3, category: 'business',
  },
  {
    id: '132', sourceText: '我们下周一会开一个项目会议。', targetText: 'We will hold a project meeting next Monday.',
    sourceLang: 'zh', keyWords: ['hold a meeting', 'project', 'next Monday'],
    grammar: 'hold a meeting 召开会议。',
    difficulty: 3, category: 'business',
  },
  {
    id: '133', sourceText: 'Please find attached my resume for your review.', targetText: '请查收附件中的简历以供审阅。',
    sourceLang: 'en', keyWords: ['attached', 'resume', 'review'],
    grammar: 'find attached 请查收附件。',
    difficulty: 3, category: 'business',
  },
  {
    id: '134', sourceText: '我负责管理一个十人团队。', targetText: 'I am in charge of managing a team of ten.',
    sourceLang: 'zh', keyWords: ['in charge of', 'managing', 'a team of ten'],
    grammar: 'be in charge of 负责。',
    difficulty: 3, category: 'business',
  },
  {
    id: '135', sourceText: 'I would appreciate it if you could reply at your earliest convenience.', targetText: '如果您方便，请尽早回复，我将不胜感激。',
    sourceLang: 'en', keyWords: ['appreciate', 'reply', 'earliest convenience'],
    grammar: 'would appreciate it if... 礼貌请求句型。',
    difficulty: 4, category: 'business',
  },
  {
    id: '136', sourceText: '我们必须在截止日期前完成这项工作。', targetText: 'We must finish the work before the deadline.',
    sourceLang: 'zh', keyWords: ['must', 'deadline', 'before'],
    grammar: 'must 必须。before the deadline 在截止日期前。',
    difficulty: 2, category: 'business',
  },
  {
    id: '137', sourceText: 'The proposal was approved by the board of directors.', targetText: '提案获得了董事会的批准。',
    sourceLang: 'en', keyWords: ['proposal', 'approved', 'board of directors'],
    grammar: '被动语态 was/were + 过去分词。',
    difficulty: 3, category: 'business',
  },
  {
    id: '138', sourceText: '请把这份报告复印三份。', targetText: 'Please make three copies of this report.',
    sourceLang: 'zh', keyWords: ['make copies', 'report'],
    grammar: 'make copies of 复印。',
    difficulty: 2, category: 'business',
  },
  {
    id: '139', sourceText: 'I am writing to inquire about your products.', targetText: '我写信是想咨询贵公司的产品。',
    sourceLang: 'en', keyWords: ['writing to inquire', 'products'],
    grammar: 'write to inquire about 写信咨询。',
    difficulty: 3, category: 'business',
  },
  {
    id: '140', sourceText: '他被提升为销售经理。', targetText: 'He was promoted to sales manager.',
    sourceLang: 'zh', keyWords: ['was promoted', 'sales manager'],
    grammar: 'be promoted to 被提升为。',
    difficulty: 3, category: 'business',
  },
  {
    id: '141', sourceText: 'We are looking for someone with strong leadership skills.', targetText: '我们正在寻找具有卓越领导能力的人才。',
    sourceLang: 'en', keyWords: ['looking for', 'leadership skills'],
    grammar: 'look for 寻找。leadership 领导能力。',
    difficulty: 3, category: 'business',
  },
  {
    id: '142', sourceText: '我们达成了双赢的局面。', targetText: 'We reached a win-win situation.',
    sourceLang: 'zh', keyWords: ['reached', 'win-win', 'situation'],
    grammar: 'reach a situation 达成局面。win-win 双赢。',
    difficulty: 3, category: 'business',
  },
  {
    id: '143', sourceText: 'The customer is always right.', targetText: '顾客永远是对的。',
    sourceLang: 'en', keyWords: ['customer', 'always right'],
    grammar: '谚语表达。',
    difficulty: 1, category: 'business',
  },
  {
    id: '144', sourceText: '我们公司注重团队合作精神。', targetText: 'Our company values the spirit of teamwork.',
    sourceLang: 'zh', keyWords: ['values', 'spirit of teamwork'],
    grammar: 'value 重视。teamwork 团队合作。',
    difficulty: 3, category: 'business',
  },
  {
    id: '145', sourceText: 'I will follow up on this matter next week.', targetText: '我下周会跟进这件事。',
    sourceLang: 'en', keyWords: ['follow up', 'matter', 'next week'],
    grammar: 'follow up 跟进。',
    difficulty: 3, category: 'business',
  },
  {
    id: '146', sourceText: '我们双方就价格达成了一致。', targetText: 'We reached an agreement on the price.',
    sourceLang: 'zh', keyWords: ['reached', 'agreement', 'on the price'],
    grammar: 'reach an agreement on 就…达成一致。',
    difficulty: 3, category: 'business',
  },
  {
    id: '147', sourceText: 'Please let me know if you have any further questions.', targetText: '如果您还有其他问题，请告诉我。',
    sourceLang: 'en', keyWords: ['let me know', 'further questions'],
    grammar: 'let me know 让我知道。further 进一步的。',
    difficulty: 2, category: 'business',
  },
  {
    id: '148', sourceText: '我们必须严格遵守合同条款。', targetText: 'We must strictly abide by the terms of the contract.',
    sourceLang: 'zh', keyWords: ['strictly', 'abide by', 'terms', 'contract'],
    grammar: 'abide by 遵守。',
    difficulty: 4, category: 'business',
  },

  // ===== 61-90 学术教育 =====
  {
    id: '6', sourceText: 'I have lived in Shanghai for five years.', targetText: '我在上海住了五年了。',
    sourceLang: 'en', keyWords: ['have lived', 'for five years'],
    grammar: '现在完成时 have + 过去分词。for + 时间段。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '32', sourceText: 'I have been learning English since 2010.', targetText: '自2010年以来我一直在学英语。',
    sourceLang: 'en', keyWords: ['have been learning', 'since'],
    grammar: '现在完成进行时 have been doing，表示持续动作。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '149', sourceText: '这篇论文涵盖了人工智能的最新进展。', targetText: 'This paper covers the latest advances in artificial intelligence.',
    sourceLang: 'zh', keyWords: ['paper', 'covers', 'advances', 'artificial intelligence'],
    grammar: 'cover 涵盖。artificial intelligence 人工智能。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '150', sourceText: 'The professor gave us an assignment on climate change.', targetText: '教授给我们布置了一个关于气候变化的作业。',
    sourceLang: 'en', keyWords: ['professor', 'gave', 'assignment', 'climate change'],
    grammar: 'give sb sth 给某人某物。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '151', sourceText: '我们进行了大量数据分析。', targetText: 'We carried out extensive data analysis.',
    sourceLang: 'zh', keyWords: ['carried out', 'extensive', 'data analysis'],
    grammar: 'carry out 进行。extensive 大量的。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '152', sourceText: 'The results indicate that there is a significant correlation.', targetText: '结果表明存在显著相关性。',
    sourceLang: 'en', keyWords: ['results', 'indicate', 'significant', 'correlation'],
    grammar: 'indicate 表明。significant 显著的。',
    difficulty: 4, category: 'academic',
  },
  {
    id: '153', sourceText: '研究表明吸烟有害健康。', targetText: 'Research shows that smoking is harmful to health.',
    sourceLang: 'zh', keyWords: ['research', 'shows', 'smoking', 'harmful'],
    grammar: 'research shows that… 研究表明。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '154', sourceText: 'I am working on my thesis these days.', targetText: '我这些天在写论文。',
    sourceLang: 'en', keyWords: ['working on', 'thesis', 'these days'],
    grammar: 'work on 从事。these days 这些天。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '155', sourceText: '他以优异的成绩毕业了。', targetText: 'He graduated with excellent grades.',
    sourceLang: 'zh', keyWords: ['graduated', 'with', 'excellent grades'],
    grammar: 'graduate with 以…成绩毕业。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '156', sourceText: 'The theory was first proposed in the 19th century.', targetText: '该理论最早在 19 世纪被提出。',
    sourceLang: 'en', keyWords: ['theory', 'proposed', '19th century'],
    grammar: '被动语态 was + 过去分词。19th century 19 世纪。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '157', sourceText: '请把这个段落翻译成英文。', targetText: 'Please translate this paragraph into English.',
    sourceLang: 'zh', keyWords: ['translate', 'paragraph', 'into English'],
    grammar: 'translate…into… 把…翻译成…。',
    difficulty: 1, category: 'academic',
  },
  {
    id: '158', sourceText: 'I find it difficult to concentrate in a noisy environment.', targetText: '我发现自己在嘈杂的环境中难以集中注意力。',
    sourceLang: 'en', keyWords: ['find it difficult', 'concentrate', 'noisy environment'],
    grammar: 'find it + adj + to do 发现做某事…',
    difficulty: 4, category: 'academic',
  },
  {
    id: '159', sourceText: '他获得了诺贝尔文学奖。', targetText: 'He was awarded the Nobel Prize in Literature.',
    sourceLang: 'zh', keyWords: ['awarded', 'Nobel Prize', 'Literature'],
    grammar: 'be awarded 被动语态被授予。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '160', sourceText: 'The experiment confirmed the hypothesis.', targetText: '实验证实了假设。',
    sourceLang: 'en', keyWords: ['experiment', 'confirmed', 'hypothesis'],
    grammar: 'confirm 证实。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '161', sourceText: '她在图书馆查了很多资料。', targetText: 'She looked up a lot of materials in the library.',
    sourceLang: 'zh', keyWords: ['looked up', 'materials', 'library'],
    grammar: 'look up 查阅。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '162', sourceText: 'The professor emphasized the importance of critical thinking.', targetText: '教授强调了批判性思维的重要性。',
    sourceLang: 'en', keyWords: ['emphasized', 'importance', 'critical thinking'],
    grammar: 'emphasize 强调。critical thinking 批判性思维。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '163', sourceText: '我们应该独立思考。', targetText: 'We should think independently.',
    sourceLang: 'zh', keyWords: ['should', 'think', 'independently'],
    grammar: 'should 应该。independently 副词独立地。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '164', sourceText: 'She is specializing in environmental science.', targetText: '她专攻环境科学。',
    sourceLang: 'en', keyWords: ['specializing in', 'environmental science'],
    grammar: 'specialize in 专攻。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '165', sourceText: '他写了一份关于全球变暖的报告。', targetText: 'He wrote a report on global warming.',
    sourceLang: 'zh', keyWords: ['wrote', 'report', 'global warming'],
    grammar: 'write a report on 写关于…的报告。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '166', sourceText: 'The scholarship enabled her to study abroad.', targetText: '奖学金使她能够出国留学。',
    sourceLang: 'en', keyWords: ['scholarship', 'enabled', 'study abroad'],
    grammar: 'enable sb to do sth 使某人能做某事。',
    difficulty: 3, category: 'academic',
  },

  // ===== 91-110 科技数码 =====
  {
    id: '167', sourceText: '人工智能正在改变我们的生活方式。', targetText: 'Artificial intelligence is changing the way we live.',
    sourceLang: 'zh', keyWords: ['artificial intelligence', 'changing', 'way we live'],
    grammar: '现在进行时 is changing。the way we live 我们生活方式。',
    difficulty: 3, category: 'tech',
  },
  {
    id: '168', sourceText: 'The new software has significantly improved our productivity.', targetText: '新软件显著提高了我们的生产力。',
    sourceLang: 'en', keyWords: ['software', 'significantly improved', 'productivity'],
    grammar: '现在完成时 has + 过去分词。',
    difficulty: 4, category: 'tech',
  },
  {
    id: '169', sourceText: '请更新你的手机系统。', targetText: 'Please update your phone system.',
    sourceLang: 'zh', keyWords: ['update', 'phone system'],
    grammar: 'update 更新。',
    difficulty: 1, category: 'tech',
  },
  {
    id: '170', sourceText: 'Cloud computing has become an essential part of modern business.', targetText: '云计算已成为现代商业的重要组成部分。',
    sourceLang: 'en', keyWords: ['cloud computing', 'essential part', 'modern business'],
    grammar: '现在完成时 has become。',
    difficulty: 4, category: 'tech',
  },
  {
    id: '171', sourceText: '我的电脑中了病毒。', targetText: 'My computer got infected with a virus.',
    sourceLang: 'zh', keyWords: ['computer', 'got infected', 'virus'],
    grammar: 'get infected with 感染上。',
    difficulty: 2, category: 'tech',
  },
  {
    id: '172', sourceText: 'We should back up our files regularly.', targetText: '我们应该定期备份文件。',
    sourceLang: 'en', keyWords: ['back up', 'files', 'regularly'],
    grammar: 'back up 备份。regularly 定期地。',
    difficulty: 2, category: 'tech',
  },
  {
    id: '173', sourceText: '这台机器每小时能处理一百万条数据。', targetText: 'This machine can process one million pieces of data per hour.',
    sourceLang: 'zh', keyWords: ['machine', 'process', 'million', 'per hour'],
    grammar: 'can + 动词原形。',
    difficulty: 3, category: 'tech',
  },
  {
    id: '174', sourceText: 'The app allows users to share photos instantly.', targetText: '这个应用允许用户即时分享照片。',
    sourceLang: 'en', keyWords: ['app', 'allows', 'share', 'instantly'],
    grammar: 'allow sb to do 允许某人做。',
    difficulty: 3, category: 'tech',
  },
  {
    id: '175', sourceText: '我忘记了我的密码。', targetText: 'I forgot my password.',
    sourceLang: 'zh', keyWords: ['forgot', 'password'],
    grammar: '一般过去时 forget 的过去式 forgot。',
    difficulty: 1, category: 'tech',
  },
  {
    id: '176', sourceText: 'Data is stored in the cloud for security reasons.', targetText: '出于安全考虑，数据存储在云端。',
    sourceLang: 'en', keyWords: ['data', 'stored', 'cloud', 'security reasons'],
    grammar: '被动语态 is stored。for…reasons 出于…原因。',
    difficulty: 4, category: 'tech',
  },
  {
    id: '177', sourceText: '他每天花三个小时上网。', targetText: 'He spends three hours surfing the Internet every day.',
    sourceLang: 'zh', keyWords: ['spends', 'surfing', 'Internet', 'every day'],
    grammar: 'spend time doing 花时间做某事。',
    difficulty: 2, category: 'tech',
  },
  {
    id: '178', sourceText: 'Cybersecurity has become a global concern.', targetText: '网络安全已成为全球关注的问题。',
    sourceLang: 'en', keyWords: ['cybersecurity', 'global concern'],
    grammar: '现在完成时 has become。',
    difficulty: 3, category: 'tech',
  },
  {
    id: '179', sourceText: '我下载了一个新应用。', targetText: 'I downloaded a new app.',
    sourceLang: 'zh', keyWords: ['downloaded', 'new app'],
    grammar: '一般过去时 download 的过去式 downloaded。',
    difficulty: 1, category: 'tech',
  },
  {
    id: '180', sourceText: 'The website offers a wide range of online courses.', targetText: '该网站提供广泛的在线课程。',
    sourceLang: 'en', keyWords: ['website', 'offers', 'wide range', 'online courses'],
    grammar: 'offer 提供。a wide range of 广泛的。',
    difficulty: 3, category: 'tech',
  },
  {
    id: '181', sourceText: '请把你的手机调成静音。', targetText: 'Please put your phone on silent mode.',
    sourceLang: 'zh', keyWords: ['silent mode', 'put on'],
    grammar: 'put on 调到（某种状态）。silent mode 静音模式。',
    difficulty: 2, category: 'tech',
  },
  {
    id: '182', sourceText: 'The device is equipped with advanced sensors.', targetText: '该设备配备了先进的传感器。',
    sourceLang: 'en', keyWords: ['device', 'equipped with', 'advanced', 'sensors'],
    grammar: 'be equipped with 配备。',
    difficulty: 4, category: 'tech',
  },
  {
    id: '183', sourceText: '这个软件界面非常友好。', targetText: 'This software has a very user-friendly interface.',
    sourceLang: 'zh', keyWords: ['software', 'user-friendly', 'interface'],
    grammar: 'user-friendly 用户友好的。',
    difficulty: 3, category: 'tech',
  },
  {
    id: '184', sourceText: 'We need to upgrade our computer system.', targetText: '我们需要升级电脑系统。',
    sourceLang: 'en', keyWords: ['upgrade', 'computer system'],
    grammar: 'upgrade 升级。need to do 需要做。',
    difficulty: 2, category: 'tech',
  },
  {
    id: '185', sourceText: '我无法登录我的账户。', targetText: 'I cannot log in to my account.',
    sourceLang: 'zh', keyWords: ['cannot', 'log in', 'account'],
    grammar: 'log in 登录。',
    difficulty: 2, category: 'tech',
  },
  {
    id: '186', sourceText: 'The robot can perform complex tasks automatically.', targetText: '这个机器人能自动执行复杂任务。',
    sourceLang: 'en', keyWords: ['robot', 'perform', 'complex tasks', 'automatically'],
    grammar: 'perform  执行。complex 复杂的。',
    difficulty: 3, category: 'tech',
  },

  // ===== 111-130 文化娱乐 =====
  {
    id: '187', sourceText: '我最喜欢的电影是《肖申克的救赎》。', targetText: 'My favorite movie is The Shawshank Redemption.',
    sourceLang: 'zh', keyWords: ['favorite', 'movie', 'Shawshank Redemption'],
    grammar: 'favorite 最喜欢的。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '188', sourceText: 'The concert was absolutely fantastic!', targetText: '这场音乐会简直太棒了！',
    sourceLang: 'en', keyWords: ['concert', 'absolutely fantastic'],
    grammar: 'absolutely 副词。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '189', sourceText: '她弹钢琴弹得很好。', targetText: 'She plays the piano very well.',
    sourceLang: 'zh', keyWords: ['plays', 'piano', 'very well'],
    grammar: 'play + the + 乐器。',
    difficulty: 1, category: 'culture',
  },
  {
    id: '190', sourceText: 'I am a big fan of classical music.', targetText: '我是古典音乐的超级粉丝。',
    sourceLang: 'en', keyWords: ['big fan', 'classical music'],
    grammar: 'be a big fan of 是…的粉丝。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '191', sourceText: '这本书被改编成了电影。', targetText: 'This book was adapted into a movie.',
    sourceLang: 'zh', keyWords: ['adapted into', 'movie'],
    grammar: 'be adapted into 被改编成。',
    difficulty: 3, category: 'culture',
  },
  {
    id: '192', sourceText: 'The museum is well worth a visit.', targetText: '这个博物馆很值得参观。',
    sourceLang: 'en', keyWords: ['museum', 'well worth', 'visit'],
    grammar: 'be worth doing 值得做。',
    difficulty: 3, category: 'culture',
  },
  {
    id: '193', sourceText: '春节是中国人最重要的节日。', targetText: 'The Spring Festival is the most important festival for Chinese people.',
    sourceLang: 'zh', keyWords: ['Spring Festival', 'most important', 'festival'],
    grammar: '最高级 the most + 形容词。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '194', sourceText: 'She has won several awards for her novels.', targetText: '她凭借小说获得了多个奖项。',
    sourceLang: 'en', keyWords: ['won', 'several', 'awards', 'novels'],
    grammar: 'win an award 获奖。',
    difficulty: 3, category: 'culture',
  },
  {
    id: '195', sourceText: '我们去看了一场精彩的足球赛。', targetText: 'We watched an exciting football match.',
    sourceLang: 'zh', keyWords: ['watched', 'exciting', 'football match'],
    grammar: 'watch + 比赛。exciting 形容词。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '196', sourceText: 'The play received a standing ovation.', targetText: '这部戏剧获得了全场起立鼓掌。',
    sourceLang: 'en', keyWords: ['play', 'received', 'standing ovation'],
    grammar: 'receive a standing ovation 获得起立鼓掌。',
    difficulty: 4, category: 'culture',
  },
  {
    id: '197', sourceText: '这幅画是著名画家画的。', targetText: 'This painting was created by a famous artist.',
    sourceLang: 'zh', keyWords: ['painting', 'created by', 'famous artist'],
    grammar: '被动语态 was created。',
    difficulty: 3, category: 'culture',
  },
  {
    id: '198', sourceText: 'He spends most of his free time reading.', targetText: '他大部分空闲时间都用来阅读。',
    sourceLang: 'en', keyWords: ['spends', 'free time', 'reading'],
    grammar: 'spend time doing 花时间做。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '199', sourceText: '这支乐队在世界范围内都很有名。', targetText: 'This band is famous all over the world.',
    sourceLang: 'zh', keyWords: ['band', 'famous', 'all over the world'],
    grammar: 'be famous all over the world 世界闻名。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '200', sourceText: 'The show was a huge success.', targetText: '这场演出大获成功。',
    sourceLang: 'en', keyWords: ['show', 'huge success'],
    grammar: 'be a huge success 大获成功。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '201', sourceText: '我们应该尊重不同的文化。', targetText: 'We should respect different cultures.',
    sourceLang: 'zh', keyWords: ['should', 'respect', 'cultures'],
    grammar: 'respect 尊重。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '202', sourceText: 'The festival dates back to the Tang Dynasty.', targetText: '这个节日可以追溯到唐代。',
    sourceLang: 'en', keyWords: ['festival', 'dates back to', 'Tang Dynasty'],
    grammar: 'date back to 追溯到。',
    difficulty: 4, category: 'culture',
  },
  {
    id: '203', sourceText: '她每天练习瑜伽半小时。', targetText: 'She practices yoga for half an hour every day.',
    sourceLang: 'zh', keyWords: ['practices', 'yoga', 'half an hour'],
    grammar: 'practice + 运动。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '204', sourceText: 'The book has been translated into dozens of languages.', targetText: '这本书已被翻译成数十种语言。',
    sourceLang: 'en', keyWords: ['translated into', 'dozens', 'languages'],
    grammar: '现在完成时被动。',
    difficulty: 4, category: 'culture',
  },
  {
    id: '205', sourceText: '我喜欢看纪录片。', targetText: 'I enjoy watching documentaries.',
    sourceLang: 'zh', keyWords: ['enjoy', 'watching', 'documentaries'],
    grammar: 'enjoy + doing 喜欢做某事。',
    difficulty: 1, category: 'culture',
  },
  {
    id: '206', sourceText: 'Photography is a way of expressing myself.', targetText: '摄影是我表达自我的一种方式。',
    sourceLang: 'en', keyWords: ['photography', 'way of', 'expressing'],
    grammar: 'a way of doing 做某事的方式。',
    difficulty: 3, category: 'culture',
  },

  // ===== 131-150 购物消费 =====
  {
    id: '207', sourceText: '这件衣服多少钱？', targetText: 'How much is this dress?',
    sourceLang: 'zh', keyWords: ['how much', 'dress'],
    grammar: 'how much 询问价格。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '208', sourceText: 'Can I try this on?', targetText: '我可以试穿一下吗？',
    sourceLang: 'en', keyWords: ['try on'],
    grammar: 'try on 试穿。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '209', sourceText: '这个尺码太大了。', targetText: 'This size is too big for me.',
    sourceLang: 'zh', keyWords: ['size', 'too big'],
    grammar: 'too + 形容词 + for sb 对某人来说太…',
    difficulty: 2, category: 'shopping',
  },
  {
    id: '210', sourceText: 'Do you have this in a different color?', targetText: '这个有其他颜色吗？',
    sourceLang: 'en', keyWords: ['different color'],
    grammar: 'a different color 不同的颜色。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '211', sourceText: '你们有打折吗？', targetText: 'Do you have any discounts?',
    sourceLang: 'zh', keyWords: ['discounts'],
    grammar: 'discount 折扣。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '212', sourceText: 'I am just looking around, thanks.', targetText: '我只是随便看看，谢谢。',
    sourceLang: 'en', keyWords: ['looking around'],
    grammar: 'look around 四处看看。',
    difficulty: 2, category: 'shopping',
  },
  {
    id: '213', sourceText: '我想用信用卡付款。', targetText: 'I would like to pay by credit card.',
    sourceLang: 'zh', keyWords: ['pay by', 'credit card'],
    grammar: 'pay by + 支付方式。',
    difficulty: 2, category: 'shopping',
  },
  {
    id: '214', sourceText: 'The price has been reduced by 20%.', targetText: '价格已降低 20%。',
    sourceLang: 'en', keyWords: ['reduced by', '20%'],
    grammar: '被动语态 has been reduced。',
    difficulty: 3, category: 'shopping',
  },
  {
    id: '215', sourceText: '请问退货政策是什么？', targetText: 'What is your return policy?',
    sourceLang: 'zh', keyWords: ['return policy'],
    grammar: 'return policy 退货政策。',
    difficulty: 2, category: 'shopping',
  },
  {
    id: '216', sourceText: 'Could I have a receipt, please?', targetText: '请给我一张收据好吗？',
    sourceLang: 'en', keyWords: ['receipt'],
    grammar: 'receipt 收据。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '217', sourceText: '我想点一份牛排。', targetText: 'I would like to order a steak.',
    sourceLang: 'zh', keyWords: ['order', 'steak'],
    grammar: 'order 点单。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '218', sourceText: 'I am allergic to shellfish.', targetText: '我对贝类海鲜过敏。',
    sourceLang: 'en', keyWords: ['allergic to', 'shellfish'],
    grammar: 'be allergic to 对…过敏。',
    difficulty: 2, category: 'shopping',
  },
  {
    id: '219', sourceText: '这个商品正在促销。', targetText: 'This item is on sale.',
    sourceLang: 'zh', keyWords: ['item', 'on sale'],
    grammar: 'on sale 促销。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '220', sourceText: 'We offer free shipping on orders over $50.', targetText: '订单满 50 美元我们提供免费送货。',
    sourceLang: 'en', keyWords: ['free shipping', 'orders over'],
    grammar: 'free shipping 免费送货。',
    difficulty: 3, category: 'shopping',
  },
  {
    id: '221', sourceText: '请帮我把礼物包装一下。', targetText: 'Please wrap this gift for me.',
    sourceLang: 'zh', keyWords: ['wrap', 'gift'],
    grammar: 'wrap 包装。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '222', sourceText: 'The quality is worth the price.', targetText: '质量对得起这个价格。',
    sourceLang: 'en', keyWords: ['quality', 'worth the price'],
    grammar: 'be worth the price 物有所值。',
    difficulty: 3, category: 'shopping',
  },
  {
    id: '223', sourceText: '我需要再考虑一下。', targetText: 'I need to think it over.',
    sourceLang: 'zh', keyWords: ['think over'],
    grammar: 'think over 仔细考虑。',
    difficulty: 2, category: 'shopping',
  },
  {
    id: '224', sourceText: 'I would like to exchange this for a smaller size.', targetText: '我想换一个更小的尺码。',
    sourceLang: 'en', keyWords: ['exchange for', 'smaller size'],
    grammar: 'exchange A for B 把 A 换成 B。',
    difficulty: 3, category: 'shopping',
  },
  {
    id: '225', sourceText: '这家店七点打烊。', targetText: 'This store closes at seven.',
    sourceLang: 'zh', keyWords: ['store', 'closes', 'at seven'],
    grammar: 'close 关门。',
    difficulty: 1, category: 'shopping',
  },
  {
    id: '226', sourceText: 'Cash or credit?', targetText: '现金还是信用卡？',
    sourceLang: 'en', keyWords: ['cash', 'credit'],
    grammar: 'cash 现金。credit 信用卡。',
    difficulty: 1, category: 'shopping',
  },

  // ===== 151-170 情感表达 =====
  {
    id: '9', sourceText: '这本书值得一读。', targetText: 'This book is worth reading.',
    sourceLang: 'zh', keyWords: ['worth', 'reading'],
    grammar: 'be worth doing 是固定用法，意为值得做某事。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '227', sourceText: '我对你的成功表示衷心的祝贺。', targetText: 'I sincerely congratulate you on your success.',
    sourceLang: 'zh', keyWords: ['sincerely', 'congratulate', 'success'],
    grammar: 'congratulate sb on sth 祝贺某人某事。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '228', sourceText: 'I am grateful for your help.', targetText: '我对你的帮助心存感激。',
    sourceLang: 'en', keyWords: ['grateful for', 'help'],
    grammar: 'be grateful for 对…感激。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '229', sourceText: '我们为他的成就感到骄傲。', targetText: 'We are proud of his achievements.',
    sourceLang: 'zh', keyWords: ['proud of', 'achievements'],
    grammar: 'be proud of 以…为荣。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '230', sourceText: 'She misses her family very much.', targetText: '她非常想念她的家人。',
    sourceLang: 'en', keyWords: ['misses', 'family', 'very much'],
    grammar: 'miss 想念。',
    difficulty: 1, category: 'emotion',
  },
  {
    id: '231', sourceText: '我忍不住笑了起来。', targetText: 'I could not help laughing.',
    sourceLang: 'zh', keyWords: ['could not help', 'laughing'],
    grammar: 'cannot help doing 忍不住做某事。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '232', sourceText: 'I am fed up with this boring job.', targetText: '我受够了这份无聊的工作。',
    sourceLang: 'en', keyWords: ['fed up with', 'boring job'],
    grammar: 'be fed up with 厌倦。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '233', sourceText: '他对她一见钟情。', targetText: 'He fell in love with her at first sight.',
    sourceLang: 'zh', keyWords: ['fell in love with', 'at first sight'],
    grammar: 'fall in love with 爱上。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '234', sourceText: 'I really look up to my grandfather.', targetText: '我非常崇敬我的祖父。',
    sourceLang: 'en', keyWords: ['look up to', 'grandfather'],
    grammar: 'look up to 尊敬。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '235', sourceText: '他慷慨地捐了钱给慈善机构。', targetText: 'He generously donated money to the charity.',
    sourceLang: 'zh', keyWords: ['generously', 'donated', 'charity'],
    grammar: 'donate to 捐赠。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '236', sourceText: 'She is full of confidence.', targetText: '她充满自信。',
    sourceLang: 'en', keyWords: ['full of', 'confidence'],
    grammar: 'be full of 充满。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '237', sourceText: '我对他的勇气印象深刻。', targetText: 'I was deeply impressed by his courage.',
    sourceLang: 'zh', keyWords: ['deeply impressed', 'courage'],
    grammar: 'be impressed by 对…印象深。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '238', sourceText: 'I can not stop thinking about you.', targetText: '我无法停止想你。',
    sourceLang: 'en', keyWords: ['cannot stop', 'thinking about'],
    grammar: 'cannot stop doing 忍不住做。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '239', sourceText: '我们分享彼此的喜怒哀乐。', targetText: 'We share our joys and sorrows with each other.',
    sourceLang: 'zh', keyWords: ['share', 'joys and sorrows', 'each other'],
    grammar: 'share sth with sb 与某人分享。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '240', sourceText: 'It breaks my heart to say goodbye.', targetText: '说再见让我心碎。',
    sourceLang: 'en', keyWords: ['breaks my heart', 'goodbye'],
    grammar: "it breaks one's heart 让某人心碎。",
    difficulty: 4, category: 'emotion',
  },
  {
    id: '241', sourceText: '她对音乐充满热情。', targetText: 'She has a passion for music.',
    sourceLang: 'zh', keyWords: ['passion for', 'music'],
    grammar: 'have a passion for 对…有热情。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '242', sourceText: 'I feel deeply sorry for what I said.', targetText: '我对我所说的话深感抱歉。',
    sourceLang: 'en', keyWords: ['deeply sorry', 'what I said'],
    grammar: 'be sorry for 因…抱歉。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '243', sourceText: '我们彼此之间失去了联系。', targetText: 'We lost touch with each other.',
    sourceLang: 'zh', keyWords: ['lost touch with', 'each other'],
    grammar: 'lose touch with 与…失去联系。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '244', sourceText: 'Never lose hope, no matter what happens.', targetText: '无论发生什么，永远不要失去希望。',
    sourceLang: 'en', keyWords: ['lose hope', 'no matter what'],
    grammar: 'no matter what 引导让步状语从句。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '245', sourceText: '他对她怀恨在心。', targetText: 'He holds a grudge against her.',
    sourceLang: 'zh', keyWords: ['holds a grudge', 'against'],
    grammar: 'hold a grudge against 怀恨在心。',
    difficulty: 4, category: 'emotion',
  },

  // ===== 171-190 健康医疗 =====
  {
    id: '246', sourceText: '我感冒了需要看医生。', targetText: 'I have a cold and need to see a doctor.',
    sourceLang: 'zh', keyWords: ['have a cold', 'see a doctor'],
    grammar: 'have a cold 感冒。see a doctor 看医生。',
    difficulty: 1, category: 'health',
  },
  {
    id: '247', sourceText: 'You should drink more water and get enough sleep.', targetText: '你应该多喝水，保证充足的睡眠。',
    sourceLang: 'en', keyWords: ['drink more water', 'enough sleep'],
    grammar: 'should + 动词原形。',
    difficulty: 1, category: 'health',
  },
  {
    id: '248', sourceText: '保持健康的秘诀是均衡饮食。', targetText: 'The secret to staying healthy is a balanced diet.',
    sourceLang: 'zh', keyWords: ['secret to', 'staying healthy', 'balanced diet'],
    grammar: 'the secret to doing 做…的秘诀。',
    difficulty: 3, category: 'health',
  },
  {
    id: '249', sourceText: 'Regular exercise is essential for good health.', targetText: '规律运动对健康至关重要。',
    sourceLang: 'en', keyWords: ['regular exercise', 'essential', 'good health'],
    grammar: 'be essential for 对…至关重要。',
    difficulty: 3, category: 'health',
  },
  {
    id: '250', sourceText: '我已经戒了烟。', targetText: 'I have quit smoking.',
    sourceLang: 'zh', keyWords: ['have quit', 'smoking'],
    grammar: 'quit + 动名词。',
    difficulty: 2, category: 'health',
  },
  {
    id: '251', sourceText: 'Stress can have a negative impact on your health.', targetText: '压力会对健康产生负面影响。',
    sourceLang: 'en', keyWords: ['stress', 'negative impact', 'health'],
    grammar: 'have an impact on 对…有影响。',
    difficulty: 4, category: 'health',
  },
  {
    id: '252', sourceText: '医生建议他多休息。', targetText: 'The doctor advised him to take more rest.',
    sourceLang: 'zh', keyWords: ['advised', 'take more rest'],
    grammar: 'advise sb to do 建议某人做。',
    difficulty: 2, category: 'health',
  },
  {
    id: '253', sourceText: 'I have been suffering from a headache since yesterday.', targetText: '我从昨天起就一直头疼。',
    sourceLang: 'en', keyWords: ['suffering from', 'headache', 'since'],
    grammar: 'suffer from 患（病）。现在完成进行时。',
    difficulty: 3, category: 'health',
  },
  {
    id: '254', sourceText: '请按时吃药。', targetText: 'Please take the medicine on time.',
    sourceLang: 'zh', keyWords: ['take medicine', 'on time'],
    grammar: 'take medicine 吃药。on time 按时。',
    difficulty: 1, category: 'health',
  },
  {
    id: '255', sourceText: 'A healthy diet should include plenty of fruits and vegetables.', targetText: '健康饮食应该包括大量的水果和蔬菜。',
    sourceLang: 'en', keyWords: ['healthy diet', 'include', 'plenty of', 'fruits and vegetables'],
    grammar: 'plenty of 大量的。',
    difficulty: 3, category: 'health',
  },
  {
    id: '256', sourceText: '他经常锻炼以保持身材。', targetText: 'He often works out to keep fit.',
    sourceLang: 'zh', keyWords: ['works out', 'keep fit'],
    grammar: 'work out 锻炼。keep fit 保持健康。',
    difficulty: 2, category: 'health',
  },
  {
    id: '257', sourceText: 'I am going to have a checkup next month.', targetText: '我下个月要去做体检。',
    sourceLang: 'en', keyWords: ['have a checkup', 'next month'],
    grammar: 'have a checkup 做体检。',
    difficulty: 2, category: 'health',
  },
  {
    id: '258', sourceText: '我对他对花粉过敏的病情很担心。', targetText: 'I am worried about his allergy to pollen.',
    sourceLang: 'zh', keyWords: ['worried about', 'allergy to', 'pollen'],
    grammar: 'be worried about 担心。be allergic to 对…过敏。',
    difficulty: 3, category: 'health',
  },
  {
    id: '259', sourceText: 'Mental health is just as important as physical health.', targetText: '心理健康和身体健康同样重要。',
    sourceLang: 'en', keyWords: ['mental health', 'physical health', 'just as important as'],
    grammar: 'as…as… 和…一样。',
    difficulty: 3, category: 'health',
  },
  {
    id: '260', sourceText: '你最好去验一下血。', targetText: 'You had better get a blood test.',
    sourceLang: 'zh', keyWords: ['had better', 'blood test'],
    grammar: 'had better + 动词原形。',
    difficulty: 2, category: 'health',
  },
  {
    id: '261', sourceText: 'The doctor told me to stay in bed for a few days.', targetText: '医生告诉我卧床休息几天。',
    sourceLang: 'en', keyWords: ['told me to', 'stay in bed'],
    grammar: 'tell sb to do 告诉某人做。',
    difficulty: 2, category: 'health',
  },
  {
    id: '262', sourceText: '我已经从重感冒中康复了。', targetText: 'I have recovered from a bad cold.',
    sourceLang: 'zh', keyWords: ['recovered from', 'bad cold'],
    grammar: 'recover from 康复。',
    difficulty: 3, category: 'health',
  },
  {
    id: '263', sourceText: 'Eating too much sugar is harmful to your health.', targetText: '吃太多糖对健康有害。',
    sourceLang: 'en', keyWords: ['too much sugar', 'harmful to', 'health'],
    grammar: 'too much + 不可数名词。be harmful to 对…有害。',
    difficulty: 3, category: 'health',
  },
  {
    id: '264', sourceText: '每天散步有益健康。', targetText: 'Taking a walk every day is beneficial to health.',
    sourceLang: 'zh', keyWords: ['taking a walk', 'beneficial to', 'health'],
    grammar: '动名词作主语。be beneficial to 对…有益。',
    difficulty: 3, category: 'health',
  },
  {
    id: '265', sourceText: 'I find it hard to fall asleep at night.', targetText: '我发现晚上难以入睡。',
    sourceLang: 'en', keyWords: ['find it hard', 'fall asleep'],
    grammar: 'find it + adj + to do。',
    difficulty: 3, category: 'health',
  },

  // ===== 191-220 谚语名言 =====
  {
    id: '10', sourceText: 'The more you practice, the better you become.', targetText: '练习得越多，你就会变得越好。',
    sourceLang: 'en', keyWords: ['the more', 'practice', 'the better'],
    grammar: 'The more…the more… 越…越… 比较级句型。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '12', sourceText: 'I wish I could speak English fluently.', targetText: '我希望我能流利地说英语。',
    sourceLang: 'en', keyWords: ['wish', 'could speak', 'fluently'],
    grammar: 'wish 后的宾语从句用虚拟语气，could + 动词原形。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '48', sourceText: 'The book is both interesting and instructive.', targetText: '这本书既有趣味又有教育意义。',
    sourceLang: 'en', keyWords: ['both and', 'interesting', 'instructive'],
    grammar: 'both…and… 既…又… 连接并列成分。',
    difficulty: 1, category: 'proverb',
  },
  {
    id: '62', sourceText: 'It is no use crying over spilled milk.', targetText: '覆水难收。',
    sourceLang: 'en', keyWords: ['no use', 'crying', 'spilled milk'],
    grammar: 'It is no use + doing。谚语。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '92', sourceText: 'Where there is a will, there is a way.', targetText: '有志者事竟成。',
    sourceLang: 'en', keyWords: ['where there is a will', 'there is a way'],
    grammar: 'Where there is A, there is B，有A就有B。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '100', sourceText: 'Actions speak louder than words.', targetText: '行动胜于言辞。',
    sourceLang: 'en', keyWords: ['actions speak louder', 'than words'],
    grammar: '比较级结构。谚语。',
    difficulty: 1, category: 'proverb',
  },
  {
    id: '266', sourceText: 'Knowledge is power.', targetText: '知识就是力量。',
    sourceLang: 'en', keyWords: ['knowledge', 'power'],
    grammar: '谚语，主系表结构。',
    difficulty: 1, category: 'proverb',
  },
  {
    id: '267', sourceText: 'Practice makes perfect.', targetText: '熟能生巧。',
    sourceLang: 'en', keyWords: ['practice', 'makes', 'perfect'],
    grammar: '谚语，主谓宾结构。',
    difficulty: 1, category: 'proverb',
  },
  {
    id: '268', sourceText: 'A friend in need is a friend indeed.', targetText: '患难见真情。',
    sourceLang: 'en', keyWords: ['friend in need', 'friend indeed'],
    grammar: '谚语。in need 在困难中。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '269', sourceText: 'Time and tide wait for no man.', targetText: '岁月不待人。',
    sourceLang: 'en', keyWords: ['time and tide', 'wait for', 'no man'],
    grammar: '谚语，wait for no man 不等人。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '270', sourceText: 'All that glitters is not gold.', targetText: '闪光的未必都是金子。',
    sourceLang: 'en', keyWords: ['glitters', 'is not gold'],
    grammar: '谚语，部分否定。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '271', sourceText: 'Better late than never.', targetText: '迟到总比不到好。',
    sourceLang: 'en', keyWords: ['better late', 'than never'],
    grammar: '谚语，比较级。',
    difficulty: 1, category: 'proverb',
  },
  {
    id: '272', sourceText: 'The early bird catches the worm.', targetText: '早起的鸟儿有虫吃。',
    sourceLang: 'en', keyWords: ['early bird', 'catches', 'worm'],
    grammar: '谚语。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '273', sourceText: 'Rome was not built in a day.', targetText: '罗马不是一天建成的。',
    sourceLang: 'en', keyWords: ['Rome', 'built in a day'],
    grammar: '谚语，built 被动。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '274', sourceText: '一寸光阴一寸金。', targetText: 'Time is money.',
    sourceLang: 'zh', keyWords: ['time', 'money'],
    grammar: '谚语，主系表。',
    difficulty: 1, category: 'proverb',
  },
  {
    id: '275', sourceText: '良药苦口利于病。', targetText: 'Good medicine tastes bitter.',
    sourceLang: 'zh', keyWords: ['good medicine', 'tastes bitter'],
    grammar: '谚语，主谓表。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '276', sourceText: '千里之行始于足下。', targetText: 'A journey of a thousand miles begins with a single step.',
    sourceLang: 'zh', keyWords: ['journey', 'thousand miles', 'begins with', 'single step'],
    grammar: '谚语。begin with 从…开始。',
    difficulty: 4, category: 'proverb',
  },
  {
    id: '277', sourceText: 'A picture is worth a thousand words.', targetText: '一图胜千言。',
    sourceLang: 'en', keyWords: ['picture', 'worth a thousand words'],
    grammar: '谚语，be worth 值得。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '278', sourceText: '眼见为实。', targetText: 'Seeing is believing.',
    sourceLang: 'zh', keyWords: ['seeing', 'believing'],
    grammar: '谚语，动名词作主语。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '279', sourceText: 'A stitch in time saves nine.', targetText: '小洞不补，大洞吃苦。',
    sourceLang: 'en', keyWords: ['stitch in time', 'saves nine'],
    grammar: '谚语，in time 及时。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '280', sourceText: 'Failure is the mother of success.', targetText: '失败是成功之母。',
    sourceLang: 'en', keyWords: ['failure', 'mother of', 'success'],
    grammar: '谚语，mother of …之母。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '281', sourceText: '诚实乃上策。', targetText: 'Honesty is the best policy.',
    sourceLang: 'zh', keyWords: ['honesty', 'best policy'],
    grammar: '谚语。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '282', sourceText: 'You can not judge a book by its cover.', targetText: '人不可貌相。',
    sourceLang: 'en', keyWords: ['judge', 'book', 'cover'],
    grammar: '谚语，judge by 以…判断。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '283', sourceText: '路遥知马力，日久见人心。', targetText: 'A long road tests a horse is strength and a long time shows a person is heart.',
    sourceLang: 'zh', keyWords: ['long road', 'tests', 'shows', 'heart'],
    grammar: '谚语。',
    difficulty: 5, category: 'proverb',
  },
  {
    id: '284', sourceText: 'Birds of a feather flock together.', targetText: '物以类聚，人以群分。',
    sourceLang: 'en', keyWords: ['birds of a feather', 'flock together'],
    grammar: '谚语。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '285', sourceText: '团结就是力量。', targetText: 'Unity is strength.',
    sourceLang: 'zh', keyWords: ['unity', 'strength'],
    grammar: '谚语。',
    difficulty: 1, category: 'proverb',
  },
  {
    id: '286', sourceText: 'Do not put all your eggs in one basket.', targetText: '不要把所有鸡蛋放在一个篮子里。',
    sourceLang: 'en', keyWords: ['put', 'eggs', 'basket'],
    grammar: '谚语，祈使句。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '287', sourceText: 'Two heads are better than one.', targetText: '三个臭皮匠，赛过诸葛亮。',
    sourceLang: 'en', keyWords: ['two heads', 'better than one'],
    grammar: '谚语，比较级。',
    difficulty: 2, category: 'proverb',
  },
  {
    id: '288', sourceText: '活到老，学到老。', targetText: 'One is never too old to learn.',
    sourceLang: 'zh', keyWords: ['never', 'too old to learn'],
    grammar: '谚语，never too…to… 永不…太…而不能。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '289', sourceText: 'Every cloud has a silver lining.', targetText: '黑暗中总有一线光明。',
    sourceLang: 'en', keyWords: ['every cloud', 'silver lining'],
    grammar: '谚语。',
    difficulty: 4, category: 'proverb',
  },
  {
    id: '290', sourceText: '机会只留给有准备的人。', targetText: 'Opportunity favors the prepared mind.',
    sourceLang: 'zh', keyWords: ['opportunity', 'favors', 'prepared mind'],
    grammar: '谚语。favor 偏爱。',
    difficulty: 4, category: 'proverb',
  },

  // ===== 221-280 经典语法题目 =====
  {
    id: '7', sourceText: '如果你努力工作，就会成功。', targetText: 'If you work hard, you will succeed.',
    sourceLang: 'zh', keyWords: ['if', 'work hard', 'will succeed'],
    grammar: 'if 条件句，主句用 will + 动词原形。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '8', sourceText: 'She said that she would come tomorrow.', targetText: '她说她明天会来。',
    sourceLang: 'en', keyWords: ['said', 'would come', 'tomorrow'],
    grammar: '宾语从句，主句过去式，从句用过去将来时。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '11', sourceText: '他直到完成作业才离开学校。', targetText: 'He did not leave school until he finished his homework.',
    sourceLang: 'zh', keyWords: ['not...until', 'left', 'finished'],
    grammar: 'not…until 直到…才。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '15', sourceText: '天气太冷了，我不敢出去。', targetText: 'It is too cold for me to go out.',
    sourceLang: 'zh', keyWords: ['too cold', 'for me to', 'go out'],
    grammar: 'too + 形容词 + for + sb + to do sth。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '16', sourceText: 'This problem is too difficult for us to solve.', targetText: '这个问题太难了，我们解决不了。',
    sourceLang: 'en', keyWords: ['too difficult', 'for us to solve'],
    grammar: 'too + 形容词 + for + sb + to do sth 结构。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '17', sourceText: '他不但聪明而且勤奋。', targetText: 'He is not only smart but also hardworking.',
    sourceLang: 'zh', keyWords: ['not only', 'but also', 'smart', 'hardworking'],
    grammar: 'not only…but also… 不仅…而且…',
    difficulty: 2, category: 'academic',
  },
  {
    id: '18', sourceText: 'Neither the teacher nor the students were present.', targetText: '老师和学生都没有出席。',
    sourceLang: 'en', keyWords: ['neither', 'nor', 'were present'],
    grammar: 'neither…nor… 既不…也不… 谓语就近一致。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '19', sourceText: '我宁愿步行也不愿开车。', targetText: 'I would rather walk than drive.',
    sourceLang: 'zh', keyWords: ['would rather', 'walk', 'than', 'drive'],
    grammar: 'would rather…than… 宁愿…而不愿…',
    difficulty: 2, category: 'daily',
  },
  {
    id: '20', sourceText: 'Had I known earlier, I would have helped you.', targetText: '如果我早点知道，我就会帮助你了。',
    sourceLang: 'en', keyWords: ['had known', 'would have helped'],
    grammar: '倒装虚拟语气，省略 if。',
    difficulty: 5, category: 'academic',
  },
  {
    id: '21', sourceText: '据说这本书已经被翻译成二十多种语言。', targetText: 'It is said that this book has been translated into more than twenty languages.',
    sourceLang: 'zh', keyWords: ['is said', 'has been translated', 'languages'],
    grammar: '被动语态现在完成时。',
    difficulty: 4, category: 'academic',
  },
  {
    id: '22', sourceText: 'The building was built in 1990.', targetText: '这座建筑建于 1990 年。',
    sourceLang: 'en', keyWords: ['was built', 'in 1990'],
    grammar: '一般过去时被动语态。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '23', sourceText: '他主动提出帮我搬家。', targetText: 'He offered to help me move.',
    sourceLang: 'zh', keyWords: ['offered', 'to help', 'move'],
    grammar: 'offer to do sth 主动提出做某事。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '24', sourceText: 'I regret not taking your advice.', targetText: '我后悔没有采纳你的建议。',
    sourceLang: 'en', keyWords: ['regret', 'not taking', 'advice'],
    grammar: 'regret doing 后悔做过某事。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '25', sourceText: '我花了两个小时做这道数学题。', targetText: 'It took me two hours to work out this math problem.',
    sourceLang: 'zh', keyWords: ['took', 'hours', 'to work out', 'math problem'],
    grammar: 'It takes + sb + time + to do sth。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '26', sourceText: 'She seems to be angry with someone.', targetText: '她似乎在生某人的气。',
    sourceLang: 'en', keyWords: ['seems', 'to be angry'],
    grammar: 'seem to be + 形容词。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '27', sourceText: '他被认为是最伟大的科学家之一。', targetText: 'He is considered one of the greatest scientists.',
    sourceLang: 'zh', keyWords: ['is considered', 'greatest', 'scientists'],
    grammar: 'be considered + 名词/形容词。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '28', sourceText: 'This is the best movie I have ever seen.', targetText: '这是我看过的最好的电影。',
    sourceLang: 'en', keyWords: ['best movie', 'have ever seen'],
    grammar: '最高级 + that + have/has + 过去分词。',
    difficulty: 3, category: 'culture',
  },
  {
    id: '30', sourceText: 'Would you mind opening the window?', targetText: '你介意打开窗户吗？',
    sourceLang: 'en', keyWords: ['would you mind', 'opening', 'window'],
    grammar: 'Would you mind doing sth？',
    difficulty: 2, category: 'daily',
  },
  {
    id: '31', sourceText: '多亏了他的帮助，我们按时完成了任务。', targetText: 'Thanks to his help, we finished the task on time.',
    sourceLang: 'zh', keyWords: ['thanks to', 'finished', 'on time'],
    grammar: 'thanks to 多亏、由于。on time 准时。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '34', sourceText: 'She insisted that he should apologize.', targetText: '她坚持要他道歉。',
    sourceLang: 'en', keyWords: ['insisted', 'should apologize'],
    grammar: 'insist + that + should + 动词原形。',
    difficulty: 4, category: 'emotion',
  },
  {
    id: '36', sourceText: 'I would appreciate it if you could help me.', targetText: '如果你能帮助我，我将不胜感激。',
    sourceLang: 'en', keyWords: ['would appreciate', 'if', 'could help'],
    grammar: 'would appreciate it if…',
    difficulty: 3, category: 'daily',
  },
  {
    id: '37', sourceText: '她不但会说法语还会说日语。', targetText: 'She can speak not only French but also Japanese.',
    sourceLang: 'zh', keyWords: ['can speak', 'not only', 'but also'],
    grammar: 'not only…but also… 连接并列谓语。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '38', sourceText: 'No sooner had I arrived than it began to rain.', targetText: '我刚一到就下雨了。',
    sourceLang: 'en', keyWords: ['no sooner', 'had arrived', 'began to rain'],
    grammar: 'No sooner…than… 一…就…，过去完成时。',
    difficulty: 4, category: 'academic',
  },
  {
    id: '39', sourceText: '他太累了，走不动了。', targetText: 'He was so tired that he could not walk.',
    sourceLang: 'zh', keyWords: ['so tired', 'that', 'could not walk'],
    grammar: 'so + 形容词 + that + 结果状语从句。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '40', sourceText: 'The reason why he was late is that he missed the bus.', targetText: '他迟到的原因是他错过了公交车。',
    sourceLang: 'en', keyWords: ['reason why', 'was late', 'is that'],
    grammar: 'The reason why…is that…',
    difficulty: 3, category: 'academic',
  },
  {
    id: '41', sourceText: '我期待着收到你的来信。', targetText: 'I look forward to receiving your letter.',
    sourceLang: 'zh', keyWords: ['look forward to', 'receiving', 'letter'],
    grammar: 'look forward to + doing。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '42', sourceText: 'It is necessary that everyone should obey the rules.', targetText: '每个人都有必要遵守规则。',
    sourceLang: 'en', keyWords: ['is necessary', 'should obey', 'rules'],
    grammar: 'It is necessary that + should + 动词原形，虚拟语气。',
    difficulty: 4, category: 'academic',
  },
  {
    id: '43', sourceText: '我习惯于每天早起。', targetText: 'I am used to getting up early every day.',
    sourceLang: 'zh', keyWords: ['am used to', 'getting up', 'early'],
    grammar: 'be used to doing 习惯于…。',
    difficulty: 3, category: 'daily',
  },
  {
    id: '44', sourceText: 'He used to smoke, but now he does not.', targetText: '他过去常常吸烟，但现在不吸了。',
    sourceLang: 'en', keyWords: ['used to smoke', 'now'],
    grammar: 'used to + 动词原形。',
    difficulty: 2, category: 'health',
  },
  {
    id: '45', sourceText: '她看起来像是刚哭过。', targetText: 'She looks as if she has been crying.',
    sourceLang: 'zh', keyWords: ['looks as if', 'has been crying'],
    grammar: 'as if 引导方式状语从句。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '46', sourceText: 'I would have passed the exam but I did not study.', targetText: '我本来会通过考试的，但我没学习。',
    sourceLang: 'en', keyWords: ['would have passed', 'did not study'],
    grammar: 'would have + 过去分词。',
    difficulty: 4, category: 'academic',
  },
  {
    id: '47', sourceText: '不管天气如何，我都会去。', targetText: 'I will go regardless of the weather.',
    sourceLang: 'zh', keyWords: ['regardless of', 'weather', 'will go'],
    grammar: 'regardless of + 名词，不管、不顾。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '49', sourceText: '我已经好久没见到他了。', targetText: 'It is a long time since I last saw him.',
    sourceLang: 'zh', keyWords: ['is a long time', 'since', 'last saw'],
    grammar: 'It is + 时间段 + since…。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '50', sourceText: 'Had it not been for your help, I would have failed.', targetText: '如果没有你的帮助，我就会失败了。',
    sourceLang: 'en', keyWords: ['had not been', 'would have failed'],
    grammar: '含蓄虚拟语气，but for + 名词。',
    difficulty: 5, category: 'academic',
  },
  {
    id: '51', sourceText: '他如此聪明以至于能解决所有问题。', targetText: 'He is so clever that he can solve all the problems.',
    sourceLang: 'zh', keyWords: ['so clever', 'that', 'can solve'],
    grammar: 'so + 形容词 + that + 结果状语从句。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '52', sourceText: 'Everything that glitters is not gold.', targetText: '闪光的不一定都是金子。',
    sourceLang: 'en', keyWords: ['that glitters', 'is not gold'],
    grammar: '定语从句 that glitters 修饰 Everything。部分否定。',
    difficulty: 3, category: 'proverb',
  },
  {
    id: '53', sourceText: '我父亲过去常常在晚饭后散步。', targetText: 'My father used to take a walk after dinner.',
    sourceLang: 'zh', keyWords: ['used to', 'take a walk', 'after dinner'],
    grammar: 'used to + 动词原形。',
    difficulty: 2, category: 'health',
  },
  {
    id: '54', sourceText: 'I would rather you did not tell anyone.', targetText: '我宁愿你别告诉任何人。',
    sourceLang: 'en', keyWords: ['would rather', 'you did not', 'tell anyone'],
    grammar: 'would rather + that + 主语 + 过去式。',
    difficulty: 4, category: 'emotion',
  },
  {
    id: '55', sourceText: '他一到北京就给我打了电话。', targetText: 'He called me as soon as he arrived in Beijing.',
    sourceLang: 'zh', keyWords: ['as soon as', 'arrived', 'called'],
    grammar: 'as soon as 一…就…',
    difficulty: 2, category: 'daily',
  },
  {
    id: '56', sourceText: 'Not until he apologized would I forgive him.', targetText: '直到他道歉我才会原谅他。',
    sourceLang: 'en', keyWords: ['not until', 'apologized', 'would forgive'],
    grammar: 'Not until 放在句首，主句倒装。',
    difficulty: 4, category: 'emotion',
  },
  {
    id: '57', sourceText: '她是班上最聪明的学生。', targetText: 'She is the smartest student in her class.',
    sourceLang: 'zh', keyWords: ['smartest', 'student', 'in her class'],
    grammar: '最高级前加定冠词 the。',
    difficulty: 1, category: 'academic',
  },
  {
    id: '58', sourceText: 'I have never seen such a beautiful sunset.', targetText: '我从未见过如此美丽的日落。',
    sourceLang: 'en', keyWords: ['never', 'such a beautiful', 'sunset'],
    grammar: 'never 用于现在完成时的否定。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '59', sourceText: '他要求我必须准时到达。', targetText: 'He demanded that I should arrive on time.',
    sourceLang: 'zh', keyWords: ['demanded', 'should arrive', 'on time'],
    grammar: 'demand + that + should + 动词原形。',
    difficulty: 3, category: 'business',
  },
  {
    id: '60', sourceText: 'The man whom you saw yesterday is our teacher.', targetText: '你昨天见到的那个男人是我们的老师。',
    sourceLang: 'en', keyWords: ['whom', 'you saw', 'is our teacher'],
    grammar: '限制性定语从句，whom 指代 the man。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '61', sourceText: '我宁愿在家也不愿去派对。', targetText: 'I prefer staying at home to going to the party.',
    sourceLang: 'zh', keyWords: ['prefer', 'staying at home', 'to going'],
    grammar: 'prefer doing A to doing B。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '63', sourceText: '如果明天不下雨，我们就去爬山。', targetText: 'If it does not rain tomorrow, we will go climbing.',
    sourceLang: 'zh', keyWords: ['if', 'does not rain', 'tomorrow', 'will go'],
    grammar: 'if 条件句，主句将来时，从句现在时表将来。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '64', sourceText: 'She speaks English as fluently as a native speaker.', targetText: '她说英语和母语者一样流利。',
    sourceLang: 'en', keyWords: ['as fluently as', 'native speaker'],
    grammar: 'as + 副词/形容词 + as，同级比较。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '65', sourceText: '他经常被请去做演讲。', targetText: 'He is often invited to give lectures.',
    sourceLang: 'zh', keyWords: ['is invited', 'to give', 'lectures'],
    grammar: '一般现在时被动语态。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '66', sourceText: 'I would have helped you if you had asked me earlier.', targetText: '如果你早点问我，我就会帮助你了。',
    sourceLang: 'en', keyWords: ['would have helped', 'if you had asked'],
    grammar: 'if 虚拟语气，与过去事实相反。',
    difficulty: 4, category: 'emotion',
  },
  {
    id: '67', sourceText: '她已经决定要出国深造。', targetText: 'She has decided to study abroad.',
    sourceLang: 'zh', keyWords: ['has decided', 'to study abroad'],
    grammar: '现在完成时。decide to do sth。',
    difficulty: 1, category: 'academic',
  },
  {
    id: '68', sourceText: 'Hardly had I sat down when the phone rang.', targetText: '我刚坐下电话就响了。',
    sourceLang: 'en', keyWords: ['hardly had I sat', 'when', 'rang'],
    grammar: 'Hardly…when… 一…就…，过去完成时。',
    difficulty: 4, category: 'daily',
  },
  {
    id: '69', sourceText: '我认为这本书不值得读两遍。', targetText: 'I do not think this book is worth reading twice.',
    sourceLang: 'zh', keyWords: ['do not think', 'is worth reading', 'twice'],
    grammar: 'think 后的宾语从句否定转移。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '70', sourceText: 'This is the place where we first met.', targetText: '这就是我们第一次见面的地方。',
    sourceLang: 'en', keyWords: ['where', 'first met', 'place'],
    grammar: '定语从句，where 修饰 place。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '71', sourceText: '我太激动了说不出话来。', targetText: 'I was too excited to say a word.',
    sourceLang: 'zh', keyWords: ['too excited', 'to say'],
    grammar: 'too + 形容词 + to do sth。',
    difficulty: 1, category: 'emotion',
  },
  {
    id: '72', sourceText: 'The reason for his absence is that he is ill.', targetText: '他缺席的原因是他病了。',
    sourceLang: 'en', keyWords: ['reason for', 'absence', 'is that'],
    grammar: 'The reason for…is that…。',
    difficulty: 2, category: 'academic',
  },
  {
    id: '73', sourceText: '他宁愿死也不投降。', targetText: 'He would rather die than surrender.',
    sourceLang: 'zh', keyWords: ['would rather', 'die', 'than surrender'],
    grammar: 'would rather…than…。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '74', sourceText: 'It is time we left this place.', targetText: '我们该离开这个地方了。',
    sourceLang: 'en', keyWords: ['it is time', 'we left'],
    grammar: 'It is time + that + 主语 + 过去式。',
    difficulty: 4, category: 'daily',
  },
  {
    id: '75', sourceText: '我昨天花了五十元买这本书。', targetText: 'I spent fifty yuan on this book yesterday.',
    sourceLang: 'zh', keyWords: ['spent', 'fifty yuan', 'on', 'yesterday'],
    grammar: 'spend + 金钱 + on + 名词。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '77', sourceText: '做任何事都要有耐心。', targetText: 'It takes patience to do anything.',
    sourceLang: 'zh', keyWords: ['takes patience', 'to do'],
    grammar: 'It takes + 名词 + to do sth。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '78', sourceText: 'I suggest that we should start early.', targetText: '我建议我们早点出发。',
    sourceLang: 'en', keyWords: ['suggest', 'should start early'],
    grammar: 'suggest + that + should + 动词原形。',
    difficulty: 3, category: 'business',
  },
  {
    id: '79', sourceText: '他似乎对这件事很了解。', targetText: 'He seems to know a lot about this matter.',
    sourceLang: 'zh', keyWords: ['seems to', 'know a lot', 'about'],
    grammar: 'seem to do sth。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '80', sourceText: 'The teacher had the students write a composition.', targetText: '老师让学生们写了一篇作文。',
    sourceLang: 'en', keyWords: ['had the students', 'write', 'composition'],
    grammar: 'have + 宾语 + 动词原形。',
    difficulty: 3, category: 'academic',
  },
  {
    id: '81', sourceText: '我别无选择只能接受。', targetText: 'I have no choice but to accept.',
    sourceLang: 'zh', keyWords: ['no choice', 'but to accept'],
    grammar: 'have no choice but to do。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '82', sourceText: 'He walked so fast that we could not keep up.', targetText: '他走得这么快以至于我们跟不上。',
    sourceLang: 'en', keyWords: ['so fast that', 'could not keep up'],
    grammar: 'so + 副词 + that + 结果状语从句。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '83', sourceText: '她成功地完成了这项任务。', targetText: 'She succeeded in completing this task.',
    sourceLang: 'zh', keyWords: ['succeeded in', 'completing', 'task'],
    grammar: 'succeed in doing sth。',
    difficulty: 2, category: 'business',
  },
  {
    id: '84', sourceText: 'It is believed that he is a genius.', targetText: '人们认为他是个天才。',
    sourceLang: 'en', keyWords: ['is believed', 'genius'],
    grammar: 'It is believed that… 被动语态。',
    difficulty: 3, category: 'daily',
  },
  {
    id: '85', sourceText: '我哥哥参军已经三年了。', targetText: 'My brother has been in the army for three years.',
    sourceLang: 'zh', keyWords: ['has been', 'army', 'for three years'],
    grammar: '现在完成时，for + 时间段。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '86', sourceText: 'I saw him leave the room just now.', targetText: '我刚才看见他离开了房间。',
    sourceLang: 'en', keyWords: ['saw him leave', 'just now'],
    grammar: 'see + 宾语 + 动词原形。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '87', sourceText: '我受够了被当作孩子对待。', targetText: 'I am tired of being treated like a child.',
    sourceLang: 'zh', keyWords: ['am tired of', 'being treated', 'like a child'],
    grammar: 'be tired of doing。被动语态 being + 过去分词。',
    difficulty: 3, category: 'emotion',
  },
  {
    id: '88', sourceText: 'Only then did he realize his mistake.', targetText: '只有到那时他才意识到自己的错误。',
    sourceLang: 'en', keyWords: ['only then', 'did he realize', 'mistake'],
    grammar: 'Only + 副词 + 倒装。',
    difficulty: 4, category: 'emotion',
  },
  {
    id: '89', sourceText: '他同意了我的建议。', targetText: 'He agreed to my suggestion.',
    sourceLang: 'zh', keyWords: ['agreed to', 'suggestion'],
    grammar: 'agree to + 名词/动词原形。',
    difficulty: 1, category: 'business',
  },
  {
    id: '90', sourceText: 'She made me feel at home.', targetText: '她让我感到像在家里一样。',
    sourceLang: 'en', keyWords: ['made me feel', 'at home'],
    grammar: 'make + 宾语 + 动词原形/形容词。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '91', sourceText: '这本小说值得一读再读。', targetText: 'This novel is worth reading again and again.',
    sourceLang: 'zh', keyWords: ['is worth reading', 'again and again'],
    grammar: 'be worth doing。',
    difficulty: 2, category: 'culture',
  },
  {
    id: '93', sourceText: '我期待着见到我的老朋友们。', targetText: 'I am looking forward to seeing my old friends.',
    sourceLang: 'zh', keyWords: ['am looking forward to', 'seeing', 'old friends'],
    grammar: 'look forward to + doing。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '94', sourceText: 'You had better leave now, or you will be late.', targetText: '你最好现在离开，否则你会迟到。',
    sourceLang: 'en', keyWords: ['had better', 'or', 'will be late'],
    grammar: 'had better + 动词原形。or 否则。',
    difficulty: 2, category: 'daily',
  },
  {
    id: '95', sourceText: '他主动提出要开车送我们回家。', targetText: 'He offered to drive us home.',
    sourceLang: 'zh', keyWords: ['offered', 'to drive', 'us home'],
    grammar: 'offer to do sth。',
    difficulty: 1, category: 'daily',
  },
  {
    id: '96', sourceText: 'I would have been angry if I had heard that.', targetText: '如果我听到那些，我就会生气了。',
    sourceLang: 'en', keyWords: ['would have been angry', 'if I had heard'],
    grammar: 'if 虚拟语气，与过去事实相反。',
    difficulty: 4, category: 'emotion',
  },
  {
    id: '98', sourceText: 'The news made everyone feel sad.', targetText: '这个消息让每个人都很悲伤。',
    sourceLang: 'en', keyWords: ['made everyone feel', 'sad'],
    grammar: 'make + 宾语 + 动词原形/形容词。',
    difficulty: 2, category: 'emotion',
  },
  {
    id: '99', sourceText: '他似乎已经知道这个消息了。', targetText: 'He seems to have known the news.',
    sourceLang: 'zh', keyWords: ['seems to have known', 'news'],
    grammar: 'seem to have + 过去分词。',
    difficulty: 3, category: 'daily',
  },
];

export function getQuestionsByMode(mode: 'en2zh' | 'zh2en' | 'mixed'): Question[] {
  if (mode === 'mixed') return questions;
  if (mode === 'en2zh') return questions.filter(q => q.sourceLang === 'en');
  return questions.filter(q => q.sourceLang === 'zh');
}

export function getQuestionsByCategory(category: SceneCategory | 'all'): Question[] {
  if (category === 'all') return questions;
  return questions.filter(q => q.category === category);
}

export function getQuestionsByDifficulty(difficulty: number | 'all'): Question[] {
  if (difficulty === 'all') return questions;
  return questions.filter(q => q.difficulty === difficulty);
}

export function getFilteredQuestions(options: {
  mode?: 'en2zh' | 'zh2en' | 'mixed';
  category?: SceneCategory | 'all';
  difficulty?: number | 'all';
}): Question[] {
  let result = questions;
  if (options.mode && options.mode !== 'mixed') {
    result = result.filter(q => q.sourceLang === (options.mode === 'en2zh' ? 'en' : 'zh'));
  }
  if (options.category && options.category !== 'all') {
    result = result.filter(q => q.category === options.category);
  }
  if (options.difficulty && options.difficulty !== 'all') {
    result = result.filter(q => q.difficulty === options.difficulty);
  }
  return result;
}

export function getRandomQuestions(
  options: { mode?: 'en2zh' | 'zh2en' | 'mixed'; category?: SceneCategory | 'all'; difficulty?: number | 'all'; count?: number; excludeIds?: string[] } = {}
): Question[] {
  const { mode = 'mixed', category = 'all', difficulty = 'all', count = 10, excludeIds = [] } = options;
  const filtered = getFilteredQuestions({ mode, category, difficulty })
    .filter(q => !excludeIds.includes(q.id));
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, filtered.length));
}
