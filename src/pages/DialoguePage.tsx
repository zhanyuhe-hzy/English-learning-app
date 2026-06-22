import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX, RefreshCw, ChevronRight, Award, Sparkles, Lightbulb } from 'lucide-react';
import { dialogues, dialogueScenes, Dialogue, DialogueOption, DialogueLine } from '../data/dialogues';
import { speak, stopSpeaking } from '../utils/speech';
import { usePracticeStore } from '../store/practiceStore';

export default function DialoguePage() {
  const navigate = useNavigate();
  const { updateDialogueProgress, dialogueProgress } = usePracticeStore();
  const [activeScene, setActiveScene] = useState<string>('all');
  const [currentDialogue, setCurrentDialogue] = useState<Dialogue | null>(null);
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; message: string; option: DialogueOption } | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [completed, setCompleted] = useState(false);

  const filtered = activeScene === 'all'
    ? dialogues
    : dialogues.filter(d => d.level === activeScene);

  useEffect(() => {
    return () => stopSpeaking();
  }, []);

  const handleStartDialogue = (d: Dialogue) => {
    setCurrentDialogue(d);
    setStep(0);
    setFeedback(null);
    setScore(0);
    setTotalAnswered(0);
    setCompleted(false);
  };

  const handleExit = () => {
    if (currentDialogue && totalAnswered > 0) {
      const myTurnLines = currentDialogue.lines.filter(l => l.speaker === 'me').length;
      const accuracy = myTurnLines > 0 ? Math.round((score / myTurnLines) * 100) : 0;
      updateDialogueProgress({
        dialogueId: currentDialogue.id,
        completedSteps: step,
        totalSteps: currentDialogue.lines.length,
        lastTimestamp: Date.now(),
        bestScore: accuracy,
      });
    }
    setCurrentDialogue(null);
  };

  const handlePlay = async (text: string) => {
    if (isPlaying) {
      stopSpeaking();
      setIsPlaying(false);
      return;
    }
    setIsPlaying(true);
    try {
      await speak(text, { lang: 'en-US', rate: 0.85 });
    } catch {
      // 忽略播放错误
    }
    setIsPlaying(false);
  };

  const handleOption = (option: DialogueOption) => {
    if (feedback) return;
    const correct = option.isCorrect === true;
    if (correct) {
      setScore(s => s + 1);
    }
    setTotalAnswered(t => t + 1);
    setFeedback({
      isCorrect: correct,
      message: option.feedback || (correct ? '✅ 正确' : '⚠️ 不太合适'),
      option,
    });
  };

  const handleNext = () => {
    if (!currentDialogue) return;
    setFeedback(null);
    if (step >= currentDialogue.lines.length - 1) {
      // 完成
      setCompleted(true);
      const myTurnLines = currentDialogue.lines.filter(l => l.speaker === 'me').length;
      const accuracy = myTurnLines > 0 ? Math.round((score / myTurnLines) * 100) : 0;
      updateDialogueProgress({
        dialogueId: currentDialogue.id,
        completedSteps: currentDialogue.lines.length,
        totalSteps: currentDialogue.lines.length,
        lastTimestamp: Date.now(),
        bestScore: accuracy,
      });
    } else {
      setStep(step + 1);
    }
  };

  const handleRestart = () => {
    if (!currentDialogue) return;
    setStep(0);
    setFeedback(null);
    setScore(0);
    setTotalAnswered(0);
    setCompleted(false);
  };

  // 列表页
  if (!currentDialogue) {
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
              <h1 className="font-serif text-3xl font-bold text-primary dark:text-white mb-2">情景对话</h1>
              <p className="text-sm text-primary/60 dark:text-white/60 font-sans">在真实场景中练习英语口语</p>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
              {dialogueScenes.map(s => (
                <button
                  key={s.id}
                  onClick={() => setActiveScene(s.id)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-sans transition-all ${
                    activeScene === s.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white dark:bg-white/10 text-primary dark:text-white'
                  }`}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filtered.map(d => {
                const progress = dialogueProgress.find(p => p.dialogueId === d.id);
                return (
                  <button
                    key={d.id}
                    onClick={() => handleStartDialogue(d)}
                    className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-2xl shadow-md p-5 text-left hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="text-3xl">{d.emoji}</div>
                      <span className="text-xs font-sans px-2 py-0.5 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded">
                        {d.level}
                      </span>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-primary dark:text-white mb-1">{d.title}</h3>
                    <p className="text-sm text-primary/60 dark:text-white/60 font-sans mb-2">{d.titleCn}</p>
                    <p className="text-xs text-primary/70 dark:text-white/70 font-sans mb-3">{d.description}</p>
                    {progress && progress.bestScore > 0 && (
                      <div className="flex items-center gap-2 text-xs">
                        <Award className="w-3.5 h-3.5 text-accent-gold" />
                        <span className="font-sans text-primary/70 dark:text-white/70">最高得分：{progress.bestScore} 分</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 完成页
  if (completed) {
    const myTurnLines = currentDialogue.lines.filter(l => l.speaker === 'me').length;
    const accuracy = myTurnLines > 0 ? Math.round((score / myTurnLines) * 100) : 0;
    return (
      <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 text-center">
              <div className="text-6xl mb-3">{accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '💪'}</div>
              <h1 className="font-serif text-2xl font-bold text-primary dark:text-white mb-2">对话完成！</h1>
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary-light text-white my-4">
                <div>
                  <div className="text-4xl font-bold font-serif">{accuracy}</div>
                  <div className="text-xs opacity-80">分</div>
                </div>
              </div>
              <p className="text-sm text-primary/60 dark:text-white/60 font-sans mb-6">
                正确率 {score}/{myTurnLines} · {accuracy >= 80 ? '太棒了！' : accuracy >= 60 ? '继续加油！' : '多练几次会更好！'}
              </p>

              {currentDialogue.keyPhrases && (
                <div className="bg-primary/5 dark:bg-white/5 rounded-xl p-4 mb-4 text-left">
                  <p className="text-sm font-sans font-bold text-primary dark:text-white mb-2 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-accent-gold" />
                    关键短语
                  </p>
                  <ul className="space-y-1">
                    {currentDialogue.keyPhrases.map((p, i) => (
                      <li key={i} className="text-sm font-sans text-primary/80 dark:text-white/80">· {p}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleRestart}
                  className="py-3 bg-white dark:bg-white/10 border-2 border-primary/30 dark:border-white/30 text-primary dark:text-white rounded-2xl font-sans font-bold flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  再来一次
                </button>
                <button
                  onClick={handleExit}
                  className="py-3 bg-primary text-white rounded-2xl font-sans font-bold"
                >
                  返回列表
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 对话练习页
  const currentLine: DialogueLine = currentDialogue.lines[step];
  const isMyTurn = currentLine.speaker === 'me';

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary via-secondary to-primary/10 dark:from-primary-dark dark:via-primary-dark dark:to-primary">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <header className="flex items-center justify-between mb-6">
          <button
            onClick={handleExit}
            className="flex items-center gap-2 text-primary/70 dark:text-white/70 hover:text-primary dark:hover:text-white transition-colors font-sans"
          >
            <ArrowLeft className="w-5 h-5" />
            退出
          </button>
          <div className="text-center">
            <p className="text-sm font-sans font-bold text-primary dark:text-white">{currentDialogue.title}</p>
            <p className="text-xs text-primary/60 dark:text-white/60 font-sans">
              {step + 1} / {currentDialogue.lines.length}
            </p>
          </div>
          <div className="text-xs font-sans px-2 py-1 bg-primary/10 dark:bg-white/10 text-primary dark:text-white rounded">
            ✓ {score}
          </div>
        </header>

        {/* 进度条 */}
        <div className="max-w-2xl mx-auto mb-4">
          <div className="h-1.5 bg-primary/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary dark:bg-accent-gold transition-all"
              style={{ width: `${((step + 1) / currentDialogue.lines.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-white/5 dark:backdrop-blur-sm rounded-3xl shadow-xl p-6 md:p-8 mb-4 min-h-[280px]">
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                isMyTurn
                  ? 'bg-primary text-white'
                  : 'bg-accent-gold/20 text-accent-gold'
              }`}>
                {isMyTurn ? '🙋' : currentDialogue.emoji}
              </div>
              <div>
                <p className="text-xs text-primary/60 dark:text-white/60 font-sans">
                  {isMyTurn ? '轮到你' : '对方'}
                </p>
                <p className="text-sm font-sans font-bold text-primary dark:text-white">
                  {isMyTurn ? 'You' : currentDialogue.titleCn}
                </p>
              </div>
            </div>

            <div className="bg-primary/5 dark:bg-white/5 rounded-2xl p-4 mb-3">
              <p className="text-xl md:text-2xl font-serif text-primary dark:text-white leading-relaxed mb-2">
                {currentLine.text}
              </p>
              <p className="text-sm text-primary/60 dark:text-white/60 font-sans">{currentLine.textCn}</p>
            </div>

            {!isMyTurn && (
              <button
                onClick={() => handlePlay(currentLine.text)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-sans text-sm transition-all ${
                  isPlaying
                    ? 'bg-accent-gold text-white'
                    : 'bg-primary/10 dark:bg-white/10 text-primary dark:text-white hover:bg-primary/20 dark:hover:bg-white/20'
                }`}
              >
                {isPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                {isPlaying ? '停止' : '听一听'}
              </button>
            )}

            {isMyTurn && currentLine.hint && !feedback && (
              <div className="flex items-center gap-2 text-sm text-primary/70 dark:text-white/70 font-sans mb-3 px-1">
                <Lightbulb className="w-4 h-4 text-accent-gold" />
                <span>提示：{currentLine.hint}</span>
              </div>
            )}

            {isMyTurn && currentLine.options && !feedback && (
              <div className="space-y-2 mt-4">
                {currentLine.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleOption(opt)}
                    className="w-full text-left p-3 bg-white dark:bg-white/5 border-2 border-primary/20 dark:border-white/20 rounded-xl hover:border-primary dark:hover:border-white/40 transition-all"
                  >
                    <p className="font-sans text-primary dark:text-white">{opt.text}</p>
                    <p className="text-xs text-primary/60 dark:text-white/60 font-sans mt-0.5">{opt.textCn}</p>
                  </button>
                ))}
              </div>
            )}

            {feedback && (
              <div className={`p-3 rounded-xl border-2 ${
                feedback.isCorrect
                  ? 'bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-700'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-300 dark:border-yellow-700'
              }`}>
                <p className={`font-sans font-bold mb-1 ${feedback.isCorrect ? 'text-green-700 dark:text-green-300' : 'text-yellow-700 dark:text-yellow-300'}`}>
                  {feedback.message}
                </p>
                {feedback.isCorrect && (
                  <p className="text-sm font-sans text-primary dark:text-white mt-2">
                    "{feedback.option.text}" — {feedback.option.textCn}
                  </p>
                )}
                {!feedback.isCorrect && (
                  <p className="text-sm font-sans text-primary dark:text-white mt-2">
                    ✓ 推荐回答："{feedback.option.text}" — {feedback.option.textCn}
                  </p>
                )}
              </div>
            )}
          </div>

          {feedback && (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-primary text-white rounded-2xl font-sans font-bold shadow-md hover:bg-primary-light transition-all flex items-center justify-center gap-2"
            >
              {step >= currentDialogue.lines.length - 1 ? '查看成绩' : '继续对话'}
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {/* 文化贴士 */}
          {currentDialogue.cultureNote && step === 0 && (
            <div className="mt-4 p-3 bg-accent-gold/10 border border-accent-gold/30 rounded-xl">
              <p className="text-xs font-sans font-bold text-accent-gold mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                文化小贴士
              </p>
              <p className="text-sm font-sans text-primary dark:text-white">{currentDialogue.cultureNote}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
