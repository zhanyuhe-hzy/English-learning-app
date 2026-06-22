// 日常口语表达库 - 分类整理常用口语短语
// 每条包含英文、中文、场景、使用技巧

export interface DailyPhrase {
  id: string;
  english: string;
  chinese: string;
  pronunciation?: string;
  scenario: string;
  category: PhraseCategory;
  tip?: string;
  response?: string[]; // 可能的回应
}

export type PhraseCategory =
  | 'greeting'      // 问候
  | 'farewell'      // 告别
  | 'thanks'        // 感谢
  | 'apology'       // 道歉
  | 'agreement'     // 同意
  | 'disagreement'  // 不同意
  | 'confusion'     // 困惑
  | 'emotion'       // 情感
  | 'request'       // 请求
  | 'opinion'       // 意见
  | 'shopping'      // 购物
  | 'work'          // 工作
  | 'social';       // 社交

export const categoryLabels: Record<PhraseCategory, string> = {
  greeting: '问候寒暄',
  farewell: '告别送别',
  thanks: '感谢答谢',
  apology: '道歉遗憾',
  agreement: '同意赞同',
  disagreement: '反对保留',
  confusion: '困惑不解',
  emotion: '情感表达',
  request: '请求帮助',
  opinion: '意见看法',
  shopping: '购物消费',
  work: '工作职场',
  social: '社交聊天',
};

export const categoryEmoji: Record<PhraseCategory, string> = {
  greeting: '👋',
  farewell: '👋',
  thanks: '🙏',
  apology: '🙇',
  agreement: '👍',
  disagreement: '🤔',
  confusion: '❓',
  emotion: '💗',
  request: '🙋',
  opinion: '💭',
  shopping: '🛍️',
  work: '💼',
  social: '💬',
};

