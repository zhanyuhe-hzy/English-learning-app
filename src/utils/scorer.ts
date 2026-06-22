export interface ScoreResult {
  total: number;
  accuracy: number;
  grammar: number;
  fluency: number;
  weaknesses: string[];
}

function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }
  return dp[m][n];
}

function calculateSimilarity(str1: string, str2: string): number {
  const normalized1 = str1.toLowerCase().trim().replace(/[，。！？、；：""''《》（）\s,.!?;:"'()]/g, '');
  const normalized2 = str2.toLowerCase().trim().replace(/[，。！？、；：""''《》（）\s,.!?;:"'()]/g, '');

  if (!normalized1 || !normalized2) return 0;
  if (normalized1 === normalized2) return 100;

  const distance = levenshteinDistance(normalized1, normalized2);
  const maxLen = Math.max(normalized1.length, normalized2.length);
  return Math.round((1 - distance / maxLen) * 100);
}

function checkKeywords(userAnswer: string, correctAnswer: string, keywords: string[]): { found: string[]; missing: string[] } {
  const normalizedUser = userAnswer.toLowerCase();
  const found: string[] = [];
  const missing: string[] = [];

  for (const keyword of keywords) {
    const normalizedKeyword = keyword.toLowerCase();
    // 兼容中文：去掉空格判断
    const strippedUser = normalizedUser.replace(/\s+/g, '');
    const strippedKeyword = normalizedKeyword.replace(/\s+/g, '');
    if (strippedUser.includes(strippedKeyword) || normalizedUser.includes(normalizedKeyword)) {
      found.push(keyword);
    } else {
      missing.push(keyword);
    }
  }

  return { found, missing };
}

function detectGrammarIssues(userAnswer: string, correctAnswer: string, sourceLang: 'en' | 'zh'): string[] {
  const issues: string[] = [];
  const normalizedUser = userAnswer.toLowerCase().trim();
  const normalizedCorrect = correctAnswer.toLowerCase().trim();

  if (sourceLang === 'en') {
    // 检查英文语法
    const verbPatterns = [
      { pattern: /\bam\b.*\bwas\b/i, issue: '主谓不一致：am 和 was 不能搭配' },
      { pattern: /\bis\b.*\bwere\b/i, issue: '主谓不一致：is 和 were 不能搭配' },
      { pattern: /\bwas\b.*\bare\b/i, issue: '主谓不一致：was 和 are 不能搭配' },
      { pattern: /\bwere\b.*\bis\b/i, issue: '主谓不一致：were 和 is 不能搭配' },
      { pattern: /\bdo\b.*\bdid\b/i, issue: '时态混用：do 不能和 did 搭配' },
      { pattern: /\bdoes\b.*\bdid\b/i, issue: '时态混用：does 不能和 did 搭配' },
    ];

    for (const { pattern, issue } of verbPatterns) {
      if (pattern.test(normalizedUser)) {
        issues.push(issue);
      }
    }

    if (!normalizedUser.includes('i') && !normalizedUser.includes('you') &&
        !normalizedUser.includes('he') && !normalizedUser.includes('she') &&
        !normalizedUser.includes('it') && !normalizedUser.includes('we') &&
        !normalizedUser.includes('they') && !normalizedUser.includes('there') &&
        !normalizedUser.startsWith('what') && !normalizedUser.startsWith('how') &&
        !normalizedUser.startsWith('when') && !normalizedUser.startsWith('where') &&
        !normalizedUser.startsWith('why') && !normalizedUser.startsWith('who') &&
        !normalizedUser.startsWith('which')) {
      issues.push('可能缺少主语');
    }
  } else {
    // 检查中文
    if (normalizedCorrect.includes('的') && !normalizedUser.includes('的') &&
        normalizedCorrect.length > 5 && normalizedUser.length > 5) {
      issues.push('可能缺少助词"的"');
    }

    if (normalizedCorrect.includes('了') && !normalizedUser.includes('了') &&
        normalizedCorrect.length > 5 && normalizedUser.length > 5 &&
        /\u4e86/.test(normalizedCorrect)) {
      issues.push('可能缺少语气助词"了"');
    }

    if (normalizedCorrect.includes('着') && !normalizedUser.includes('着') &&
        normalizedCorrect.length > 5 && normalizedUser.length > 5) {
      issues.push('可能缺少"着"表状态持续');
    }
  }

  return issues;
}

function detectFluencyIssues(userAnswer: string, correctAnswer: string): string[] {
  const issues: string[] = [];
  const normalizedUser = userAnswer.toLowerCase();
  const normalizedCorrect = correctAnswer.toLowerCase();

  const prepositionPairs: [string, string][] = [
    ['in the', 'on the'],
    ['on the', 'in the'],
    ['at the', 'to the'],
    ['to the', 'at the'],
  ];

  for (const [wrong, correct] of prepositionPairs) {
    if (normalizedUser.includes(wrong) && !normalizedCorrect.includes(wrong) &&
        normalizedCorrect.includes(correct)) {
      issues.push(`介词使用不当：${wrong} → ${correct}`);
    }
  }

  return issues;
}

export function calculateScore(
  userAnswer: string,
  correctAnswer: string,
  keywords: string[],
  sourceLang: 'en' | 'zh'
): ScoreResult {
  const similarity = calculateSimilarity(userAnswer, correctAnswer);
  const { found, missing } = checkKeywords(userAnswer, correctAnswer, keywords);

  // 准确性：综合相似度 + 关键词覆盖
  const keywordCoverage = keywords.length > 0 ? found.length / keywords.length : 0.5;
  const accuracy = Math.round(similarity * 0.5 + keywordCoverage * 50);

  // 语法
  const grammarIssues = detectGrammarIssues(userAnswer, correctAnswer, sourceLang);
  const grammarDeduction = Math.min(grammarIssues.length * 8, 30);
  const grammar = Math.max(0, 85 - grammarDeduction);

  // 流畅度
  const fluencyIssues = detectFluencyIssues(userAnswer, correctAnswer);
  const fluencyDeduction = Math.min(fluencyIssues.length * 6, 25);
  const fluency = Math.max(0, 85 - fluencyDeduction);

  // 汇总薄弱点
  const weaknesses: string[] = [];
  if (missing.length > 0) {
    weaknesses.push(`遗漏关键词：${missing.slice(0, 3).join('、')}`);
  }
  weaknesses.push(...grammarIssues);
  weaknesses.push(...fluencyIssues);
  if (similarity < 50) {
    weaknesses.push('翻译整体偏差较大');
  }

  // 总分加权：准确性 50% + 语法 30% + 流畅度 20%
  const total = Math.round(accuracy * 0.5 + grammar * 0.3 + fluency * 0.2);

  return {
    total: Math.min(100, Math.max(0, total)),
    accuracy: Math.min(100, Math.max(0, accuracy)),
    grammar: Math.min(100, Math.max(0, grammar)),
    fluency: Math.min(100, Math.max(0, fluency)),
    weaknesses: weaknesses.slice(0, 5),
  };
}
