// 情景对话 - 多场景对话练习
// 每个对话包含多个回合，用户选择回应或自由练习

export interface DialogueLine {
  speaker: 'A' | 'B' | 'me' | 'them';
  text: string;
  textCn: string;
  // 候选回复（仅当 speaker 为 me 时）
  options?: DialogueOption[];
  // 自由输入模式提示
  hint?: string;
}

export interface DialogueOption {
  text: string;
  textCn: string;
  isCorrect?: boolean;
  feedback?: string;
}

export interface Dialogue {
  id: string;
  title: string;
  titleCn: string;
  scene: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1';
  emoji: string;
  description: string;
  lines: DialogueLine[];
  // 关键短语
  keyPhrases: string[];
  // 文化小贴士
  cultureNote?: string;
}

export const dialogues: Dialogue[] = [
  {
    id: 'd1',
    title: 'At a Coffee Shop',
    titleCn: '在咖啡店',
    scene: '点餐',
    level: 'A1',
    emoji: '☕',
    description: '学习在咖啡店点饮料的常用对话。',
    keyPhrases: ['I would like...', 'How much is it?', 'For here or to go?'],
    cultureNote: '英美咖啡店点饮料时，通常要说明在店里喝（for here）还是带走（to go）。',
    lines: [
      { speaker: 'them', text: 'Hi there! What can I get for you today?', textCn: '你好！今天要点些什么？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '你想点一杯拿铁 (latte)',
        options: [
          { text: 'I would like a latte, please.', textCn: '我想要一杯拿铁，谢谢。', isCorrect: true, feedback: '👍 完美！最地道的点法！' },
          { text: 'Give me a coffee.', textCn: '给我一杯咖啡。', feedback: '🤏 也能用，但"Give me..."在服务场合显得不太礼貌。' },
          { text: 'I want latte.', textCn: '我要拿铁。', feedback: '📝 语法没问题，但 "I want" 不如 "I would like" 礼貌。' },
        ],
      },
      { speaker: 'them', text: 'Great choice! What size would you like?', textCn: '好选择！你要什么尺寸？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '你想要中杯 (medium)',
        options: [
          { text: 'Medium, please.', textCn: '中杯，谢谢。', isCorrect: true, feedback: '👍 简洁明了！' },
          { text: 'I want a medium size.', textCn: '我要中杯。', feedback: '🆗 也可以，但 Medium 单独用更地道。' },
          { text: 'Make it middle.', textCn: '做成中杯的。', feedback: '😅 没有人这么说，请用 medium。' },
        ],
      },
      { speaker: 'them', text: 'For here or to go?', textCn: '在店里喝还是带走？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '在店里喝',
        options: [
          { text: 'For here, please.', textCn: '在店里喝，谢谢。', isCorrect: true, feedback: '🎉 完美！' },
          { text: 'I will drink here.', textCn: '我会在这里喝。', feedback: '🤔 太直译了，请用 "for here"。' },
          { text: 'Stay here.', textCn: '留在这里。', feedback: '❌ 不符合习惯。' },
        ],
      },
      { speaker: 'them', text: 'That will be $4.50. Will that be cash or card?', textCn: '一共 4.5 美元。现金还是刷卡？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '刷卡',
        options: [
          { text: 'Card, please.', textCn: '刷卡，谢谢。', isCorrect: true, feedback: '👍 完美！' },
          { text: 'I will use credit card.', textCn: '我会用信用卡。', feedback: '🆗 可以，但 "Card" 更简洁。' },
          { text: 'By card.', textCn: '用卡。', feedback: '🤏 也可以，但不够完整。' },
        ],
      },
      { speaker: 'them', text: 'Here you go! Have a great day!', textCn: '给你！祝你今天愉快！' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '表示感谢',
        options: [
          { text: 'Thanks! You too!', textCn: '谢谢！你也是！', isCorrect: true, feedback: '🎉 太棒了！完美的结束。' },
          { text: 'Thank you.', textCn: '谢谢你。', feedback: '🆗 礼貌，但有点单调。' },
          { text: 'Bye.', textCn: '再见。', feedback: '😅 显得冷淡。' },
        ],
      },
    ],
  },
  {
    id: 'd2',
    title: 'Checking into a Hotel',
    titleCn: '酒店入住',
    scene: '旅行',
    level: 'A2',
    emoji: '🏨',
    description: '学习办理酒店入住的对话。',
    keyPhrases: ['I have a reservation', 'under the name of...', 'Could I have...?'],
    cultureNote: '酒店通常需要信用卡预授权（pre-authorization）作为押金。',
    lines: [
      { speaker: 'them', text: 'Good evening! Welcome to the Grand Hotel. How may I help you?', textCn: '晚上好！欢迎来到大酒店。有什么可以帮您？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '你有一个预订',
        options: [
          { text: 'Hi, I have a reservation under the name of Smith.', textCn: '你好，我有一个预订，名字是 Smith。', isCorrect: true, feedback: '🎉 完美！' },
          { text: 'I booked a room.', textCn: '我订了一个房间。', feedback: '🤏 也可以，但 "under the name of" 更具体。' },
          { text: 'I want to check in.', textCn: '我想入住。', feedback: '📝 没错，但前台可能会问更多细节。' },
        ],
      },
      { speaker: 'them', text: 'Of course! May I see your ID and a credit card, please?', textCn: '好的！请出示您的身份证和信用卡好吗？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Sure, here you are.', textCn: '当然，给你。', isCorrect: true, feedback: '👍 自然！' },
          { text: 'OK, wait a moment.', textCn: '好的，等一下。', feedback: '🆗 也能用。' },
          { text: 'Here.', textCn: '给。', feedback: '😅 太简单。' },
        ],
      },
      { speaker: 'them', text: 'You are in room 502 on the 5th floor. Breakfast is served from 7 to 10.', textCn: '您入住 5 楼 502 房间。早餐从 7 点供应到 10 点。' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '询问 WiFi 密码',
        options: [
          { text: 'Could I have the WiFi password, please?', textCn: '请问 WiFi 密码是什么？', isCorrect: true, feedback: '🌟 地道！' },
          { text: 'What is the WiFi password?', textCn: 'WiFi 密码是什么？', feedback: '🆗 也能用。' },
          { text: 'Tell me the WiFi.', textCn: '告诉我 WiFi。', feedback: '❌ 不对。' },
        ],
      },
      { speaker: 'them', text: 'It is "Guest502" and no password is required. Enjoy your stay!', textCn: '是 "Guest502"，不需要密码。祝您住得愉快！' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Thank you very much!', textCn: '非常感谢！', isCorrect: true, feedback: '👍 完美！' },
          { text: 'Thanks.', textCn: '谢谢。', feedback: '🆗 也可以。' },
          { text: 'OK.', textCn: '好的。', feedback: '😅 显得冷淡。' },
        ],
      },
    ],
  },
  {
    id: 'd3',
    title: 'Job Interview',
    titleCn: '工作面试',
    scene: '求职',
    level: 'B1',
    emoji: '💼',
    description: '模拟常见面试问题。',
    keyPhrases: ['Tell me about yourself', 'I am good at...', 'My weakness is...'],
    cultureNote: '英美面试强调 STAR 法则：情境(Situation)、任务(Task)、行动(Action)、结果(Result)。',
    lines: [
      { speaker: 'them', text: 'So, tell me a little about yourself.', textCn: '请简单介绍一下你自己。' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '介绍自己的背景',
        options: [
          { text: 'I have five years of experience in marketing, and I specialize in digital campaigns.', textCn: '我有五年市场营销经验，专攻数字营销活动。', isCorrect: true, feedback: '🎉 完美的回答！' },
          { text: 'My name is... I am from... I like...', textCn: '我叫…我来自…我喜欢…', feedback: '⚠️ 太多无关信息，要突出与职位相关的。' },
          { text: 'I am a good person.', textCn: '我是一个好人。', feedback: '😅 太空洞。' },
        ],
      },
      { speaker: 'them', text: 'What would you say is your biggest weakness?', textCn: '你最大的弱点是什么？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'I tend to be a perfectionist, but I am learning to prioritize.', textCn: '我有点完美主义，但我正在学习分清优先级。', isCorrect: true, feedback: '🌟 经典好答案！' },
          { text: 'I have no weaknesses.', textCn: '我没有弱点。', feedback: '❌ 没有人会相信。' },
          { text: 'I am lazy.', textCn: '我很懒。', feedback: '❌ 不要这么说！' },
        ],
      },
      { speaker: 'them', text: 'Why do you want to work here?', textCn: '你为什么想在这里工作？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'I admire your company is innovation, and I believe my skills can contribute to your team.', textCn: '我敬佩贵公司的创新，我相信我的技能能为团队做出贡献。', isCorrect: true, feedback: '👍 非常好的回答！' },
          { text: 'I need money.', textCn: '我需要钱。', feedback: '😱 千万不要这么说。' },
          { text: 'I do not know.', textCn: '我不知道。', feedback: '❌ 显然不行。' },
        ],
      },
      { speaker: 'them', text: 'Do you have any questions for me?', textCn: '你有什么问题要问我吗？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Yes, what does a typical day look like in this role?', textCn: '是的，这个职位的日常工作是什么样的？', isCorrect: true, feedback: '✨ 优秀的问题！' },
          { text: 'No.', textCn: '没有。', feedback: '❌ 失去了解公司的机会。' },
          { text: 'How much money?', textCn: '多少钱？', feedback: '😱 第一次面试不要问。' },
        ],
      },
    ],
  },
  {
    id: 'd4',
    title: 'Asking for Directions',
    titleCn: '问路',
    scene: '旅行',
    level: 'A2',
    emoji: '🗺️',
    description: '在陌生城市向路人问路。',
    keyPhrases: ['Excuse me', 'Could you tell me how to get to...?', 'Is it far from here?'],
    lines: [
      { speaker: 'them', text: 'Excuse me, do you need help?', textCn: '打扰一下，需要帮忙吗？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Excuse me, could you tell me how to get to the subway station?', textCn: '打扰一下，请问地铁站怎么走？', isCorrect: true, feedback: '🎉 完美！' },
          { text: 'Where is subway?', textCn: '地铁在哪？', feedback: '⚠️ 语法不完整。' },
          { text: 'Subway?', textCn: '地铁？', feedback: '😅 太简单。' },
        ],
      },
      { speaker: 'them', text: 'Sure! Go straight for two blocks, then turn left. It is on your right.', textCn: '当然！直走两个街区，然后左转。就在你右边。' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        hint: '询问距离',
        options: [
          { text: 'Is it far from here?', textCn: '离这里远吗？', isCorrect: true, feedback: '👍 很好！' },
          { text: 'How long?', textCn: '多久？', feedback: '🆗 但 "How long" 通常问时间。' },
          { text: 'Is it big?', textCn: '它大吗？', feedback: '❌ 不对。' },
        ],
      },
      { speaker: 'them', text: 'About 10 minutes on foot. You cannot miss it!', textCn: '走路大概 10 分钟。你不会错过的！' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Thank you so much for your help!', textCn: '非常感谢你的帮助！', isCorrect: true, feedback: '🌟 礼貌！' },
          { text: 'Thanks.', textCn: '谢谢。', feedback: '🆗 也可以。' },
          { text: 'OK bye.', textCn: '好的再见。', feedback: '😅 显得无礼。' },
        ],
      },
    ],
  },
  {
    id: 'd5',
    title: 'Making Friends',
    titleCn: '交新朋友',
    scene: '社交',
    level: 'A2',
    emoji: '🤝',
    description: '在聚会或活动中认识新朋友。',
    keyPhrases: ['Nice to meet you', 'What do you do?', 'How long have you been here?'],
    cultureNote: '英美人在初次见面时常聊天气、运动、电影等轻松话题，避免敏感话题。',
    lines: [
      { speaker: 'them', text: 'Hi! I am Mike. I have not seen you here before.', textCn: '你好！我是 Mike。我以前没见过你。' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Hi Mike! I am Lisa. Nice to meet you!', textCn: '你好 Mike！我是 Lisa。很高兴认识你！', isCorrect: true, feedback: '🌟 完美！' },
          { text: 'Hello.', textCn: '你好。', feedback: '🆗 礼貌但太冷淡。' },
          { text: 'I am new here.', textCn: '我是新来的。', feedback: '📝 没错，但没有回应对方。' },
        ],
      },
      { speaker: 'them', text: 'So, Lisa, what do you do for a living?', textCn: '那么 Lisa，你是做什么工作的？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'I am a graphic designer. How about you?', textCn: '我是一名平面设计师。你呢？', isCorrect: true, feedback: '👍 完美！' },
          { text: 'I work.', textCn: '我工作。', feedback: '⚠️ 太空洞。' },
          { text: 'None of your business.', textCn: '不关你的事。', feedback: '😱 不礼貌。' },
        ],
      },
      { speaker: 'them', text: 'I am a software engineer. Do you like it here so far?', textCn: '我是软件工程师。到目前为止你喜欢这里吗？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Yes, everyone has been very friendly!', textCn: '是的，每个人都很友好！', isCorrect: true, feedback: '✨ 友好的回答！' },
          { text: 'It is boring.', textCn: '很无聊。', feedback: '😅 不要太直接。' },
          { text: 'I do not know.', textCn: '我不知道。', feedback: '📝 不太自然。' },
        ],
      },
    ],
  },
  {
    id: 'd6',
    title: 'Doctor Appointment',
    titleCn: '看医生',
    scene: '生活',
    level: 'B1',
    emoji: '🏥',
    description: '在诊所描述自己的症状。',
    keyPhrases: ['I have been having...', 'How long has it been?', 'Take this medicine'],
    lines: [
      { speaker: 'them', text: 'Good morning. What seems to be the problem?', textCn: '早上好。哪里不舒服？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'I have been having a headache for three days.', textCn: '我已经头疼三天了。', isCorrect: true, feedback: '🎉 完美的表达！' },
          { text: 'My head hurts.', textCn: '我头很疼。', feedback: '🆗 也能用。' },
          { text: 'I am sick.', textCn: '我生病了。', feedback: '⚠️ 太空洞。' },
        ],
      },
      { speaker: 'them', text: 'I see. Are you running a fever?', textCn: '我知道了。你发烧吗？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Yes, a little. About 37.8 degrees.', textCn: '是的，有点。大概 37.8 度。', isCorrect: true, feedback: '👍 很好！' },
          { text: 'I do not know.', textCn: '我不知道。', feedback: '⚠️ 应该测一下。' },
          { text: 'A little hot.', textCn: '有点热。', feedback: '📝 不太准确。' },
        ],
      },
      { speaker: 'them', text: 'I will prescribe some medicine. Take it after meals, twice a day.', textCn: '我开些药给你。饭后吃，每天两次。' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Got it. Thank you, doctor.', textCn: '明白了。谢谢医生。', isCorrect: true, feedback: '🌟 礼貌！' },
          { text: 'OK.', textCn: '好的。', feedback: '🆗 但不够礼貌。' },
          { text: 'No, I do not want.', textCn: '不，我不要。', feedback: '😱 不建议。' },
        ],
      },
    ],
  },
  {
    id: 'd7',
    title: 'Phone Call - Booking',
    titleCn: '电话预约',
    scene: '生活',
    level: 'A2',
    emoji: '📞',
    description: '电话预约餐厅或服务。',
    keyPhrases: ['I would like to make a reservation', 'Could you confirm the time?'],
    lines: [
      { speaker: 'them', text: 'Good afternoon, Bella Restaurant. How can I help you?', textCn: '下午好，Bella 餐厅。我能帮您什么？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Hi, I would like to make a reservation for two for Saturday evening.', textCn: '你好，我想预订周六晚上的两人位。', isCorrect: true, feedback: '🎉 完美！' },
          { text: 'I want to book.', textCn: '我想预订。', feedback: '⚠️ 不够具体。' },
          { text: 'Two people, please.', textCn: '两个人，谢谢。', feedback: '📝 不完整。' },
        ],
      },
      { speaker: 'them', text: 'What time would you like?', textCn: '您想几点？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: '7:30, please.', textCn: '7:30，谢谢。', isCorrect: true, feedback: '👍 简洁！' },
          { text: 'When is free?', textCn: '什么时候有空？', feedback: '🆗 也能用。' },
          { text: 'I do not know.', textCn: '我不知道。', feedback: '😅 不太合适。' },
        ],
      },
      { speaker: 'them', text: 'May I have your name, please?', textCn: '请问您贵姓？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Sure, my name is Wang.', textCn: '好的，我姓王。', isCorrect: true, feedback: '🌟 完美！' },
          { text: 'Wang.', textCn: '王。', feedback: '⚠️ 太简短。' },
          { text: 'I do not want to say.', textCn: '我不想说。', feedback: '❌ 不行。' },
        ],
      },
      { speaker: 'them', text: 'All set! We will see you on Saturday at 7:30. Goodbye!', textCn: '订好了！周六 7:30 见。再见！' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Thank you! Goodbye!', textCn: '谢谢！再见！', isCorrect: true, feedback: '👍 完美！' },
          { text: 'Bye.', textCn: '再见。', feedback: '🆗 也能用。' },
          { text: 'OK.', textCn: '好的。', feedback: '😅 显得冷淡。' },
        ],
      },
    ],
  },
  {
    id: 'd8',
    title: 'Shopping - Returning an Item',
    titleCn: '购物退货',
    scene: '消费',
    level: 'B1',
    emoji: '🛍️',
    description: '退换不满意的商品。',
    keyPhrases: ['I would like to return this', 'Can I get a refund?', 'Do you have the receipt?'],
    lines: [
      { speaker: 'them', text: 'Hello, how can I help you?', textCn: '你好，有什么可以帮您？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Hi, I would like to return this shirt. It does not fit.', textCn: '你好，我想退这件衬衫。不合身。', isCorrect: true, feedback: '🌟 完美！' },
          { text: 'I want refund.', textCn: '我想要退款。', feedback: '⚠️ 缺少礼貌用语。' },
          { text: 'This is bad.', textCn: '这个不好。', feedback: '😅 太空洞。' },
        ],
      },
      { speaker: 'them', text: 'I am sorry to hear that. Do you have the receipt?', textCn: '很抱歉听到这个。您有收据吗？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'Yes, here it is.', textCn: '有的，给你。', isCorrect: true, feedback: '👍 完美！' },
          { text: 'I lost it.', textCn: '我丢了。', feedback: '😟 可能会麻烦。' },
          { text: 'What is receipt?', textCn: '什么是收据？', feedback: '😅 不合适。' },
        ],
      },
      { speaker: 'them', text: 'Would you like a refund or an exchange?', textCn: '您想退款还是换货？' },
      { speaker: 'me', text: '', textCn: '轮到你了',
        options: [
          { text: 'I would prefer an exchange for a larger size, please.', textCn: '我想要换一件大号。', isCorrect: true, feedback: '🌟 完美！' },
          { text: 'Refund.', textCn: '退款。', feedback: '⚠️ 太简单。' },
          { text: 'I want money.', textCn: '我想要钱。', feedback: '❌ 不礼貌。' },
        ],
      },
    ],
  },
];

export const dialogueScenes = [
  { id: 'all', label: '全部', emoji: '🌐' },
  { id: 'A1', label: '入门 A1', emoji: '🌱' },
  { id: 'A2', label: '基础 A2', emoji: '🌿' },
  { id: 'B1', label: '中级 B1', emoji: '🌳' },
  { id: 'B2', label: '中高级 B2', emoji: '🌲' },
];