export const dailyPhrases: DailyPhrase[] = [
  // 问候
  { id: 'p1', english: 'How is it going?', chinese: '最近怎么样？', category: 'greeting', scenario: '朋友见面', response: ['Pretty good!', 'Not too bad.'] },
  { id: 'p2', english: 'What is up?', chinese: '怎么了？/ 什么事？', category: 'greeting', scenario: '非正式问候', tip: '非常口语化，仅用于朋友间。' },
  { id: 'p3', english: 'Long time no see!', chinese: '好久不见！', category: 'greeting', scenario: '久别重逢' },
  { id: 'p4', english: 'How have you been?', chinese: '你最近怎么样？', category: 'greeting', scenario: '重逢时', response: ['I have been good, thanks!', 'Pretty busy lately.'] },
  { id: 'p5', english: 'Nice to meet you!', chinese: '很高兴认识你！', category: 'greeting', scenario: '初次见面', tip: '"Nice to meet you" 仅用于第一次见面。' },

  // 告别
  { id: 'p6', english: 'Take care!', chinese: '保重！', category: 'farewell', scenario: '告别' },
  { id: 'p7', english: 'See you around!', chinese: '回头见！', category: 'farewell', scenario: '朋友间' },
  { id: 'p8', english: 'Catch you later!', chinese: '回头见！', category: 'farewell', scenario: '非正式', tip: '非常口语化的告别。' },
  { id: 'p9', english: 'I am off. Talk to you soon!', chinese: '我走了，下次聊！', category: 'farewell', scenario: '电话/聊天结束' },
  { id: 'p10', english: 'Have a good one!', chinese: '祝你有美好的一天！', category: 'farewell', scenario: '通用告别' },

  // 感谢
  { id: 'p11', english: 'Thanks a million!', chinese: '万分感谢！', category: 'thanks', scenario: '非常感谢' },
  { id: 'p12', english: 'I really appreciate it.', chinese: '我真的很感激。', category: 'thanks', scenario: '真诚感谢' },
  { id: 'p13', english: 'You are a lifesaver!', chinese: '你真是救命恩人！', category: 'thanks', scenario: '感谢大忙' },
  { id: 'p14', english: 'I owe you one.', chinese: '我欠你一个人情。', category: 'thanks', scenario: '感谢帮忙' },
  { id: 'p15', english: 'Thanks anyway.', chinese: '不过还是谢谢你。', category: 'thanks', scenario: '对方没帮上忙' },

  // 道歉
  { id: 'p16', english: 'My bad.', chinese: '我的错。', category: 'apology', scenario: '非正式道歉' },
  { id: 'p17', english: 'I am sorry for the inconvenience.', chinese: '对此带来的不便，我深表歉意。', category: 'apology', scenario: '正式场合' },
  { id: 'p18', english: 'Please forgive me.', chinese: '请原谅我。', category: 'apology', scenario: '真诚道歉' },
  { id: 'p19', english: 'That was my fault.', chinese: '那是我的错。', category: 'apology', scenario: '承认错误' },
  { id: 'p20', english: 'I should not have done that.', chinese: '我不该那么做的。', category: 'apology', scenario: '反思' },

  // 同意
  { id: 'p21', english: 'Absolutely!', chinese: '完全同意！', category: 'agreement', scenario: '强烈同意' },
  { id: 'p22', english: 'You can say that again.', chinese: '说得太对了。', category: 'agreement', scenario: '强烈赞同' },
  { id: 'p23', english: 'I could not agree more.', chinese: '我完全同意。', category: 'agreement', scenario: '完全赞同' },
  { id: 'p24', english: 'That is exactly what I think.', chinese: '我正是这么想的。', category: 'agreement', scenario: '意见一致' },
  { id: 'p25', english: 'Sounds good to me.', chinese: '我觉得可以。', category: 'agreement', scenario: '同意提议' },

  // 不同意
  { id: 'p26', english: 'I am afraid I disagree.', chinese: '恐怕我不同意。', category: 'disagreement', scenario: '礼貌地不同意' },
  { id: 'p27', english: 'I see your point, but...', chinese: '我明白你的意思，但是…', category: 'disagreement', scenario: '委婉反驳' },
  { id: 'p28', english: 'I am not so sure about that.', chinese: '我对此不太确定。', category: 'disagreement', scenario: '婉转反对' },
  { id: 'p29', english: 'That is not exactly what I meant.', chinese: '那不完全是我的意思。', category: 'disagreement', scenario: '澄清' },
  { id: 'p30', english: 'On the contrary...', chinese: '恰恰相反…', category: 'disagreement', scenario: '正式反对' },

  // 困惑
  { id: 'p31', english: 'What do you mean?', chinese: '你什么意思？', category: 'confusion', scenario: '询问含义' },
  { id: 'p32', english: 'I do not quite follow you.', chinese: '我没有完全听懂。', category: 'confusion', scenario: '请再说一遍' },
  { id: 'p33', english: 'Could you say that again?', chinese: '你能再说一遍吗？', category: 'confusion', scenario: '请重复' },
  { id: 'p34', english: 'Sorry, I am a bit lost.', chinese: '抱歉，我有点迷糊。', category: 'confusion', scenario: '不熟悉话题' },
  { id: 'p35', english: 'How come?', chinese: '怎么会？', category: 'confusion', scenario: '表示惊讶' },

  // 情感
  { id: 'p36', english: 'I am thrilled!', chinese: '我太兴奋了！', category: 'emotion', scenario: '开心' },
  { id: 'p37', english: 'I am fed up with this.', chinese: '我受够了。', category: 'emotion', scenario: '厌烦' },
  { id: 'p38', english: 'That is so touching.', chinese: '太感人了。', category: 'emotion', scenario: '感动' },
  { id: 'p39', english: 'I am on the fence.', chinese: '我犹豫不决。', category: 'emotion', scenario: '拿不定主意' },
  { id: 'p40', english: 'I am over the moon.', chinese: '我欣喜若狂。', category: 'emotion', scenario: '极度开心' },

  // 请求
  { id: 'p41', english: 'Would you mind helping me?', chinese: '你介意帮我吗？', category: 'request', scenario: '礼貌请求' },
  { id: 'p42', english: 'I was wondering if you could...', chinese: '我在想你是否能…', category: 'request', scenario: '非常礼貌的请求', tip: '更正式、更委婉。' },
  { id: 'p43', english: 'Could you do me a favor?', chinese: '能帮我个忙吗？', category: 'request', scenario: '请求帮忙' },
  { id: 'p44', english: 'Do you have a minute?', chinese: '你有时间吗？', category: 'request', scenario: '占用时间' },
  { id: 'p45', english: 'I hate to bother you, but...', chinese: '我不想麻烦你，但是…', category: 'request', scenario: '非常客气的请求' },

  // 意见
  { id: 'p46', english: 'In my opinion...', chinese: '在我看来…', category: 'opinion', scenario: '提出意见' },
  { id: 'p47', english: 'As far as I am concerned...', chinese: '就我而言…', category: 'opinion', scenario: '表达观点' },
  { id: 'p48', english: 'If you ask me...', chinese: '你问我的话…', category: 'opinion', scenario: '非正式建议' },
  { id: 'p49', english: 'The way I see it...', chinese: '我的看法是…', category: 'opinion', scenario: '表达看法' },
  { id: 'p50', english: 'Personally, I think...', chinese: '我个人认为…', category: 'opinion', scenario: '个人意见' },

  // 购物
  { id: 'p51', english: 'How much does this come to?', chinese: '一共多少钱？', category: 'shopping', scenario: '结账' },
  { id: 'p52', english: 'Is there a discount?', chinese: '有折扣吗？', category: 'shopping', scenario: '讨价还价' },
  { id: 'p53', english: 'Do you accept credit cards?', chinese: '你们接受信用卡吗？', category: 'shopping', scenario: '询问支付' },
  { id: 'p54', english: 'Can I try this on?', chinese: '我可以试穿吗？', category: 'shopping', scenario: '试穿' },
  { id: 'p55', english: 'I will take it.', chinese: '我要了。', category: 'shopping', scenario: '决定购买' },

  // 工作
  { id: 'p56', english: 'Let us touch base on this.', chinese: '我们再对接一下这个。', category: 'work', scenario: '跟进工作' },
  { id: 'p57', english: 'I will get back to you.', chinese: '我会再回复你。', category: 'work', scenario: '需要时间' },
  { id: 'p58', english: 'Just to clarify...', chinese: '澄清一下…', category: 'work', scenario: '澄清观点' },
  { id: 'p59', english: 'Let us circle back to that.', chinese: '我们回头再讨论这个。', category: 'work', scenario: '延后讨论' },
  { id: 'p60', english: 'I am swamped right now.', chinese: '我现在忙得不可开交。', category: 'work', scenario: '很忙' },

  // 社交
  { id: 'p61', english: 'It is a small world!', chinese: '世界真小！', category: 'social', scenario: '偶遇熟人' },
  { id: 'p62', english: 'What brings you here?', chinese: '什么风把你吹来了？', category: 'social', scenario: '偶遇' },
  { id: 'p63', english: 'How do you know each other?', chinese: '你们怎么认识的？', category: 'social', scenario: '介绍朋友' },
  { id: 'p64', english: 'Keep in touch!', chinese: '保持联系！', category: 'social', scenario: '告别' },
  { id: 'p65', english: 'Let us grab a coffee sometime.', chinese: '有空一起喝咖啡。', category: 'social', scenario: '约定再聚' },
];
