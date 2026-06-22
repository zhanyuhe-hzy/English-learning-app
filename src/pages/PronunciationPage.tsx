import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, Music } from 'lucide-react';
import { useState } from 'react';
import { phonemes, phonemeTypes, Phoneme } from '../data/phonics';
import { speak, stopSpeaking } from '../utils/speech';

type TabKey = 'vowel_short' | 'vowel_long' | 'vowel_diphthong' | 'consonant';

export default function PronunciationPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabKey>('vowel_short');
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = phonemes.filter(p => p.type === activeTab);

  const handlePlay = async (phoneme: Phoneme) => {
    const key = `${phoneme.symbol}-${phoneme.example}`;
    if (playing === key) {
      stopSpeaking();
      setPlaying(null);
      return;
    }
    setPlaying(key);
    try {
      // 朗读例词，并重复一次
      await speak(`${phoneme.example}. ${phoneme.example}.`, { lang: 'en-US', rate: 0.7 });
      setPlaying(null);
    } catch {
      setPlaying(null);
    }
  };

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
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-lg mb-3">
              <Music className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-primary dark:text-white mb-2">国际音标</h1>
            <p className="text-sm text-primary/60 dark:text-white/60 font-sans">48 个 IPA 音标 · 跟读练习</p>
          </div>

          {/* Tabs */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {(Object.keys(phonemeTypes) as TabKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setActiveTab(k)}
                className={`py-3 px-2 rounded-xl font-sans text-xs sm:text-sm font-bold transition-all ${
                  activeTab === k
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-white/10 text-primary dark:text-white hover:bg-primary/5 dark:hover:bg-white/20'
                }`}
              >
                {phonemeTypes[k]}
              </button>
            ))}
          </div>

          {/* 提示 */}
          <div className="bg-accent-gold/10 border border-accent-gold/30 rounded-xl p-3 mb-4">
            <p className="text-sm font-sans text-primary dark:text-white">
              💡 点击 <Volume2 className="w-4 h-4 inline" /> 听标准发音，对照口型要点练习。
            </p>
          </div>

          {/* 音标网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filtered.map((p) => {
              const key = `${p.symbol}-${p.example}`;
              const isPlaying = playing === key;
              return (
                <div key={key} className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-4">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-baseline gap-3">
                      <span className="font-serif text-3xl font-bold text-primary dark:text-white">/{p.symbol}/</span>
                      <span className="text-sm text-primary/60 dark:text-white/60 font-sans">{p.exampleCn}</span>
                    </div>
                    <button
                      onClick={() => handlePlay(p)}
                      className={`p-2.5 rounded-xl transition-all ${
                        isPlaying
                          ? 'bg-primary text-white'
                          : 'bg-primary/10 dark:bg-white/10 text-primary dark:text-white hover:bg-primary/20 dark:hover:bg-white/20'
                      }`}
                    >
                      {isPlaying ? (
                        <div className="w-4 h-4 flex items-center justify-center">
                          <div className="flex gap-0.5">
                            <div className="w-1 h-3 bg-current animate-pulse" />
                            <div className="w-1 h-3 bg-current animate-pulse" style={{ animationDelay: '0.2s' }} />
                            <div className="w-1 h-3 bg-current animate-pulse" style={{ animationDelay: '0.4s' }} />
                          </div>
                        </div>
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div className="mb-2 px-3 py-2 bg-primary/5 dark:bg-white/5 rounded-lg">
                    <p className="text-base font-serif font-bold text-primary dark:text-white">
                      <span className="text-sm text-primary/50 dark:text-white/50 font-sans mr-1">例：</span>
                      {p.example}
                    </p>
                  </div>
                  <p className="text-sm text-primary/70 dark:text-white/70 font-sans leading-relaxed">{p.tip}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-6 bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5">
            <h3 className="font-serif text-lg font-bold text-primary dark:text-white mb-2">📚 学习建议</h3>
            <ul className="space-y-1.5 text-sm font-sans text-primary/80 dark:text-white/80">
              <li>· <span className="font-bold">先元音后辅音：</span>元音是英语发音的骨架</li>
              <li>· <span className="font-bold">注意长短音：</span>长短元音区别单词意思（如 ship /sheep）</li>
              <li>· <span className="font-bold">多听多模仿：</span>音标学会后，每天跟读 10 分钟</li>
              <li>· <span className="font-bold">录音对比：</span>自己发音和标准发音对比，发现问题</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
