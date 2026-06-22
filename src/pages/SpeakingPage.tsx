import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, Mic, MicOff, RefreshCw, ChevronRight, ChevronLeft, Sparkles, RotateCcw } from 'lucide-react';
import { speakingSentences, speakingCategories, SpeakingSentence } from '../data/speakingSentences';
import { speak, stopSpeaking, createRecognizer, startRecognition, isRecognitionSupported, calculateSpeechSimilarity, getDiffWords, SpeechRecognizer, SpeechRecognitionErrorEvent } from '../utils/speech';
import { usePracticeStore } from '../store/practiceStore';

export default function SpeakingPage() {
  const navigate = useNavigate();
  const { addSpeakingRecord, speakingRecords } = usePracticeStore();
  const [category, setCategory] = useState<SpeakingSentence['category'] | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [recognizedText, setRecognizedText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [error, setError] = useState('');
  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  const filteredSentences = category === 'all' ? speakingSentences : speakingSentences.filter(s => s.category === category);
  const currentSentence = filteredSentences[currentIndex];

  useEffect(() => {
    setCurrentIndex(0);
    reset();
  }, [category]);

  useEffect(() => {
    return () => {
      stopSpeaking();
      try {
        if (recognizerRef.current) recognizerRef.current.stop();
      } catch {
        // 停止识别可能抛出错误，忽略即可
      }
    };
  }, []);

  const reset = () => {
    setRecognizedText('');
    setSimilarity(null);
    setInterimText('');
    setError('');
  };

  const handlePlay = async () => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    try {
      await speak(currentSentence.english, { lang: 'en-US', rate: 0.85 });
    } catch {
      // 忽略播放错误
    }
    setIsPlaying(false);
  };

  const handleStartRecord = () => {
    if (!isRecognitionSupported()) {
      setError('当前浏览器不支持语音识别，请使用 Chrome 浏览器。');
      return;
    }
    setError('');
    reset();
    setIsRecording(true);
    const rec = createRecognizer({ lang: 'en-US' });
    recognizerRef.current = rec;
    startRecognition(
      rec,
      (text, isFinal, confidence) => {
        if (isFinal) {
          setRecognizedText(text);
          setInterimText('');
          // 计算相似度
          const sim = calculateSpeechSimilarity(currentSentence.english, text);
          setSimilarity(sim);
          // confidence 暂未使用（未来可加入记录）
          void confidence;
          // 记录
          addSpeakingRecord({
            id: `${currentSentence.id}-${Date.now()}`,
            sentenceId: currentSentence.id,
            sentence: currentSentence.english,
            userTranscript: text,
            similarity: sim,
            timestamp: Date.now(),
          });
        } else {
          setInterimText(text);
        }
      },
      (err: SpeechRecognitionErrorEvent) => {
        setIsRecording(false);
        if (err.error === 'no-speech') {
          setError('没有检测到声音，请大声跟读。');
        } else if (err.error === 'not-allowed') {
          setError('请允许麦克风权限。');
        } else {
          setError(`识别出错：${err.error || '未知错误'}`);
        }
      },
      () => {
        setIsRecording(false);
      }
    );
  };

  const handleStopRecord = () => {
    try {
      if (recognizerRef.current) recognizerRef.current.stop();
    } catch {
      // 停止识别可能抛出错误，忽略即可
    }
    setIsRecording(false);
  };

  const handleRetry = () => {
    reset();
    setTimeout(() => handleStartRecord(), 100);
  };

  const handleNext = () => {
    if (currentIndex < filteredSentences.length - 1) {
      setCurrentIndex(currentIndex + 1);
      reset();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      reset();
    }
  };

  const handleRandom = () => {
    const randomIdx = Math.floor(Math.random() * filteredSentences.length);
    setCurrentIndex(randomIdx);
    reset();
  };

  const diffWords = currentSentence && recognizedText
    ? getDiffWords(currentSentence.english, recognizedText)
    : null;

  const getScoreColor = (s: number) => {
    if (s >= 80) return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
    if (s >= 60) return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
    return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
  };

  const getScoreMessage = (s: number) => {
    if (s >= 90) return '🌟 发音太棒了！';
    if (s >= 75) return '👍 发音不错，继续保持！';
    if (s >= 60) return '💪 还可以，多练习几遍！';
    return '📖 注意单词的准确度和连读。';
  };

  if (!currentSentence) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-primary dark:text-white">该分类下暂无句子</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              stopSpeaking();
              handleStopRecord();
              navigate('/');
            }}
            className="flex items-center gap-2 text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>
          <div className="font-sans text-sm text-primary/70 dark:text-white/70">
            {currentIndex + 1} / {filteredSentences.length}
          </div>
        </header>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-4">
            <h1 className="font-serif text-2xl font-bold text-primary dark:text-white">口语跟读练习</h1>
            <p className="text-xs text-primary/60 dark:text-white/60 font-sans mt-1">听 → 跟读 → 评分</p>
          </div>

          {/* 分类 */}
          <div className="flex gap-2 overflow-x-auto mb-4 pb-2">
            {speakingCategories.map(c => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-sans transition-all ${
                  category === c.id
                    ? 'bg-primary text-white shadow-md'
                    : 'bg-white dark:bg-white/10 text-primary dark:text-white'
                }`}
              >
                {c.emoji} {c.label}
              </button>
            ))}
          </div>

          {/* 句子卡片 */}
          <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-sans px-2 py-0.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded">
                {currentSentence.category}
              </span>
              <span className="text-xs font-sans text-primary/50 dark:text-white/50">
                {'★'.repeat(currentSentence.difficulty)}
              </span>
            </div>

            <p className="text-2xl md:text-3xl font-serif text-primary dark:text-white text-center leading-relaxed mb-4">
              {currentSentence.english}
            </p>
            <p className="text-center text-primary/60 dark:text-white/60 font-sans text-sm mb-6">
              {currentSentence.chinese}
            </p>

            <div className="flex justify-center gap-2">
              <button
                onClick={handlePlay}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-sans font-bold transition-all ${
                  isPlaying
                    ? 'bg-accent-gold text-white'
                    : 'bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg'
                }`}
              >
                <Volume2 className="w-5 h-5" />
                {isPlaying ? '播放中...' : '听标准发音'}
              </button>
              <button
                onClick={handleRandom}
                className="p-3 bg-white dark:bg-white/10 text-primary dark:text-white rounded-2xl font-sans hover:bg-primary/5 dark:hover:bg-white/20"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* 录音反馈 */}
          {(isRecording || recognizedText || similarity !== null) && (
            <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5 mb-4">
              {isRecording && (
                <div className="text-center mb-3">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-full font-sans text-sm animate-pulse">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    正在聆听...{interimText && <span className="italic">"{interimText}"</span>}
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-3 p-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300 rounded-lg text-sm font-sans">
                  {error}
                </div>
              )}

              {recognizedText && (
                <>
                  <div className="mb-3">
                    <p className="text-xs font-sans text-primary/60 dark:text-white/60 mb-1">你的发音（识别结果）</p>
                    <p className="font-sans text-primary dark:text-white bg-secondary/50 dark:bg-white/5 p-3 rounded-lg">
                      "{recognizedText}"
                    </p>
                  </div>

                  {similarity !== null && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-sans text-primary/70 dark:text-white/70">相似度评分</span>
                        <span className={`px-3 py-1 rounded-full font-bold ${getScoreColor(similarity)}`}>
                          {similarity} 分
                        </span>
                      </div>
                      <div className="h-2 bg-primary/10 dark:bg-white/10 rounded-full overflow-hidden mb-2">
                        <div
                          className={`h-full transition-all ${
                            similarity >= 80 ? 'bg-green-500' : similarity >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${similarity}%` }}
                        />
                      </div>
                      <p className="text-sm font-sans text-primary/80 dark:text-white/80 mb-3 flex items-center gap-1">
                        <Sparkles className="w-4 h-4 text-accent-gold" />
                        {getScoreMessage(similarity)}
                      </p>

                      {diffWords && (
                        <div className="p-3 bg-primary/5 dark:bg-white/5 rounded-lg">
                          <p className="text-xs font-sans text-primary/60 dark:text-white/60 mb-2">单词匹配：</p>
                          <div className="flex flex-wrap gap-1">
                            {diffWords.map((w, i) => (
                              <span
                                key={i}
                                className={`px-2 py-0.5 rounded text-sm font-sans ${
                                  w.matched
                                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                    : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300'
                                }`}
                              >
                                {w.word}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <button
                        onClick={handleRetry}
                        className="mt-3 w-full py-2.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded-xl font-sans text-sm font-bold hover:bg-primary/20 dark:hover:bg-white/20 flex items-center justify-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        再练一次
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* 录音按钮 */}
          {!isRecording && similarity === null && (
            <button
              onClick={handleStartRecord}
              className="w-full py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl font-sans font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <Mic className="w-5 h-5" />
              点击开始跟读
            </button>
          )}

          {isRecording && (
            <button
              onClick={handleStopRecord}
              className="w-full py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-sans font-bold shadow-lg flex items-center justify-center gap-2"
            >
              <MicOff className="w-5 h-5" />
              停止录音
            </button>
          )}

          {/* 导航 */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`py-3 px-4 rounded-2xl font-sans font-bold transition-all ${
                currentIndex === 0
                  ? 'bg-primary/10 dark:bg-white/10 text-primary/30 dark:text-white/30 cursor-not-allowed'
                  : 'bg-white dark:bg-white/10 text-primary dark:text-white hover:bg-primary/5 dark:hover:bg-white/20 shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex === filteredSentences.length - 1}
              className={`flex-1 py-3 rounded-2xl font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                currentIndex === filteredSentences.length - 1
                  ? 'bg-primary/10 dark:bg-white/10 text-primary/30 dark:text-white/30 cursor-not-allowed'
                  : 'bg-white dark:bg-white/10 text-primary dark:text-white hover:bg-primary/5 dark:hover:bg-white/20 shadow-md'
              }`}
            >
              下一句
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* 统计 */}
          {speakingRecords.length > 0 && (
            <div className="mt-6 bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-4 text-center">
              <p className="text-xs text-primary/60 dark:text-white/60 font-sans">累计跟读</p>
              <p className="text-2xl font-serif font-bold text-primary dark:text-white">
                {speakingRecords.length} <span className="text-sm">次</span>
              </p>
              <p className="text-xs text-primary/60 dark:text-white/60 font-sans mt-1">
                平均分：{Math.round(speakingRecords.reduce((s, r) => s + r.similarity, 0) / speakingRecords.length)} 分
              </p>
            </div>
          )}

          {!isRecognitionSupported() && (
            <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 rounded-xl text-sm text-yellow-700 dark:text-yellow-300 font-sans">
              ⚠️ 当前浏览器不支持语音识别。请使用 Chrome 或 Edge 浏览器以获得完整体验。
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
