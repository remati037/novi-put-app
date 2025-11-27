import { useState, useEffect } from 'react';
import { UserData, ViewType, QuizOption, UrgeLog } from './types';
import { useAuth } from './contexts/AuthContext';
import { userDataService } from './services/userDataService';
import { AuthScreen } from './components/AuthScreen';
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
  const { user, loading: authLoading, signOut } = useAuth();
  const [view, setView] = useState<ViewType>('loading');
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [dataLoading, setDataLoading] = useState(true);

  // Load user data from Supabase when user is authenticated
  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setView('auth');
      setDataLoading(false);
      return;
    }

    // Load user data from Supabase
    const loadUserData = async () => {
      setDataLoading(true);
      try {
        const data = await userDataService.getUserData(user.id);
        if (data) {
          setUserData(data);
          setView(data.isOnboarded ? 'dashboard' : 'intro');
        } else {
          // New user, start with intro
          setUserData(initialUserData);
          setView('intro');
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        setUserData(initialUserData);
        setView('intro');
      } finally {
        setDataLoading(false);
      }
    };

    loadUserData();
  }, [user, authLoading]);

  // Save user data to Supabase whenever it changes
  useEffect(() => {
    if (!user || dataLoading || view === 'auth' || view === 'loading') return;

    // Debounce saves to avoid too many API calls
    const timeoutId = setTimeout(async () => {
      await userDataService.saveUserData(user.id, userData);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [userData, user, dataLoading, view]);

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

  const handleAuthSuccess = () => {
    // After successful auth, data will be loaded in useEffect
    setView('loading');
  };

  // Router
  if (authLoading || (view === 'loading' && dataLoading)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-900">
        <div className="text-white text-xl">Učitavanje...</div>
      </div>
    );
  }

  if (view === 'auth' || !user) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

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
          onSignOut={signOut}
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

