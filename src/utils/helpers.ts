import { QuizOption, UserData } from '../types';

export const getAdvice = (answers: Record<number, QuizOption>): string[] => {
  const adviceList = [
    "Instalirajte blokator sadržaja na svim uređajima.",
    "Napravite jutarnju rutinu bez telefona u prvih sat vremena.",
  ];

  // Logika na osnovu odgovora
  const triggerAnswer = answers[1]; // Pitanje o okidačima
  const timeAnswer = answers[2];    // Pitanje o vremenu

  if (triggerAnswer?.type === 'stress') {
    adviceList.push("Vežbe disanja (Box Breathing) kod stresa.");
    adviceList.push("Fizička aktivnost visokog intenziteta.");
  } else if (triggerAnswer?.type === 'boredom') {
    adviceList.push("Lista 5 hobija za trenutke dosade.");
    adviceList.push("Zabrana telefona u toaletu.");
  }

  if (timeAnswer?.type === 'night') {
    adviceList.push("Telefon ostaje van spavaće sobe noću.");
    adviceList.push("Čitanje fizičke knjige pre spavanja.");
  } else if (timeAnswer?.type === 'morning') {
    adviceList.push("Ustajanje iz kreveta odmah po buđenju.");
    adviceList.push("Hladan tuš ujutru za dopamin.");
  }

  return adviceList;
};

export const calculateRiskScore = (answers: Record<number, QuizOption>): number => {
  let totalScore = 0;
  Object.values(answers).forEach(ans => {
    if (ans.score !== undefined) {
      totalScore += ans.score;
    }
  });
  return totalScore;
};

export const getRiskLevel = (score: number) => {
  if (score <= 5) return { 
    level: 'Nizak', 
    color: 'text-emerald-500', 
    bg: 'bg-emerald-100', 
    description: "Vaše navike su pod kontrolom, ali oprez je uvek dobrodošao." 
  };
  if (score <= 10) return { 
    level: 'Srednji', 
    color: 'text-orange-500', 
    bg: 'bg-orange-100', 
    description: "Postoje jasni znaci problematičnog ponašanja. Pravo je vreme za promenu." 
  };
  return { 
    level: 'Visok', 
    color: 'text-rose-600', 
    bg: 'bg-rose-100', 
    description: "Vaši odgovori ukazuju na ozbiljnu zavisnost koja utiče na kvalitet života. Potrebna je hitna akcija." 
  };
};

export const calculateStreak = (streakStart: string | null): number => {
  if (!streakStart) return 0;
  const start = new Date(streakStart);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - start.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  return diffDays;
};

export const loadUserData = (): UserData | null => {
  const saved = localStorage.getItem('noviPutData');
  if (saved) {
    return JSON.parse(saved);
  }
  return null;
};

export const saveUserData = (userData: UserData): void => {
  localStorage.setItem('noviPutData', JSON.stringify(userData));
};

