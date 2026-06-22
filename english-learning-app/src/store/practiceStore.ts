import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Question, SceneCategory } from '../data/questions';
import { ScoreResult } from '../utils/scorer';

export type PracticeMode = 'en2zh' | 'zh2en' | 'mixed';
export type PracticeSource = 'normal' | 'wrong' | 'favorites';

export interface PracticeRecord {
  id: string;
  questionId: string;
  question: Question;
  userAnswer: string;
  scoreResult: ScoreResult;
  timestamp: number;
}

export interface WeaknessStat {
  weakness: string;
  count: number;
}

export interface CategoryStat {
  category: SceneCategory;
  total: number;
  average: number;
}

export interface UserStats {
  totalPractice: number;
  correctCount: number;
  streak: number;
  lastPracticeDate: string;
  totalScore: number;
  scoredCount: number;
}

export interface SpeakingRecord {
  id: string;
  sentenceId: string;
  sentence: string;
  userTranscript: string;
  similarity: number;
  timestamp: number;
}

export interface DialogueProgress {
  dialogueId: string;
  completedSteps: number;
  totalSteps: number;
  lastTimestamp: number;
  bestScore: number;
}

interface PracticeState {
  // 练习配置
  mode: PracticeMode;
  category: SceneCategory | 'all';
  difficulty: number | 'all';
  questionCount: number;
  source: PracticeSource;

  // 当前练习
  currentQuestions: Question[];
  currentIndex: number;
  answers: Map<string, string>;
  results: Map<string, ScoreResult>;
  startTime: number;
  currentStartTime: number;

  // 历史记录
  records: PracticeRecord[];
  favoriteIds: string[];
  speakingRecords: SpeakingRecord[];
  dialogueProgress: DialogueProgress[];

  // 统计
  stats: UserStats;

  // Actions
  setMode: (mode: PracticeMode) => void;
  setCategory: (category: SceneCategory | 'all') => void;
  setDifficulty: (difficulty: number | 'all') => void;
  setQuestionCount: (count: number) => void;
  setSource: (source: PracticeSource) => void;

  setQuestions: (questions: Question[]) => void;
  setCurrentIndex: (index: number) => void;
  setAnswer: (questionId: string, answer: string) => void;
  setResult: (questionId: string, result: ScoreResult) => void;

  addRecord: (record: PracticeRecord) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  resetPractice: () => void;
  updateStats: () => void;

  toggleFavorite: (questionId: string) => void;
  isFavorite: (questionId: string) => boolean;

  deleteRecord: (recordId: string) => void;
  clearRecords: () => void;
  clearFavorites: () => void;

  getWeaknessStats: () => WeaknessStat[];
  getCategoryStats: () => CategoryStat[];
  getFavoriteQuestions: () => Question[];
  getWrongRecords: () => PracticeRecord[];

  addSpeakingRecord: (record: SpeakingRecord) => void;
  clearSpeakingRecords: () => void;
  updateDialogueProgress: (progress: DialogueProgress) => void;
}

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday.toISOString().split('T')[0];
}

