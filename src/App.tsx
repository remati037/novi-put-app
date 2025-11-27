import { useState, useEffect } from 'react';
import { UserData, ViewType, QuizOption, UrgeLog } from './types';
import { loadUserData, saveUserData } from './utils/helpers';
import { IntroScreen } from './components/IntroScreen';
import { QuizScreen } from './components/QuizScreen';
import { AnalysisScreen } from './components/AnalysisScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { UrgesScreen } from './components/UrgesScreen';
import { PlanScreen } from './components/PlanScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { BottomNav } from './components/BottomNav';

const initialUserData: UserData = {
  name: '',
  streakStart: null,
  lastCheckIn: null,
  relapseDate: null,
  urgeHistory: [],
  quizAnswers: {},
  planProgress: [],
  isOnboarded: false
};

export default function App() {
  const [view, setView] = useState<ViewType>('loading');
  const [userData, setUserData] = useState<UserData>(initialUserData);

  useEffect(() => {
    const saved = loadUserData();
    if (saved) {
      setUserData(saved);
      setView(saved.isOnboarded ? 'dashboard' : 'intro');
    } else {
      setView('intro');
    }
  }, []);

  useEffect(() => {
    saveUserData(userData);
  }, [userData]);

  const handleResetStreak = () => {
    if (window.confirm("Da li ste sigurni da želite da resetujete niz? Iskrenost je ključ oporavka.")) {
      setUserData({
        ...userData,
        streakStart: new Date().toISOString(),
        relapseDate: new Date().toISOString()
      });
    }
  };

  const handleUrgeLog = (intensity: number) => {
    const newLog: UrgeLog = {
      date: new Date().toISOString(),
      intensity: intensity,
      resisted: true 
    };
    setUserData({
      ...userData,
      urgeHistory: [newLog, ...userData.urgeHistory]
    });
    window.alert("Iskušenje zabeleženo. Bravo što ste ostali jaki!");
  };

  const handleQuizComplete = (answers: Record<number, QuizOption>) => {
    setUserData({
      ...userData,
      quizAnswers: answers,
      isOnboarded: false 
    });
    setView('analysis');
  };

  const handleStartJourney = () => {
    setUserData({
      ...userData,
      isOnboarded: true,
      streakStart: new Date().toISOString()
    });
    setView('dashboard');
  };

  const handleTogglePlanItem = (itemText: string) => {
    const checkedItems = userData.planProgress || [];
    let newChecked: string[];
    if (checkedItems.includes(itemText)) {
      newChecked = checkedItems.filter(i => i !== itemText);
    } else {
      newChecked = [...checkedItems, itemText];
    }
    setUserData({ ...userData, planProgress: newChecked });
  };

  // Router
  if (view === 'loading') return null;
  if (view === 'intro') return <IntroScreen onStart={() => setView('quiz')} />;
  if (view === 'quiz') return <QuizScreen onComplete={handleQuizComplete} />;
  if (view === 'analysis') return (
    <AnalysisScreen 
      userData={userData} 
      onStartJourney={handleStartJourney} 
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {view === 'dashboard' && (
        <DashboardScreen 
          userData={userData}
          onViewChange={setView}
          onResetStreak={handleResetStreak}
        />
      )}
      {view === 'calendar' && (
        <CalendarScreen 
          userData={userData}
          onViewChange={setView}
        />
      )}
      {view === 'urges' && (
        <UrgesScreen 
          userData={userData}
          onViewChange={setView}
          onUrgeLog={handleUrgeLog}
        />
      )}
      {view === 'plan' && (
        <PlanScreen 
          userData={userData}
          onViewChange={setView}
          onTogglePlanItem={handleTogglePlanItem}
        />
      )}
      
      {userData.isOnboarded && <BottomNav currentView={view} onViewChange={setView} />}
    </div>
  );
}

