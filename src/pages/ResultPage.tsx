import { useNavigate } from 'react-router-dom';
import { usePracticeStore, PracticeRecord } from '../store/practiceStore';
import { ArrowLeft, Home, ChevronDown, ChevronUp, Star, AlertCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { categoryEmoji, categoryLabels } from '../data/questions';

export default function ResultPage() {
  const navigate = useNavigate();
  const { currentQuestions, results, answers, addRecord, updateStats, resetPractice } = usePracticeStore();
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const allResults = Array.from(results.values());
  const totalScore = allResults.length > 0
    ? Math.round(allResults.reduce((sum, r) => sum + r.total, 0) / allResults.length)
    : 0;

  const correctCount = allResults.filter(r => r.total >= 70).length;
  const wrongCount = allResults.length - correctCount;

  // 汇总薄弱点
  const allWeaknesses = allResults.flatMap(r => r.weaknesses);
  const weaknessCount = new Map<string, number>();
  allWeaknesses.forEach(w => {
    const tag = w.slice(0, 16);
    weaknessCount.set(tag, (weaknessCount.get(tag) || 0) + 1);
  });
  const topWeaknesses = Array.from(weaknessCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const toggleExpand = (id: string) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedQuestions(newExpanded);
  };

  const handleFinish = () => {
    currentQuestions.forEach((q) => {
      const result = results.get(q.id);
      const answer = answers.get(q.id) || '';
      if (result) {
        const record: PracticeRecord = {
          id: `${q.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          questionId: q.id,
          question: q,
          userAnswer: answer,
          scoreResult: result,
          timestamp: Date.now(),
        };
        addRecord(record);
      }
    });
    updateStats();
    resetPractice();
    navigate('/');
  };

  const handleRetryWrong = () => {
    // 先保存当前记录
    handleFinishNoNavigate();
    // 然后导航到错题重做（重做走首页入口的handleStartWrong会重新设置题目）
    setTimeout(() => {
      navigate('/');
      // 通过 store 设置 - 直接触发错题重做
      const wrong = usePracticeStore.getState().getWrongRecords();
      if (wrong.length > 0) {
        const shuffled = [...wrong].sort(() => Math.random() - 0.5).slice(0, Math.min(10, wrong.length));
        usePracticeStore.getState().setQuestions(shuffled.map(r => r.question));
        navigate('/practice');
      }
    }, 0);
  };

  const handleFinishNoNavigate = () => {
    currentQuestions.forEach((q) => {
      const result = results.get(q.id);
      const answer = answers.get(q.id) || '';
      if (result) {
        const record: PracticeRecord = {
          id: `${q.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          questionId: q.id,
          question: q,
          userAnswer: answer,
          scoreResult: result,
          timestamp: Date.now(),
        };
        addRecord(record);
      }
    });
    updateStats();
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return 'bg-green-100 dark:bg-green-900/30';
    if (score >= 60) return 'bg-yellow-100 dark:bg-yellow-900/30';
    return 'bg-red-100 dark:bg-red-900/30';
  };

  const getEncouragement = (score: number) => {
    if (score >= 90) return '🎉 太棒了！你已经掌握了这些表达！';
    if (score >= 75) return '👍 表现不错，继续保持！';
    if (score >= 60) return '💪 还需努力，多练习几次会更好！';
    return '📖 需要更多练习，建议重做错题。';
  };

  if (currentQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
        <div className="text-center">
          <p className="text-primary dark:text-white mb-4">没有练习结果</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-primary text-white rounded-xl"
          >
            返回首页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={handleFinish}
            className="flex items-center gap-2 text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </button>
        </header>

        <div className="max-w-3xl mx-auto">
          {/* 总分卡 */}
          <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-6 text-center">
            <h1 className="font-serif text-2xl font-bold text-primary dark:text-white mb-2">练习完成</h1>
            <p className="text-sm text-primary/60 dark:text-white/60 font-sans mb-6">{getEncouragement(totalScore)}</p>

            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBg(totalScore)} mb-6`}>
              <div>
                <div className={`text-5xl font-bold font-serif ${getScoreColor(totalScore)}`}>
                  {totalScore}
                </div>
                <div className="text-xs text-primary/60 dark:text-white/60 font-sans">总分</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
              <ScoreMini
                label="正确"
                value={correctCount}
                subValue={`/ ${allResults.length}`}
                color="text-green-600 dark:text-green-400"
              />
              <ScoreMini
                label="错误"
                value={wrongCount}
                subValue={`/ ${allResults.length}`}
                color="text-red-600 dark:text-red-400"
              />
              <ScoreMini
                label="平均"
                value={totalScore}
                subValue="分"
                color={getScoreColor(totalScore)}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6">
              <ScoreBar
                label="准确性"
                score={Math.round(allResults.reduce((s, r) => s + r.accuracy, 0) / allResults.length || 0)}
              />
              <ScoreBar
                label="语法"
                score={Math.round(allResults.reduce((s, r) => s + r.grammar, 0) / allResults.length || 0)}
              />
              <ScoreBar
                label="流畅度"
                score={Math.round(allResults.reduce((s, r) => s + r.fluency, 0) / allResults.length || 0)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleRetryWrong}
                className="py-3 bg-white dark:bg-white/10 border-2 border-red-300 dark:border-red-500/50 text-red-600 dark:text-red-400 rounded-2xl font-sans font-bold text-sm md:text-base hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center justify-center gap-2"
              >
                <AlertTriangle className="w-4 h-4" />
                错题重做
              </button>
              <button
                onClick={handleFinish}
                className="py-3 bg-primary text-white rounded-2xl font-sans font-bold text-sm md:text-base hover:bg-primary-light transition-all flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                返回首页
              </button>
            </div>
          </div>

          {/* 薄弱点分析 */}
          {topWeaknesses.length > 0 && (
            <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-primary dark:text-white" />
                <h2 className="font-serif text-lg font-bold text-primary dark:text-white">薄弱点分析</h2>
              </div>
              <div className="space-y-2">
                {topWeaknesses.map(([weakness, count], i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-sans text-primary dark:text-white">{weakness}</span>
                        <span className="text-xs text-primary/50 dark:text-white/50 font-sans">{count} 次</span>
                      </div>
                      <div className="h-1.5 bg-primary/10 dark:bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary dark:bg-accent-gold rounded-full"
                          style={{ width: `${(count / allResults.length) * 100 * 2}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <h2 className="font-serif text-lg font-bold text-primary dark:text-white mb-3">答题详情</h2>

          <div className="space-y-3">
            {currentQuestions.map((q, index) => {
              const result = results.get(q.id);
              const answer = answers.get(q.id) || '';
              const isExpanded = expandedQuestions.has(q.id);
              const isCorrect = result && result.total >= 70;
              const isFav = usePracticeStore.getState().favoriteIds.includes(q.id);

              return (
                <div key={q.id} className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md overflow-hidden">
                  <button
                    onClick={() => toggleExpand(q.id)}
                    className="w-full p-4 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                        isCorrect ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
                      }`}>
                        {isCorrect ? <Star className="w-4 h-4 fill-current" /> : <AlertCircle className="w-4 h-4" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs text-primary/50 dark:text-white/50 font-sans">第 {index + 1} 题</span>
                          <span className="text-xs px-1.5 py-0.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded font-sans">
                            {categoryEmoji[q.category]} {categoryLabels[q.category]}
                          </span>
                          {isFav && <Star className="w-3 h-3 fill-accent-gold text-accent-gold" />}
                        </div>
                        <p className="font-serif text-primary dark:text-white text-sm truncate">{q.sourceText}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`font-bold text-sm ${getScoreColor(result?.total || 0)}`}>
                        {result?.total || 0}分
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-primary/40" /> : <ChevronDown className="w-4 h-4 text-primary/40" />}
                    </div>
                  </button>

                  {isExpanded && result && (
                    <div className="px-4 pb-4 border-t border-primary/10 dark:border-white/10 pt-3">
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs font-sans text-primary/60 dark:text-white/60 mb-1">你的答案</p>
                          <p className="font-sans text-primary dark:text-white bg-red-50 dark:bg-red-900/20 p-2 rounded-lg text-sm">
                            {answer || '(未作答)'}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs font-sans text-primary/60 dark:text-white/60 mb-1">参考答案</p>
                          <p className="font-sans text-primary dark:text-white bg-green-50 dark:bg-green-900/20 p-2 rounded-lg text-sm">
                            {q.targetText}
                          </p>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <div className="text-center p-2 bg-primary/5 dark:bg-white/5 rounded-lg">
                            <p className="text-xs font-sans text-primary/60 dark:text-white/60">准确性</p>
                            <p className={`font-bold text-sm ${getScoreColor(result.accuracy)}`}>{result.accuracy}</p>
                          </div>
                          <div className="text-center p-2 bg-primary/5 dark:bg-white/5 rounded-lg">
                            <p className="text-xs font-sans text-primary/60 dark:text-white/60">语法</p>
                            <p className={`font-bold text-sm ${getScoreColor(result.grammar)}`}>{result.grammar}</p>
                          </div>
                          <div className="text-center p-2 bg-primary/5 dark:bg-white/5 rounded-lg">
                            <p className="text-xs font-sans text-primary/60 dark:text-white/60">流畅度</p>
                            <p className={`font-bold text-sm ${getScoreColor(result.fluency)}`}>{result.fluency}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-sans text-primary/60 dark:text-white/60 mb-1">语法解析</p>
                          <div className="bg-accent-gold/10 p-3 rounded-lg">
                            <p className="font-sans text-primary dark:text-white text-xs leading-relaxed">
                              {q.grammar}
                            </p>
                          </div>
                        </div>

                        {result.weaknesses.length > 0 && (
                          <div>
                            <p className="text-xs font-sans text-primary/60 dark:text-white/60 mb-1">薄弱点</p>
                            <div className="flex flex-wrap gap-1">
                              {result.weaknesses.map((w, i) => (
                                <span key={i} className="text-xs font-sans px-2 py-0.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded">
                                  {w}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function ScoreMini({ label, value, subValue, color }: {
  label: string;
  value: number;
  subValue: string;
  color: string;
}) {
  return (
    <div className="text-center p-2 bg-primary/5 dark:bg-white/5 rounded-xl">
      <p className="text-xs font-sans text-primary/60 dark:text-white/60 mb-0.5">{label}</p>
      <p className={`text-xl md:text-2xl font-bold font-serif ${color}`}>
        {value}<span className="text-xs">{subValue}</span>
      </p>
    </div>
  );
}

function ScoreBar({ label, score }: { label: string; score: number }) {
  const getColor = (s: number) => {
    if (s >= 80) return 'bg-green-500';
    if (s >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-sans text-primary/60 dark:text-white/60">{label}</span>
        <span className="text-xs font-sans font-bold text-primary dark:text-white">{score}</span>
      </div>
      <div className="h-1.5 bg-primary/10 dark:bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${getColor(score)} transition-all`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}
