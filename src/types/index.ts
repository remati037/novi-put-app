export interface QuizOption {
  text: string;
  score?: number;
  type?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface UrgeLog {
  date: string;
  intensity: number;
  resisted: boolean;
}

export interface UserData {
  name: string;
  streakStart: string | null;
  lastCheckIn: string | null;
  relapseDate: string | null;
  urgeHistory: UrgeLog[];
  quizAnswers: Record<number, QuizOption>;
  planProgress: string[];
  isOnboarded: boolean;
}

export type ViewType = 'loading' | 'intro' | 'quiz' | 'analysis' | 'dashboard' | 'calendar' | 'urges' | 'plan';

