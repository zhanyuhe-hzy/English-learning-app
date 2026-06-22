import { useNavigate } from 'react-router-dom';
import { usePracticeStore } from '../store/practiceStore';
import { getRandomQuestions, categoryLabels, categoryEmoji, SceneCategory, getFilteredQuestions } from '../data/questions';
import { BookOpen, Brain, Target, TrendingUp, Star, AlertTriangle, Sparkles, ChevronRight, Sun, Moon, BookMarked, GraduationCap, Music, Mic, MessageCircle, Library } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const SCENE_KEYS: (SceneCategory | 'all')[] = ['all', 'daily', 'travel', 'business', 'academic', 'tech', 'culture', 'shopping', 'emotion', 'health', 'proverb'];

export default function HomePage() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const {
    mode, setMode, category, setCategory, difficulty, setDifficulty,
    questionCount, setQuestionCount, setQuestions,
    stats, favoriteIds, getWrongRecords,
  } = usePracticeStore();

  const todayCorrectRate = stats.totalPractice > 0
    ? Math.round((stats.correctCount / stats.totalPractice) * 100)
    : 0;
  const averageScore = stats.scoredCount > 0
    ? Math.round(stats.totalScore / stats.scoredCount)
    : 0;

  const handleStartPractice = () => {
    const available = getFilteredQuestions({ mode, category, difficulty });
    if (available.length === 0) {
      alert('当前筛选条件下没有可练习的题目，请调整筛选。');
      return;
    }
    const questions = getRandomQuestions({ mode, category, difficulty, count: questionCount });
    setQuestions(questions);
    navigate('/practice');
  };

  const handleStartWrong = () => {
    const wrong = getWrongRecords();
    if (wrong.length === 0) {
      alert('暂无错题，先去练习吧！');
      return;
    }
    const shuffled = [...wrong].sort(() => Math.random() - 0.5).slice(0, Math.min(questionCount, wrong.length));
    setQuestions(shuffled.map(r => r.question));
    navigate('/practice');
  };

  const handleStartFavorites = () => {
    if (favoriteIds.length === 0) {
      alert('还没有收藏题目，先去收藏一些吧！');
      return;
    }
    // 通过 store 获取已练习过的收藏题目
    const favoriteQuestions = usePracticeStore.getState().getFavoriteQuestions();
    if (favoriteQuestions.length === 0) {
      alert('收藏的题目还没有练习记录，先练习再收藏吧！');
      return;
    }
    const shuffled = [...favoriteQuestions].sort(() => Math.random() - 0.5).slice(0, Math.min(questionCount, favoriteQuestions.length));
    setQuestions(shuffled);
    navigate('/practice');
  };

  const totalAvailable = getFilteredQuestions({ mode, category, difficulty }).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-2xl md:text-3xl font-bold text-primary dark:text-white">英语学习宝</h1>
              <p className="text-xs text-primary/60 dark:text-white/60 font-sans">通过互译练习，深入理解英语</p>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/60 dark:bg-white/10 text-primary dark:text-white hover:bg-white dark:hover:bg-white/20 transition-colors"
            aria-label="切换主题"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        <div className="max-w-5xl mx-auto">
          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            <StatCard
              icon={<Target className="w-5 h-5" />}
              label="累计练习"
              value={stats.totalPractice}
              suffix="题"
            />
            <StatCard
              icon={<TrendingUp className="w-5 h-5" />}
              label="平均得分"
              value={averageScore}
              suffix="分"
            />
            <StatCard
              icon={<Sparkles className="w-5 h-5" />}
              label="正确率"
              value={stats.totalPractice > 0 ? todayCorrectRate : 0}
              suffix="%"
            />
            <StatCard
              icon={<Brain className="w-5 h-5" />}
              label="连续学习"
              value={stats.streak}
              suffix="天"
            />
          </div>

          {/* 快捷入口 */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <QuickAction
              icon={<AlertTriangle className="w-5 h-5" />}
              label="错题重做"
              count={getWrongRecords().length}
              color="text-red-500"
              onClick={handleStartWrong}
            />
            <QuickAction
              icon={<Star className="w-5 h-5" />}
              label="我的收藏"
              count={favoriteIds.length}
              color="text-accent-gold"
              onClick={handleStartFavorites}
            />
            <QuickAction
              icon={<BookMarked className="w-5 h-5" />}
              label="历史记录"
              count={null}
              color="text-primary"
              onClick={() => navigate('/records')}
            />
          </div>

          {/* 学习模块 */}
          <h2 className="font-serif text-lg font-bold text-primary dark:text-white mb-3 px-1">学习模块</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <ModuleCard
              icon={<GraduationCap className="w-6 h-6" />}
              title="学习方法"
              subtitle="零基础到流利"
              gradient="from-purple-500 to-purple-600"
              onClick={() => navigate('/learn')}
            />
            <ModuleCard
              icon={<Music className="w-6 h-6" />}
              title="音标发音"
              subtitle="48 个音标"
              gradient="from-pink-500 to-pink-600"
              onClick={() => navigate('/pronunciation')}
            />
            <ModuleCard
              icon={<Mic className="w-6 h-6" />}
              title="口语跟读"
              subtitle="AI 语音评分"
              gradient="from-orange-500 to-orange-600"
              onClick={() => navigate('/speaking')}
            />
            <ModuleCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="情景对话"
              subtitle="8 大场景"
              gradient="from-blue-500 to-blue-600"
              onClick={() => navigate('/dialogue')}
            />
          </div>
          <div className="mb-6">
            <button
              onClick={() => navigate('/phrases')}
              className="w-full bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-4 hover:shadow-lg transition-all flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center">
                <Library className="w-6 h-6" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-serif text-base font-bold text-primary dark:text-white">日常口语表达</p>
                <p className="text-xs text-primary/60 dark:text-white/60 font-sans">65 个高频表达 · 13 个分类</p>
              </div>
              <ChevronRight className="w-5 h-5 text-primary/40" />
            </button>
          </div>

          {/* 主练习卡片 */}
          <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-serif font-bold text-primary dark:text-white mb-6">开始新练习</h2>

            {/* 翻译方向 */}
            <div className="mb-5">
              <h3 className="text-sm font-sans text-primary/60 dark:text-white/60 mb-3">翻译方向</h3>
              <div className="grid grid-cols-3 gap-2">
                <ModeButton active={mode === 'en2zh'} onClick={() => setMode('en2zh')} title="英译中" description="EN → 中文" />
                <ModeButton active={mode === 'zh2en'} onClick={() => setMode('zh2en')} title="中译英" description="中文 → EN" />
                <ModeButton active={mode === 'mixed'} onClick={() => setMode('mixed')} title="混合" description="随机混合" />
              </div>
            </div>

            {/* 场景分类 */}
            <div className="mb-5">
              <h3 className="text-sm font-sans text-primary/60 dark:text-white/60 mb-3">
                场景分类 <span className="text-xs">（{totalAvailable} 题可选）</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {SCENE_KEYS.map((key) => (
                  <button
                    key={key}
                    onClick={() => setCategory(key)}
                    className={`px-3 py-1.5 rounded-full text-sm font-sans transition-all ${
                      category === key
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-secondary dark:bg-white/10 text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-white/20'
                    }`}
                  >
                    {key === 'all' ? '🌐 全部' : `${categoryEmoji[key]} ${categoryLabels[key]}`}
                  </button>
                ))}
              </div>
            </div>

            {/* 难度筛选 */}
            <div className="mb-5">
              <h3 className="text-sm font-sans text-primary/60 dark:text-white/60 mb-3">难度等级</h3>
              <div className="flex gap-2">
                {(['all', 1, 2, 3, 4, 5] as const).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d as number | 'all')}
                    className={`px-4 py-1.5 rounded-full text-sm font-sans transition-all ${
                      difficulty === d
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-secondary dark:bg-white/10 text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-white/20'
                    }`}
                  >
                    {d === 'all' ? '全部' : `${'★'.repeat(d)}`}
                  </button>
                ))}
              </div>
            </div>

            {/* 题数选择 */}
            <div className="mb-6">
              <h3 className="text-sm font-sans text-primary/60 dark:text-white/60 mb-3">题目数量</h3>
              <div className="flex gap-2">
                {[5, 10, 15, 20].map((n) => (
                  <button
                    key={n}
                    onClick={() => setQuestionCount(n)}
                    className={`px-5 py-1.5 rounded-full text-sm font-sans transition-all ${
                      questionCount === n
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-secondary dark:bg-white/10 text-primary dark:text-white hover:bg-primary/10 dark:hover:bg-white/20'
                    }`}
                  >
                    {n} 题
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleStartPractice}
              className="w-full py-4 bg-primary hover:bg-primary-light text-white text-lg font-bold rounded-2xl
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300
                         font-sans tracking-wide flex items-center justify-center gap-2"
            >
              开始练习
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <footer className="text-center mt-8 text-primary/50 dark:text-white/40 font-sans text-xs">
            <p>题库覆盖 10 大场景 290+ 道精选互译练习</p>
            <p className="mt-1">涵盖日常对话、商务职场、学术教育、科技数码、文化娱乐、购物消费、情感表达、健康医疗、谚语名言</p>
          </footer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, suffix }: {
  icon: React.ReactNode;
  label: string;
  value: number;
  suffix: string;
}) {
  return (
    <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl p-4 shadow-md text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 bg-primary/10 dark:bg-white/10 rounded-xl mb-2 text-primary dark:text-white">
        {icon}
      </div>
      <div className="font-serif text-2xl font-bold text-primary dark:text-white">
        {value}<span className="text-sm">{suffix}</span>
      </div>
      <div className="text-xs text-primary/60 dark:text-white/60 font-sans mt-0.5">{label}</div>
    </div>
  );
}