export const usePracticeStore = create<PracticeState>()(
  persist(
    (set, get) => ({
      mode: 'mixed',
      category: 'all',
      difficulty: 'all',
      questionCount: 10,
      source: 'normal',

      currentQuestions: [],
      currentIndex: 0,
      answers: new Map(),
      results: new Map(),
      startTime: 0,
      currentStartTime: 0,

      records: [],
      favoriteIds: [],
      speakingRecords: [],
      dialogueProgress: [],

      stats: {
        totalPractice: 0,
        correctCount: 0,
        streak: 0,
        lastPracticeDate: '',
        totalScore: 0,
        scoredCount: 0,
      },

      setMode: (mode) => set({ mode, source: 'normal' }),
      setCategory: (category) => set({ category, source: 'normal' }),
      setDifficulty: (difficulty) => set({ difficulty, source: 'normal' }),
      setQuestionCount: (questionCount) => set({ questionCount }),
      setSource: (source) => set({ source }),

      setQuestions: (questions) => set({
        currentQuestions: questions,
        currentIndex: 0,
        answers: new Map(),
        results: new Map(),
        startTime: Date.now(),
        currentStartTime: Date.now(),
      }),

      setCurrentIndex: (index) => set({ currentIndex: index, currentStartTime: Date.now() }),

      setAnswer: (questionId, answer) => {
        const answers = new Map(get().answers);
        answers.set(questionId, answer);
        set({ answers });
      },

      setResult: (questionId, result) => {
        const results = new Map(get().results);
        results.set(questionId, result);
        set({ results });
      },

      addRecord: (record) => {
        const records = [...get().records, record];
        set({ records });
      },

      nextQuestion: () => {
        const { currentIndex, currentQuestions } = get();
        if (currentIndex < currentQuestions.length - 1) {
          set({ currentIndex: currentIndex + 1, currentStartTime: Date.now() });
        }
      },

      prevQuestion: () => {
        const { currentIndex } = get();
        if (currentIndex > 0) {
          set({ currentIndex: currentIndex - 1, currentStartTime: Date.now() });
        }
      },

      resetPractice: () => set({
        currentQuestions: [],
        currentIndex: 0,
        answers: new Map(),
        results: new Map(),
        startTime: 0,
        currentStartTime: 0,
      }),

      updateStats: () => {
        const { stats, results } = get();
        const today = getToday();
        const lastDate = stats.lastPracticeDate;

        let newStreak = stats.streak;
        if (lastDate === today) {
          // 同一天不增加 streak
        } else if (lastDate === getYesterday()) {
          newStreak = stats.streak + 1;
        } else {
          newStreak = 1;
        }

        const allResults = Array.from(results.values());
        const newCorrect = allResults.filter(r => r.total >= 70).length;
        const sumScore = allResults.reduce((s, r) => s + r.total, 0);

        set({
          stats: {
            totalPractice: stats.totalPractice + allResults.length,
            correctCount: stats.correctCount + newCorrect,
            streak: newStreak,
            lastPracticeDate: today,
            totalScore: stats.totalScore + sumScore,
            scoredCount: stats.scoredCount + allResults.length,
          }
        });
      },

      toggleFavorite: (questionId) => {
        const { favoriteIds } = get();
        if (favoriteIds.includes(questionId)) {
          set({ favoriteIds: favoriteIds.filter(id => id !== questionId) });
        } else {
          set({ favoriteIds: [...favoriteIds, questionId] });
        }
      },

      isFavorite: (questionId) => {
        return get().favoriteIds.includes(questionId);
      },

      deleteRecord: (recordId) => {
        set({ records: get().records.filter(r => r.id !== recordId) });
      },

      clearRecords: () => set({ records: [] }),
      clearFavorites: () => set({ favoriteIds: [] }),

      getWeaknessStats: () => {
        const { records } = get();
        const weaknessMap = new Map<string, number>();
        records.forEach(r => {
          r.scoreResult.weaknesses.forEach(w => {
            // 提取关键词
            const keywords = w.match(/[a-zA-Z]+/g) || [];
            const tag = keywords[0] || w.slice(0, 10);
            weaknessMap.set(tag, (weaknessMap.get(tag) || 0) + 1);
          });
        });
        return Array.from(weaknessMap.entries())
          .map(([weakness, count]) => ({ weakness, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 8);
      },

      getCategoryStats: () => {
        const { records } = get();
        const categoryMap = new Map<SceneCategory, { total: number; sum: number; count: number }>();
        records.forEach(r => {
          const cat = r.question.category;
          if (!categoryMap.has(cat)) {
            categoryMap.set(cat, { total: 0, sum: 0, count: 0 });
          }
          const stat = categoryMap.get(cat)!;
          stat.total += 1;
          stat.sum += r.scoreResult.total;
          stat.count += 1;
        });
        return Array.from(categoryMap.entries())
          .map(([category, stat]) => ({
            category,
            total: stat.total,
            average: stat.count > 0 ? Math.round(stat.sum / stat.count) : 0,
          }))
          .sort((a, b) => b.total - a.total);
      },

      getFavoriteQuestions: () => {
        const { favoriteIds, records } = get();
        // 从历史记录中找已练习过的题目
        const recordMap = new Map<string, PracticeRecord>();
        records.forEach(r => recordMap.set(r.questionId, r));
        return favoriteIds
          .map(id => recordMap.get(id)?.question)
          .filter((q): q is Question => Boolean(q));
      },

      getWrongRecords: () => {
        return get().records.filter(r => r.scoreResult.total < 70);
      },

      addSpeakingRecord: (record) => {
        const records = [record, ...get().speakingRecords].slice(0, 200);
        set({ speakingRecords: records });
      },

      clearSpeakingRecords: () => set({ speakingRecords: [] }),

      updateDialogueProgress: (progress) => {
        const list = get().dialogueProgress.filter(p => p.dialogueId !== progress.dialogueId);
        const existing = get().dialogueProgress.find(p => p.dialogueId === progress.dialogueId);
        const bestScore = Math.max(progress.bestScore, existing?.bestScore || 0);
        set({
          dialogueProgress: [...list, { ...progress, bestScore }]
        });
      },
    }),
    {
      name: 'english-learning-storage',
      partialize: (state) => ({
        mode: state.mode,
        category: state.category,
        difficulty: state.difficulty,
        questionCount: state.questionCount,
        records: state.records,
        favoriteIds: state.favoriteIds,
        stats: state.stats,
        speakingRecords: state.speakingRecords,
        dialogueProgress: state.dialogueProgress,
      }),
    }
  )
);
