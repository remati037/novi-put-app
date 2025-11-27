import { Home, Calendar, AlertTriangle, Brain, Menu } from 'lucide-react';
import { ViewType } from '../types';

interface BottomNavProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

export const BottomNav = ({ currentView, onViewChange }: BottomNavProps) => (
  <div className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 py-3 px-6 flex justify-between items-center z-50 md:hidden">
    <button onClick={() => onViewChange('dashboard')} className={`flex flex-col items-center ${currentView === 'dashboard' ? 'text-emerald-600' : 'text-slate-400'}`}>
      <Home className="w-6 h-6" />
      <span className="text-[10px] mt-1">Glavna</span>
    </button>
    <button onClick={() => onViewChange('calendar')} className={`flex flex-col items-center ${currentView === 'calendar' ? 'text-emerald-600' : 'text-slate-400'}`}>
      <Calendar className="w-6 h-6" />
      <span className="text-[10px] mt-1">Kalendar</span>
    </button>
    <button onClick={() => onViewChange('urges')} className="flex flex-col items-center -mt-8">
      <div className="bg-rose-500 text-white p-4 rounded-full shadow-lg shadow-rose-500/30">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <span className="text-[10px] mt-1 text-rose-500 font-bold">SOS</span>
    </button>
    <button onClick={() => onViewChange('plan')} className={`flex flex-col items-center ${currentView === 'plan' ? 'text-emerald-600' : 'text-slate-400'}`}>
      <Brain className="w-6 h-6" />
      <span className="text-[10px] mt-1">Plan</span>
    </button>
    <button className={`flex flex-col items-center text-slate-300 cursor-not-allowed`}>
      <Menu className="w-6 h-6" />
      <span className="text-[10px] mt-1">Meni</span>
    </button>
  </div>
);

