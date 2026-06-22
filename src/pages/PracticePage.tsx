import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePracticeStore } from '../store/practiceStore';
import { calculateScore } from '../utils/scorer';
import { ArrowLeft, ArrowRight, Send, Lightbulb, Star, SkipForward, Clock, Eye, EyeOff } from 'lucide-react';

export default function PracticePage() {
  const navigate = useNavigate();
  const {
    currentQuestions,
    currentIndex,
    setAnswer,
    setResult,
    nextQuestion,
    prevQuestion,
    answers,
    results,
    toggleFavorite,
    favoriteIds,
    currentStartTime,
  } = usePracticeStore();

  const [inputValue, setInputValue] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  const currentQuestion = currentQuestions[currentIndex];

  useEffect(() => {
    if (!currentQuestion) {
      navigate('/');
      return;
    }
    setInputValue(answers.get(currentQuestion.id) || '');
    setShowHint(false);
    setShowAnswer(false);
    setElapsed(0);
  }, [currentIndex, currentQuestion, answers, navigate]);

  useEffect(() => {
    timerRef.current = window.setInterval(() => {
      setElapsed(Math.floor((Date.now() - currentStartTime) / 1000));
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentStartTime]);

  if (!currentQuestion) return null;

  const isLast = currentIndex === currentQuestions.length - 1;
  const isFirst = currentIndex === 0;
  const hasAnswer = inputValue.trim().length > 0;
  const isFav = favoriteIds.includes(currentQuestion.id);
  const answered = results.has(currentQuestion.id);
  const correct = answered && (results.get(currentQuestion.id)?.total ?? 0) >= 70;

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    setAnswer(currentQuestion.id, e.target.value);
  };

  const handleSubmit = () => {
    if (!hasAnswer) return;
    const scoreResult = calculateScore(
      inputValue,
      currentQuestion.targetText,
      currentQuestion.keyWords,
      currentQuestion.sourceLang
    );
    setResult(currentQuestion.id, scoreResult);

    if (isLast) {
      navigate('/result');
    } else {
      nextQuestion();
    }
  };

  const handleSkip = () => {
    if (isLast) {
      navigate('/result');
    } else {
      nextQuestion();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      // 单纯回车也允许提交（textarea中可用 Ctrl+Enter）
    }
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  const displayText = currentQuestion.sourceLang === 'en' ? '英文' : '中文';
  const targetLang = currentQuestion.sourceLang === 'en' ? '中文' : '英文';

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={() => {
              if (confirm('确定要退出当前练习？进度将不会保存。')) {
                navigate('/');
              }
            }}
            className="flex items-center gap-2 text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            返回
          </button>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-primary/70 dark:text-white/70 font-sans text-sm">
              <Clock className="w-4 h-4" />
              {formatTime(elapsed)}
            </div>
            <div className="flex items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold font-sans text-sm">
                {currentIndex + 1}
              </div>
              <span className="text-primary dark:text-white font-sans text-sm">
                / {currentQuestions.length}
              </span>
            </div>
          </div>
        </header>

        {/* 进度条 */}
        <div className="max-w-3xl mx-auto mb-4">
          <div className="h-1.5 bg-primary/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary dark:bg-accent-gold transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-primary/10 dark:bg-white/10 text-primary dark:text-white text-sm font-sans rounded-full">
                {displayText} → {targetLang}
              </span>
              <span className="px-3 py-1 bg-accent-gold/20 text-accent-gold text-sm font-sans rounded-full">
                难度 {currentQuestion.difficulty}
              </span>
              <span className="px-3 py-1 bg-primary/5 dark:bg-white/5 text-primary/70 dark:text-white/70 text-sm font-sans rounded-full">
                {'★'.repeat(currentQuestion.difficulty)}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-sm text-primary/50 dark:text-white/50 font-sans mb-2">请翻译：</p>
              <p className="text-xl md:text-2xl font-serif text-primary dark:text-white leading-relaxed">
                {currentQuestion.sourceText}
              </p>
            </div>

            <div className="relative">
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder={`在此输入${targetLang}翻译...`}
                className="w-full h-36 p-4 border-2 border-primary/20 dark:border-white/20 rounded-xl font-sans text-base md:text-lg resize-none
                           focus:border-primary focus:outline-none transition-colors bg-secondary/30 dark:bg-white/5
                           text-primary dark:text-white placeholder:text-primary/30 dark:placeholder:text-white/30"
              />
              <div className="absolute bottom-3 right-3 text-xs text-primary/40 dark:text-white/40 font-sans">
                Ctrl + Enter 提交
              </div>
            </div>

            {/* 已提交反馈 */}
            {answered && (
              <div className={`mt-4 p-4 rounded-xl border ${
                correct
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
                  : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700'
              }`}>
                <p className={`font-sans text-sm font-bold ${correct ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
                  已提交 · 得分 {results.get(currentQuestion.id)?.total} 分
                </p>
                {showAnswer && (
                  <div className="mt-2">
                    <p className="text-xs text-primary/60 dark:text-white/60 font-sans">参考答案：</p>
                    <p className="font-sans text-primary dark:text-white text-sm">{currentQuestion.targetText}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 工具栏 */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white dark:bg-white/10 text-primary dark:text-white rounded-xl font-sans text-sm hover:bg-primary/5 dark:hover:bg-white/20 transition-colors"
            >
              <Lightbulb className="w-4 h-4 text-accent-gold" />
              {showHint ? '隐藏提示' : '显示提示'}
            </button>
            <button
              onClick={() => setShowAnswer(!showAnswer)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white dark:bg-white/10 text-primary dark:text-white rounded-xl font-sans text-sm hover:bg-primary/5 dark:hover:bg-white/20 transition-colors"
            >
              {showAnswer ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showAnswer ? '隐藏答案' : '显示答案'}
            </button>
            <button
              onClick={() => toggleFavorite(currentQuestion.id)}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl font-sans text-sm transition-colors ${
                isFav
                  ? 'bg-accent-gold/20 text-accent-gold'
                  : 'bg-white dark:bg-white/10 text-primary dark:text-white hover:bg-primary/5 dark:hover:bg-white/20'
              }`}
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-accent-gold' : ''}`} />
              {isFav ? '已收藏' : '收藏'}
            </button>
          </div>

          {showHint && (
            <div className="mb-4 p-3 bg-accent-gold/10 border border-accent-gold/30 rounded-xl">
              <p className="text-sm text-primary dark:text-white font-sans">
                <span className="font-bold">关键词：</span>
                {currentQuestion.keyWords.join('、')}
              </p>
            </div>
          )}

          {showAnswer && !answered && (
            <div className="mb-4 p-3 bg-primary/5 dark:bg-white/10 border border-primary/20 dark:border-white/20 rounded-xl">
              <p className="text-xs text-primary/60 dark:text-white/60 font-sans">参考答案（先思考再对比哦）：</p>
              <p className="font-sans text-primary dark:text-white">{currentQuestion.targetText}</p>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-2">
            <button
              onClick={prevQuestion}
              disabled={isFirst}
              className={`py-3 px-4 rounded-2xl font-sans font-bold transition-all flex items-center justify-center gap-1 ${
                isFirst
                  ? 'bg-primary/10 dark:bg-white/10 text-primary/30 dark:text-white/30 cursor-not-allowed'
                  : 'bg-white dark:bg-white/10 text-primary dark:text-white hover:bg-primary/5 dark:hover:bg-white/20 shadow-md'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleSkip}
              className="py-3 px-4 bg-white dark:bg-white/10 text-primary dark:text-white rounded-2xl font-sans font-bold hover:bg-primary/5 dark:hover:bg-white/20 transition-all flex items-center justify-center gap-1 shadow-md"
            >
              <SkipForward className="w-4 h-4" />
              跳过
            </button>
            <button
              onClick={handleSubmit}
              disabled={!hasAnswer}
              className={`flex-1 py-3 rounded-2xl font-sans font-bold transition-all flex items-center justify-center gap-2 ${
                !hasAnswer
                  ? 'bg-primary/30 dark:bg-white/20 text-white/50 dark:text-white/30 cursor-not-allowed'
                  : 'bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg'
              }`}
            >
              {isLast ? (
                <>
                  查看结果
                  <Send className="w-4 h-4" />
                </>
              ) : (
                <>
                  下一题
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
