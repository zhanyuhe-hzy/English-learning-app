import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeStore } from '../store/practiceStore';
import { ArrowLeft, Trash2, Search, Filter, Star, AlertCircle, TrendingUp, BarChart3, Calendar, Sparkles } from 'lucide-react';
import { categoryEmoji, categoryLabels, SceneCategory } from '../data/questions';

export default function RecordsPage() {
  const navigate = useNavigate();
  const {
    records, deleteRecord, clearRecords, favoriteIds, toggleFavorite,
    getWeaknessStats, getCategoryStats,
  } = usePracticeStore();

  const [filterCategory, setFilterCategory] = useState<SceneCategory | 'all'>('all');
  const [filterScore, setFilterScore] = useState<'all' | 'high' | 'low'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');

  const filteredRecords = useMemo(() => {
    let result = records.slice().reverse();
    if (filterCategory !== 'all') {
      result = result.filter(r => r.question.category === filterCategory);
    }
    if (filterScore === 'high') {
      result = result.filter(r => r.scoreResult.total >= 70);
    } else if (filterScore === 'low') {
      result = result.filter(r => r.scoreResult.total < 70);
    }
    if (searchKeyword.trim()) {
      const kw = searchKeyword.toLowerCase();
      result = result.filter(r =>
        r.question.sourceText.toLowerCase().includes(kw) ||
        r.question.targetText.toLowerCase().includes(kw) ||
        r.userAnswer.toLowerCase().includes(kw)
      );
    }
    return result;
  }, [records, filterCategory, filterScore, searchKeyword]);

  const weaknessStats = getWeaknessStats();
  const categoryStats = getCategoryStats();

  // 按日期分组
  const recordsByDate = useMemo(() => {
    const map = new Map<string, number>();
    records.forEach(r => {
      const date = new Date(r.timestamp).toISOString().split('T')[0];
      map.set(date, (map.get(date) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .slice(0, 7);
  }, [records]);

  const maxDayCount = Math.max(...recordsByDate.map(d => d[1]), 1);

  const totalRecords = records.length;
  const wrongRecords = records.filter(r => r.scoreResult.total < 70);
  const correctRate = totalRecords > 0
    ? Math.round(((totalRecords - wrongRecords.length) / totalRecords) * 100)
    : 0;
  const averageScore = totalRecords > 0
    ? Math.round(records.reduce((s, r) => s + r.scoreResult.total, 0) / totalRecords)
    : 0;

  const handleClearAll = () => {
    if (confirm(`确定要清空所有 ${records.length} 条练习记录吗？此操作不可恢复。`)) {
      clearRecords();
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            返回首页
          </button>
          {totalRecords > 0 && (
            <button
              onClick={handleClearAll}
              className="flex items-center gap-1.5 text-red-500 hover:text-red-600 transition-colors font-sans text-sm"
            >
              <Trash2 className="w-4 h-4" />
              清空记录
            </button>
          )}
        </header>

        <div className="max-w-5xl mx-auto">
          <h1 className="font-serif text-3xl font-bold text-primary dark:text-white mb-6">学习记录</h1>

          {totalRecords === 0 ? (
            <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-12 text-center">
              <BarChart3 className="w-16 h-16 text-primary/30 dark:text-white/30 mx-auto mb-4" />
              <p className="text-primary/60 dark:text-white/60 font-sans mb-6">还没有练习记录</p>
              <button
                onClick={() => navigate('/')}
                className="px-6 py-2 bg-primary text-white rounded-xl font-sans"
              >
                开始练习
              </button>
            </div>
          ) : (
            <>
              {/* 概览统计 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="w-4 h-4 text-primary dark:text-white" />
                    <span className="text-xs font-sans text-primary/60 dark:text-white/60">总题数</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-primary dark:text-white">{totalRecords}</div>
                </div>
                <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-accent-gold" />
                    <span className="text-xs font-sans text-primary/60 dark:text-white/60">平均分</span>
                  </div>
                  <div className={`font-serif text-2xl font-bold ${averageScore >= 70 ? 'text-green-600 dark:text-green-400' : 'text-primary dark:text-white'}`}>{averageScore}</div>
                </div>
                <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-xs font-sans text-primary/60 dark:text-white/60">正确率</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-green-600 dark:text-green-400">{correctRate}%</div>
                </div>
                <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl p-4 shadow-md">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4 text-red-500" />
                    <span className="text-xs font-sans text-primary/60 dark:text-white/60">错题数</span>
                  </div>
                  <div className="font-serif text-2xl font-bold text-red-600 dark:text-red-400">{wrongRecords.length}</div>
                </div>
              </div>

              {/* 7日学习柱状图 */}
              {recordsByDate.length > 0 && (
                <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5 mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-5 h-5 text-primary dark:text-white" />
                    <h2 className="font-serif text-lg font-bold text-primary dark:text-white">最近 7 天学习量</h2>
                  </div>
                  <div className="flex items-end justify-between gap-1 h-32">
                    {recordsByDate.map(([date, count]) => (
                      <div key={date} className="flex-1 flex flex-col items-center gap-1">
                        <div className="text-xs text-primary dark:text-white font-sans font-bold">{count}</div>
                        <div
                          className="w-full bg-primary dark:bg-accent-gold rounded-t transition-all"
                          style={{ height: `${(count / maxDayCount) * 80}%`, minHeight: '8px' }}
                        />
                        <div className="text-[10px] text-primary/50 dark:text-white/50 font-sans">
                          {date.slice(5)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 场景统计 */}
              {categoryStats.length > 0 && (
                <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5 mb-6">
                  <h2 className="font-serif text-lg font-bold text-primary dark:text-white mb-4">场景表现</h2>
                  <div className="space-y-2">
                    {categoryStats.map((s) => (
                      <div key={s.category} className="flex items-center gap-3">
                        <span className="text-sm font-sans w-24 text-primary dark:text-white">
                          {categoryEmoji[s.category]} {categoryLabels[s.category]}
                        </span>
                        <div className="flex-1 h-2 bg-primary/10 dark:bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary dark:bg-accent-gold rounded-full"
                            style={{ width: `${s.average}%` }}
                          />
                        </div>
                        <span className="text-xs font-sans text-primary/60 dark:text-white/60 w-16 text-right">
                          {s.average}分 · {s.total}题
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 薄弱点 */}
              {weaknessStats.length > 0 && (
                <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5 mb-6">
                  <h2 className="font-serif text-lg font-bold text-primary dark:text-white mb-4">薄弱知识点</h2>
                  <div className="flex flex-wrap gap-2">
                    {weaknessStats.map((w, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg font-sans text-sm"
                      >
                        {w.weakness} · {w.count}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 筛选区 */}
              <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-4 mb-4">
                <div className="flex items-center gap-2 mb-3">
                  <Filter className="w-4 h-4 text-primary dark:text-white" />
                  <span className="font-sans text-sm text-primary/70 dark:text-white/70">筛选</span>
                </div>

                <div className="relative mb-3">
                  <Search className="w-4 h-4 text-primary/40 dark:text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="搜索题目内容..."
                    className="w-full pl-10 pr-3 py-2 bg-secondary/30 dark:bg-white/5 border border-primary/10 dark:border-white/10 rounded-lg text-sm font-sans text-primary dark:text-white placeholder:text-primary/30 dark:placeholder:text-white/30"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value as SceneCategory | 'all')}
                    className="px-3 py-1.5 bg-secondary/30 dark:bg-white/5 border border-primary/10 dark:border-white/10 rounded-full text-sm font-sans text-primary dark:text-white"
                  >
                    <option value="all">全部分类</option>
                    {Object.entries(categoryLabels).map(([k, v]) => (
                      <option key={k} value={k}>{categoryEmoji[k as SceneCategory]} {v}</option>
                    ))}
                  </select>

                  <div className="flex gap-1">
                    {(['all', 'high', 'low'] as const).map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilterScore(f)}
                        className={`px-3 py-1.5 rounded-full text-sm font-sans transition-all ${
                          filterScore === f
                            ? 'bg-primary text-white'
                            : 'bg-secondary/30 dark:bg-white/5 text-primary dark:text-white border border-primary/10 dark:border-white/10'
                        }`}
                      >
                        {f === 'all' ? '全部' : f === 'high' ? '正确' : '错误'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 记录列表 */}
              <div className="space-y-2">
                <p className="text-xs text-primary/50 dark:text-white/50 font-sans">
                  共 {filteredRecords.length} 条记录
                </p>
                {filteredRecords.map((r) => {
                  const isFav = favoriteIds.includes(r.questionId);
                  const correct = r.scoreResult.total >= 70;
                  return (
                    <div
                      key={r.id}
                      className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-4"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-sans px-2 py-0.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded">
                            {categoryEmoji[r.question.category]} {categoryLabels[r.question.category]}
                          </span>
                          <span className="text-xs font-sans text-primary/50 dark:text-white/50">
                            {'★'.repeat(r.question.difficulty)}
                          </span>
                          <span className="text-xs font-sans text-primary/50 dark:text-white/50">
                            {new Date(r.timestamp).toLocaleString('zh-CN', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            onClick={() => toggleFavorite(r.questionId)}
                            className="p-1.5 hover:bg-primary/10 dark:hover:bg-white/10 rounded transition-colors"
                          >
                            <Star className={`w-4 h-4 ${isFav ? 'fill-accent-gold text-accent-gold' : 'text-primary/40 dark:text-white/40'}`} />
                          </button>
                          <button
                            onClick={() => deleteRecord(r.id)}
                            className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-primary/40 dark:text-white/40 hover:text-red-500" />
                          </button>
                        </div>
                      </div>

                      <p className="font-serif text-primary dark:text-white mb-1">{r.question.sourceText}</p>
                      <p className="font-sans text-sm text-primary/70 dark:text-white/70 mb-2">
                        你的答案：<span className="italic">{r.userAnswer || '(未作答)'}</span>
                      </p>

                      <div className="flex items-center justify-between gap-2 text-xs">
                        <span className={`px-2 py-0.5 rounded font-sans font-bold ${getScoreColor(r.scoreResult.total)}`}>
                          {r.scoreResult.total} 分 · {correct ? '正确' : '需改进'}
                        </span>
                        <div className="flex gap-1">
                          <span className="text-primary/50 dark:text-white/50 font-sans">准确性 {r.scoreResult.accuracy}</span>
                          <span className="text-primary/50 dark:text-white/50 font-sans">语法 {r.scoreResult.grammar}</span>
                          <span className="text-primary/50 dark:text-white/50 font-sans">流畅度 {r.scoreResult.fluency}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