function QuickAction({ icon, label, count, color, onClick }: {
  icon: React.ReactNode;
  label: string;
  count: number | null;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5"
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 bg-primary/10 dark:bg-white/10 rounded-xl mb-2 ${color}`}>
        {icon}
      </div>
      <div className="font-sans text-sm font-bold text-primary dark:text-white">{label}</div>
      {count !== null && (
        <div className="text-xs text-primary/60 dark:text-white/60 font-sans">{count} 项</div>
      )}
    </button>
  );
}

function ModuleCard({ icon, title, subtitle, gradient, onClick }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  gradient: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 text-left"
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl text-white mb-2 bg-gradient-to-br ${gradient}`}>
        {icon}
      </div>
      <div className="font-serif text-sm font-bold text-primary dark:text-white">{title}</div>
      <div className="text-xs text-primary/60 dark:text-white/60 font-sans">{subtitle}</div>
    </button>
  );
}

function ModeButton({
  active,
  onClick,
  title,
  description,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-xl border-2 transition-all duration-200 ${
        active
          ? 'border-primary bg-primary/5 dark:bg-primary/20 shadow-md'
          : 'border-primary/20 dark:border-white/20 hover:border-primary/40 dark:hover:border-white/40 bg-white dark:bg-white/5'
      }`}
    >
      <div className={`font-serif text-base font-bold mb-0.5 ${active ? 'text-primary dark:text-white' : 'text-primary/80 dark:text-white/80'}`}>
        {title}
      </div>
      <div className="text-xs text-primary/60 dark:text-white/60 font-sans">{description}</div>
    </button>
  );
}
