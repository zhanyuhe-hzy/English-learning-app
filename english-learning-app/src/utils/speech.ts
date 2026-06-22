// Web Speech API 封装 - 浏览器原生 TTS 和 STT

export interface SpeechOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
  volume?: number;
  voice?: SpeechSynthesisVoice;
}

// Web Speech API 内部类型扩展
interface SpeechRecognitionAlternative {
  readonly transcript: string;
  readonly confidence: number;
}

interface SpeechRecognitionResultItem {
  readonly isFinal: boolean;
  readonly length: number;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionResultList {
  readonly length: number;
  [index: number]: SpeechRecognitionResultItem;
}

interface SpeechRecognitionResultEvent {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent {
  readonly error: string;
  readonly message?: string;
}

export type { SpeechRecognitionErrorEvent };

export interface SpeechRecognizer {
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionResultEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

let cachedVoices: SpeechSynthesisVoice[] = [];

// 加载语音列表
function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      resolve([]);
      return;
    }
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }
    // 等待 voiceschanged 事件
    const handler = () => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    };
    window.speechSynthesis.addEventListener('voiceschanged', handler, { once: true });
    // 兜底超时
    setTimeout(() => {
      cachedVoices = window.speechSynthesis.getVoices();
      resolve(cachedVoices);
    }, 1500);
  });
}

// 选择最佳英语语音
export function getBestEnglishVoice(): SpeechSynthesisVoice | null {
  if (cachedVoices.length === 0) return null;
  // 优先美式英语，再英式英语
  const usVoice = cachedVoices.find(v => v.lang === 'en-US' && v.localService);
  if (usVoice) return usVoice;
  const anyUS = cachedVoices.find(v => v.lang === 'en-US');
  if (anyUS) return anyUS;
  const gbVoice = cachedVoices.find(v => v.lang === 'en-GB');
  if (gbVoice) return gbVoice;
  const enVoice = cachedVoices.find(v => v.lang.startsWith('en'));
  return enVoice || null;
}

export function getBestChineseVoice(): SpeechSynthesisVoice | null {
  if (cachedVoices.length === 0) return null;
  const zhVoice = cachedVoices.find(v => v.lang === 'zh-CN' && v.localService);
  if (zhVoice) return zhVoice;
  const anyZh = cachedVoices.find(v => v.lang === 'zh-CN');
  if (anyZh) return anyZh;
  const anyZhLang = cachedVoices.find(v => v.lang.startsWith('zh'));
  return anyZhLang || null;
}

// TTS 朗读
export async function speak(text: string, options: SpeechOptions = {}): Promise<void> {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    throw new Error('当前浏览器不支持语音合成');
  }
  if (cachedVoices.length === 0) {
    await loadVoices();
  }

  // 取消之前未完成
  window.speechSynthesis.cancel();

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = options.lang || 'en-US';
  utter.rate = options.rate ?? 0.9;
  utter.pitch = options.pitch ?? 1.0;
  utter.volume = options.volume ?? 1.0;
  if (options.voice) {
    utter.voice = options.voice;
  } else {
    const defaultVoice = utter.lang.startsWith('en')
      ? getBestEnglishVoice()
      : getBestChineseVoice();
    if (defaultVoice) utter.voice = defaultVoice;
  }

  return new Promise((resolve, reject) => {
    utter.onend = () => resolve();
    utter.onerror = (e) => {
      // 主动 cancel 不算错误
      if (e.error === 'canceled' || e.error === 'interrupted') {
        resolve();
      } else {
        reject(e);
      }
    };
    window.speechSynthesis.speak(utter);
  });
}

// 停止朗读
export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}

interface SpeechRecognitionConstructor {
  new (): SpeechRecognizer;
}

function getSpeechRecognitionCtor(): SpeechRecognitionConstructor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as Record<string, unknown>;
  const SR = (w['SpeechRecognition'] || w['webkitSpeechRecognition']) as
    | SpeechRecognitionConstructor
    | undefined;
  return SR ?? null;
}

export function isRecognitionSupported(): boolean {
  return getSpeechRecognitionCtor() !== null;
}

export function createRecognizer(options: { lang?: string } = {}): SpeechRecognizer | null {
  const SR = getSpeechRecognitionCtor();
  if (!SR) return null;
  const recognizer = new SR();
  recognizer.lang = options.lang || 'en-US';
  recognizer.interimResults = true;
  recognizer.maxAlternatives = 1;
  recognizer.continuous = false;
  return recognizer;
}

// 启动语音识别
export function startRecognition(
  recognizer: SpeechRecognizer | null,
  onResult: (text: string, isFinal: boolean, confidence: number) => void,
  onError: (err: SpeechRecognitionErrorEvent) => void,
  onEnd: () => void
): void {
  if (!recognizer) {
    onError({ error: 'not-supported' });
    return;
  }

  recognizer.onresult = (event) => {
    let finalText = '';
    let interimText = '';
    let confidence = 0;
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const result = event.results[i];
      if (result.isFinal) {
        finalText += result[0].transcript;
        confidence = result[0].confidence;
      } else {
        interimText += result[0].transcript;
      }
    }
    const text = finalText || interimText;
    onResult(text, !!finalText, confidence);
  };
  recognizer.onerror = onError;
  recognizer.onend = onEnd;
  recognizer.start();
}

// 计算跟读相似度（基于字符级 Levenshtein）
export function calculateSpeechSimilarity(reference: string, recognized: string): number {
  const normalize = (s: string) => s.toLowerCase()
    .replace(/[.,!?;:"']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const ref = normalize(reference);
  const rec = normalize(recognized);
  if (!ref || !rec) return 0;
  if (ref === rec) return 100;

  // 简单的单词级匹配
  const refWords = ref.split(' ').filter(Boolean);
  const recWords = new Set(rec.split(' ').filter(Boolean));
  let matched = 0;
  refWords.forEach(w => {
    if (recWords.has(w)) matched++;
  });
  const wordAccuracy = (matched / refWords.length) * 100;

  // 字符级相似度
  const charSim = levenshteinSim(ref, rec);

  // 加权：单词级 60% + 字符级 40%
  return Math.round(wordAccuracy * 0.6 + charSim * 0.4);
}

function levenshteinSim(a: string, b: string): number {
  const m = a.length, n = b.length;
  if (m === 0 || n === 0) return 0;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (a[i - 1] === b[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }
  const distance = dp[m][n];
  return Math.round((1 - distance / Math.max(m, n)) * 100);
}

// 高亮差异
export function getDiffWords(reference: string, recognized: string): { word: string; matched: boolean }[] {
  const ref = reference.toLowerCase().replace(/[.,!?;:"']/g, '').split(/\s+/).filter(Boolean);
  const recSet = new Set(recognized.toLowerCase().replace(/[.,!?;:"']/g, '').split(/\s+/).filter(Boolean));
  return ref.map(w => ({ word: w, matched: recSet.has(w) }));
}
