import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, Search, BookOpen, Star } from 'lucide-react';
import { dailyPhrases, categoryLabels, categoryEmoji, PhraseCategory } from '../data/dailyPhrases';
import { speak, stopSpeaking } from '../utils/speech';
import { usePracticeStore } from '../store/practiceStore';

type CategoryFilter = PhraseCategory | 'all';

export default function PhrasesPage() {
  const navigate = useNavigate();
  const { favoriteIds, toggleFavorite } = usePracticeStore();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [search, setSearch] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const filtered = dailyPhrases.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (search.trim()) {
      const kw = search.toLowerCase();
      return p.english.toLowerCase().includes(kw) || p.chinese.includes(search);
    }
    return true;
  });

  const categories: CategoryFilter[] = ['all', 'greeting', 'farewell', 'thanks', 'apology', 'agreement', 'disagreement', 'confusion', 'emotion', 'request', 'opinion', 'shopping', 'work', 'social'];

  const handlePlay = async (id: string, text: string) => {
    if (playingId === id) {
      stopSpeaking();
      setPlayingId(null);
      return;
    }
    setPlayingId(id);
    try {
      await speak(text, { lang: 'en-US', rate: 0.85 });
    } catch {
      // 忽略播放错误
    }
    setPlayingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex items-center gap-3 mb-6">
          <button
            onClick={() => {
              stopSpeaking();
              navigate('/');
            }}
            className="flex items-center gap-2 text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg mb-3">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary dark:text-white mb-2">日常口语</h1>
            <p className="text-sm text-primary/60 dark:text-white/60 font-sans">65 个高频表达 · 13 大场景分类</p>
          </div>

          {/* 搜索 */}
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-primary/40 dark:text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索表达或中文..."
              className="w-full pl-10 pr-3 py-3 bg-white dark:bg-white/10 rounded-xl text-sm font-sans text-primary dark:text-white placeholder:text-primary/40 dark:placeholder:text-white/40 border border-primary/10 dark:border-white/10"
            />
          </div>

          {/* 分类 */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {categories.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-sans transition-all ${
                  activeCategory === c
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-white/10 text-primary dark:text-white'
                }`}
              >
                {c === 'all' ? '🌐 全部' : `${categoryEmoji[c as PhraseCategory]} ${categoryLabels[c as PhraseCategory]}`}
              </button>
            ))}
          </div>

          <p className="text-xs text-primary/50 dark:text-white/50 font-sans mb-3">共 {filtered.length} 条</p>

          <div className="space-y-2">
            {filtered.map(p => {
              const isFav = favoriteIds.includes(p.id);
              const isPlaying = playingId === p.id;
              return (
                <div key={p.id} className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-sans px-2 py-0.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded">
                        {categoryEmoji[p.category]} {categoryLabels[p.category]}
                      </span>
                      <span className="text-xs font-sans text-primary/50 dark:text-white/50">{p.scenario}</span>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <button
                        onClick={() => toggleFavorite(p.id)}
                        className="p-1.5 hover:bg-primary/10 dark:hover:bg-white/10 rounded"
                      >
                        <Star className={`w-4 h-4 ${isFav ? 'fill-accent-gold text-accent-gold' : 'text-primary/40 dark:text-white/40'}`} />
                      </button>
                      <button
                        onClick={() => handlePlay(p.id, p.english)}
                        className={`p-2 rounded-lg transition-all ${
                          isPlaying ? 'bg-accent-gold text-white' : 'bg-primary/10 dark:bg-white/10 text-primary dark:text-white hover:bg-primary/20'
                        }`}
                      >
                        {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                  <p className="text-lg font-serif text-primary dark:text-white mb-1">{p.english}</p>
                  <p className="text-sm text-primary/70 dark:text-white/70 font-sans mb-2">{p.chinese}</p>

                  {p.tip && (
                    <p className="text-xs text-primary/60 dark:text-white/60 font-sans bg-accent-gold/10 px-2 py-1 rounded inline-block">
                      💡 {p.tip}
                    </p>
                  )}

                  {p.response && p.response.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-primary/10 dark:border-white/10">
                      <p className="text-xs text-primary/60 dark:text-white/60 font-sans mb-1">可能回应：</p>
                      <div className="flex flex-wrap gap-1">
                        {p.response.map((r, i) => (
                          <span key={i} className="text-xs font-sans px-2 py-0.5 bg-primary/5 dark:bg-white/5 text-primary dark:text-white rounded">
                            {r}
                          </span>
                        ))}
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
