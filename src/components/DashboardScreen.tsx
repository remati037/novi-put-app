import { AlertTriangle, BookOpen, Calendar, Zap, LogOut } from 'lucide-react';
import { UserData, ViewType } from '../types';
import { calculateStreak, getAdvice } from '../utils/helpers';

interface DashboardScreenProps {
  userData: UserData;
  onViewChange: (view: ViewType) => void;
  onResetStreak: () => void;
  onSignOut: () => Promise<void>;
}

export const DashboardScreen = ({ userData, onViewChange, onResetStreak, onSignOut }: DashboardScreenProps) => {
  const days = calculateStreak(userData.streakStart);
  const advice = getAdvice(userData.quizAnswers);

  const handleSignOut = async () => {
    if (window.confirm('Da li ste sigurni da želite da se odjavite?')) {
      await onSignOut();
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-md mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Zdravo, Borče</h1>
          <p className="text-slate-500 text-sm">Svaki dan je nova pobeda.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onViewChange('urges')} className="bg-rose-100 text-rose-600 p-2 rounded-full hover:bg-rose-200 transition-colors">
            <AlertTriangle className="w-6 h-6" />
          </button>
          <button onClick={handleSignOut} className="bg-slate-100 text-slate-600 p-2 rounded-full hover:bg-slate-200 transition-colors" title="Odjavi se">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 text-center text-white shadow-xl shadow-slate-900/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500/10 rounded-full -ml-12 -mb-12 blur-xl"></div>
        
        <h3 className="text-slate-400 text-sm uppercase tracking-wider font-semibold mb-2">Trenutni Niz</h3>
        <div className="text-7xl font-bold text-emerald-400 mb-2 font-mono">{days}</div>
        <div className="text-xl text-slate-300">Dana Čist</div>
        
        <button 
          onClick={onResetStreak}
          className="mt-6 text-xs text-slate-500 hover:text-rose-400 underline decoration-dotted"
        >
          Resetuj niz (Dogodio se relaps)
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button onClick={() => onViewChange('plan')} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <BookOpen className="w-5 h-5" />
          </div>
          <span className="font-semibold text-slate-700">Moj Plan</span>
        </button>
        
        <button onClick={() => onViewChange('calendar')} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
            <Calendar className="w-5 h-5" />
          </div>
          <span className="font-semibold text-slate-700">Istorija</span>
        </button>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl">
        <div className="flex gap-3 items-start">
          <Zap className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
          <div>
            <h4 className="font-bold text-emerald-800 mb-1">Dnevni Savet</h4>
            <p className="text-emerald-700 text-sm leading-relaxed">
              {advice[0] || "Najbolji način da se oduprete iskušenju je da ne budete u situaciji gde se ono javlja. Izađite napolje."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

