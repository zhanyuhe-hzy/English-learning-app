import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, Target, Lightbulb, AlertTriangle, BookMarked, Video, Headphones, Smartphone, Sparkles } from 'lucide-react';
import { learningPath, learningMethods, dailyRoutine } from '../data/learningPath';
import { useState } from 'react';

const resourceIcon = {
  book: BookMarked,
  video: Video,
  podcast: Headphones,
  app: Smartphone,
};

export default function LearnPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'path' | 'methods' | 'routine'>('path');

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex items-center gap-3 mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
        </header>

        <div className="max-w-4xl mx-auto">
          {/* 顶部标题 */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg mb-3">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary dark:text-white mb-2">英语学习方法</h1>
            <p className="text-sm text-primary/60 dark:text-white/60 font-sans">从零基础到流利表达的完整路线图</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 bg-white/40 dark:bg-white/5 rounded-2xl p-1">
            <TabButton active={tab === 'path'} onClick={() => setTab('path')} emoji="🗺️" label="学习路径" />
            <TabButton active={tab === 'methods'} onClick={() => setTab('methods')} emoji="💡" label="学习方法" />
            <TabButton active={tab === 'routine'} onClick={() => setTab('routine')} emoji="📅" label="每日规划" />
          </div>

          {/* 内容区 */}
          {tab === 'path' && <PathContent />}
          {tab === 'methods' && <MethodsContent />}
          {tab === 'routine' && <RoutineContent />}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, emoji, label }: { active: boolean; onClick: () => void; emoji: string; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-2.5 px-3 rounded-xl font-sans text-sm font-bold transition-all ${
        active ? 'bg-white dark:bg-primary text-primary dark:text-white shadow-md' : 'text-primary/60 dark:text-white/60'
      }`}
    >
      <span className="mr-1">{emoji}</span>
      {label}
    </button>
  );
}

function PathContent() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-accent-gold" />
          <h2 className="font-serif text-lg font-bold text-primary dark:text-white">给零基础同学的建议</h2>
        </div>
        <ul className="text-sm text-primary/80 dark:text-white/80 font-sans space-y-1.5">
          <li>• 不要急。英语是马拉松，不是短跑。</li>
          <li>• 每天 30 分钟比周末突击 5 小时有效得多。</li>
          <li>• 发音先行。音标扎实了，后面单词记忆会轻松很多。</li>
          <li>• 勇敢开口。说错是学习的一部分，不开口永远学不会。</li>
          <li>• 选择感兴趣的内容（电影、音乐、话题）作为素材。</li>
        </ul>
      </div>

      {learningPath.map((stage, index) => (
        <div key={stage.id} className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center font-bold font-serif text-lg">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-sans text-primary/60 dark:text-white/60">{stage.stage}</span>
                <span className="text-xs font-sans px-1.5 py-0.5 bg-accent-gold/20 text-accent-gold rounded flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {stage.duration}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-primary dark:text-white">{stage.title}</h3>
              <p className="text-sm text-primary/70 dark:text-white/70 font-sans mt-0.5 flex items-start gap-1">
                <Target className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                {stage.goal}
              </p>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs font-sans font-bold text-primary/60 dark:text-white/60 mb-1.5">📝 学习任务</p>
            <ul className="space-y-1">
              {stage.tasks.map((t, i) => (
                <li key={i} className="text-sm font-sans text-primary/80 dark:text-white/80 flex items-start gap-1.5">
                  <span className="text-primary/40 dark:text-white/40">•</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-accent-gold/10 rounded-xl p-3 mb-3">
            <p className="text-xs font-sans font-bold text-accent-gold mb-1.5 flex items-center gap-1">
              <Lightbulb className="w-3.5 h-3.5" />
              实用小贴士
            </p>
            <ul className="space-y-1">
              {stage.tips.map((t, i) => (
                <li key={i} className="text-sm font-sans text-primary/80 dark:text-white/80">· {t}</li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-sans font-bold text-primary/60 dark:text-white/60 mb-1.5">📚 推荐资源</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {stage.resources.map((r, i) => {
                const Icon = resourceIcon[r.type];
                return (
                  <div key={i} className="flex items-center gap-2 p-2 bg-primary/5 dark:bg-white/5 rounded-lg">
                    <Icon className="w-4 h-4 text-primary dark:text-white flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-sans font-bold text-primary dark:text-white truncate">{r.name}</p>
                      <p className="text-xs font-sans text-primary/60 dark:text-white/60 truncate">{r.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MethodsContent() {
  return (
    <div className="space-y-4">
      {learningMethods.map((m) => (
        <div key={m.id} className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="text-3xl">{m.icon}</div>
            <div>
              <h3 className="font-serif text-lg font-bold text-primary dark:text-white">{m.title}</h3>
              <p className="text-sm text-primary/70 dark:text-white/70 font-sans">{m.description}</p>
            </div>
          </div>

          <div className="mb-3">
            <p className="text-xs font-sans font-bold text-primary/60 dark:text-white/60 mb-1.5">📋 实施步骤</p>
            <ol className="space-y-1">
              {m.steps.map((s, i) => (
                <li key={i} className="text-sm font-sans text-primary/80 dark:text-white/80 flex gap-2">
                  <span className="font-bold text-primary dark:text-white flex-shrink-0">{i + 1}.</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3">
              <p className="text-xs font-sans font-bold text-green-600 dark:text-green-400 mb-1.5">✅ 优势</p>
              <ul className="space-y-1">
                {m.benefits.map((b, i) => (
                  <li key={i} className="text-sm font-sans text-primary/80 dark:text-white/80">· {b}</li>
                ))}
              </ul>
            </div>

            {m.warnings && (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-xl p-3">
                <p className="text-xs font-sans font-bold text-yellow-700 dark:text-yellow-400 mb-1.5 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  注意事项
                </p>
                <ul className="space-y-1">
                  {m.warnings.map((w, i) => (
                    <li key={i} className="text-sm font-sans text-primary/80 dark:text-white/80">· {w}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function RoutineContent() {
  return (
    <div className="space-y-4">
      <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5">
        <h2 className="font-serif text-lg font-bold text-primary dark:text-white mb-2">每日学习时间表</h2>
        <p className="text-sm text-primary/70 dark:text-white/70 font-sans mb-4">
          推荐每日 1 小时分散学习，比集中突击效果好 3 倍。下方是建议的时段安排：
        </p>

        <div className="space-y-3">
          <RoutineSection emoji="🌅" title="早晨（10-15 分钟）" items={dailyRoutine.morning} color="bg-yellow-50 dark:bg-yellow-900/20" />
          <RoutineSection emoji="☀️" title="午间（10-15 分钟）" items={dailyRoutine.day} color="bg-blue-50 dark:bg-blue-900/20" />
          <RoutineSection emoji="🌙" title="晚上（30-40 分钟）" items={dailyRoutine.evening} color="bg-purple-50 dark:bg-purple-900/20" />
        </div>
      </div>

      <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5">
        <h2 className="font-serif text-lg font-bold text-primary dark:text-white mb-3">🎯 学习目标设定</h2>
        <p className="text-sm text-primary/70 dark:text-white/70 font-sans mb-3">SMART 原则：</p>
        <ul className="space-y-1.5 text-sm font-sans text-primary/80 dark:text-white/80">
          <li><span className="font-bold text-primary dark:text-white">S</span>pecific（具体）：学会 100 个常用词</li>
          <li><span className="font-bold text-primary dark:text-white">M</span>easurable（可衡量）：能正确使用 80%</li>
          <li><span className="font-bold text-primary dark:text-white">A</span>chievable（可达成）：不要定过高目标</li>
          <li><span className="font-bold text-primary dark:text-white">R</span>elevant（相关）：与你的实际需求相关</li>
          <li><span className="font-bold text-primary dark:text-white">T</span>ime-bound（有时限）：3 个月内完成</li>
        </ul>
      </div>

      <div className="bg-gradient-to-r from-primary to-primary-light rounded-2xl shadow-md p-5 text-white">
        <h2 className="font-serif text-lg font-bold mb-2">💪 保持动力的方法</h2>
        <ul className="space-y-1.5 text-sm font-sans opacity-95">
          <li>· 找一个学习伙伴，互相鼓励</li>
          <li>· 设定小目标并奖励自己</li>
          <li>· 记录学习过程，看到自己的进步</li>
          <li>· 关注兴趣内容（电影、音乐、话题）</li>
          <li>· 不要和别人比，只和昨天的自己比</li>
        </ul>
      </div>
    </div>
  );
}

function RoutineSection({ emoji, title, items, color }: { emoji: string; title: string; items: string[]; color: string }) {
  return (
    <div className={`${color} rounded-xl p-4`}>
      <h3 className="font-sans font-bold text-primary dark:text-white mb-2 flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        {title}
      </h3>
      <ul className="space-y-1">
        {items.map((item, i) => (
          <li key={i} className="text-sm font-sans text-primary/80 dark:text-white/80 flex items-start gap-1.5">
            <span className="text-primary/40 dark:text-white/40">·</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
