import { ChevronRight } from 'lucide-react';
import { UserData, ViewType } from '../types';

interface CalendarScreenProps {
  userData: UserData;
  onViewChange: (view: ViewType) => void;
}

export const CalendarScreen = ({ userData, onViewChange }: CalendarScreenProps) => {
  const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();
  const today = new Date().getDate();
  
  const getDayStatus = (day: number) => {
    if (day > today) return 'future';
    const relapse = userData.relapseDate ? new Date(userData.relapseDate).getDate() : -1;
    const startMonth = userData.streakStart ? new Date(userData.streakStart).getMonth() : -1;
    const currentMonth = new Date().getMonth();

    if (startMonth === currentMonth && userData.streakStart && day < new Date(userData.streakStart).getDate()) return 'neutral';
    if (userData.relapseDate && new Date(userData.relapseDate).getMonth() === currentMonth && day === relapse) return 'relapse';
    
    return 'clean';
  };

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => onViewChange('dashboard')} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Kalendar Uspeha</h2>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-center font-bold text-slate-800 mb-6 text-lg">Ovaj Mesec</h3>
        <div className="grid grid-cols-7 gap-2">
          {['P', 'U', 'S', 'Č', 'P', 'S', 'N'].map((d, i) => (
            <div key={i} className="text-center text-xs text-slate-400 font-bold mb-2">{d}</div>
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const status = getDayStatus(day);
            let bgClass = "bg-slate-50 text-slate-400";
            if (status === 'clean') bgClass = "bg-emerald-100 text-emerald-700 font-bold";
            if (status === 'relapse') bgClass = "bg-rose-500 text-white font-bold";
            if (status === 'future') bgClass = "opacity-30";
            if (day === today) bgClass += " ring-2 ring-blue-500 ring-offset-2";

            return (
              <div key={day} className={`aspect-square rounded-lg flex items-center justify-center text-sm ${bgClass}`}>
                {day}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
};

