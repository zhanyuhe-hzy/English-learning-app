// 口语跟读练习句子
export interface SpeakingSentence {
  id: string;
  english: string;
  chinese: string;
  category: 'daily' | 'travel' | 'business' | 'academic' | 'emotion' | 'social';
  difficulty: 1 | 2 | 3;
  tip?: string;
}

export const speakingSentences: SpeakingSentence[] = [
  // 日常 1
  { id: 's1', english: 'Good morning! How are you today?', chinese: '早上好！你今天怎么样？', category: 'daily', difficulty: 1 },
  { id: 's2', english: 'I am doing great, thank you for asking.', chinese: '我很好，谢谢你关心。', category: 'daily', difficulty: 1 },
  { id: 's3', english: 'What do you usually do on weekends?', chinese: '你周末通常做什么？', category: 'daily', difficulty: 2 },
  { id: 's4', english: 'I am looking forward to seeing you soon.', chinese: '我期待很快见到你。', category: 'daily', difficulty: 2 },
  { id: 's5', english: 'Could you do me a favor?', chinese: '你能帮我个忙吗？', category: 'daily', difficulty: 1 },

  // 旅行
  { id: 's6', english: 'Excuse me, could you tell me how to get to the station?', chinese: '打扰一下，请问到车站怎么走？', category: 'travel', difficulty: 2 },
  { id: 's7', english: 'I would like to book a table for two at seven o clock.', chinese: '我想预订 7 点的两人桌。', category: 'travel', difficulty: 3 },
  { id: 's8', english: 'Is there a restaurant near here?', chinese: '这附近有餐厅吗？', category: 'travel', difficulty: 1 },
  { id: 's9', english: 'How long does it take to get to the airport?', chinese: '到机场要多久？', category: 'travel', difficulty: 2 },
  { id: 's10', english: 'I am just looking around, thanks.', chinese: '我只是随便看看，谢谢。', category: 'travel', difficulty: 1 },

  // 商务
  { id: 's11', english: 'Let us schedule a meeting for next Monday.', chinese: '我们下周一开个会吧。', category: 'business', difficulty: 3 },
  { id: 's12', english: 'I will follow up on this matter tomorrow.', chinese: '我明天会跟进这件事。', category: 'business', difficulty: 3 },
  { id: 's13', english: 'Please let me know if you have any questions.', chinese: '如果你有任何问题请告诉我。', category: 'business', difficulty: 2 },
  { id: 's14', english: 'I appreciate your prompt response.', chinese: '感谢您的及时回复。', category: 'business', difficulty: 3 },
  { id: 's15', english: 'We need to meet the deadline by Friday.', chinese: '我们需要在周五前完成。', category: 'business', difficulty: 2 },

  // 学术
  { id: 's16', english: 'The research shows that exercise is beneficial.', chinese: '研究表明锻炼有益。', category: 'academic', difficulty: 2 },
  { id: 's17', english: 'I am working on my thesis these days.', chinese: '这些天我在写论文。', category: 'academic', difficulty: 2 },
  { id: 's18', english: 'Could you explain this concept in more detail?', chinese: '能更详细解释一下这个概念吗？', category: 'academic', difficulty: 3 },
  { id: 's19', english: 'I find it difficult to concentrate in a noisy room.', chinese: '我发现嘈杂的房间里难以集中注意力。', category: 'academic', difficulty: 3 },
  { id: 's20', english: 'The professor emphasized critical thinking.', chinese: '教授强调了批判性思维。', category: 'academic', difficulty: 3 },

  // 情感
  { id: 's21', english: 'I am so grateful for your help.', chinese: '我非常感谢你的帮助。', category: 'emotion', difficulty: 1 },
  { id: 's22', english: 'I cannot stop thinking about you.', chinese: '我无法停止想你。', category: 'emotion', difficulty: 2 },
  { id: 's23', english: 'It really means a lot to me.', chinese: '这对我意义重大。', category: 'emotion', difficulty: 2 },
  { id: 's24', english: 'I am sorry for what I said yesterday.', chinese: '我为昨天说的话道歉。', category: 'emotion', difficulty: 2 },
  { id: 's25', english: 'You always know how to cheer me up.', chinese: '你总是知道怎么让我开心起来。', category: 'emotion', difficulty: 3 },

  // 社交
  { id: 's26', english: 'It is a pleasure to meet you finally.', chinese: '终于见到你了，很高兴。', category: 'social', difficulty: 2 },
  { id: 's27', english: 'Have you been keeping busy lately?', chinese: '你最近忙吗？', category: 'social', difficulty: 2 },
  { id: 's28', english: 'Let us grab a coffee sometime next week.', chinese: '下周找个时间一起喝咖啡吧。', category: 'social', difficulty: 2 },
  { id: 's29', english: 'I just got back from a trip to Japan.', chinese: '我刚从日本旅行回来。', category: 'social', difficulty: 2 },
  { id: 's30', english: 'What do you think of the new movie?', chinese: '你觉得这部新电影怎么样？', category: 'social', difficulty: 1 },
];

export const speakingCategories: Array<{ id: SpeakingSentence['category'] | 'all'; label: string; emoji: string }> = [
  { id: 'all', label: '全部', emoji: '🌐' },
  { id: 'daily', label: '日常', emoji: '☕' },
  { id: 'travel', label: '旅行', emoji: '✈️' },
  { id: 'business', label: '商务', emoji: '💼' },
  { id: 'academic', label: '学术', emoji: '📚' },
  { id: 'emotion', label: '情感', emoji: '💗' },
  { id: 'social', label: '社交', emoji: '💬' },
];
