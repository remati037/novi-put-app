import { ChevronRight, CheckSquare, Square } from 'lucide-react';
import { UserData, ViewType } from '../types';
import { getAdvice } from '../utils/helpers';

interface PlanScreenProps {
  userData: UserData;
  onViewChange: (view: ViewType) => void;
  onTogglePlanItem: (itemText: string) => void;
}

export const PlanScreen = ({ userData, onViewChange, onTogglePlanItem }: PlanScreenProps) => {
  const recommendations = getAdvice(userData.quizAnswers);
  const checkedItems = userData.planProgress || [];
  
  const completedCount = recommendations.filter(r => checkedItems.includes(r)).length;
  const totalCount = recommendations.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => onViewChange('dashboard')} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">Dnevni Plan</h2>
      </div>
      
      <p className="text-slate-500 mb-4 text-sm">Obeležite aktivnosti koje ste danas sproveli u delo kako bi izgradili nove navike.</p>

      <div className="space-y-3 flex-1">
        {recommendations.map((rec, idx) => {
          const isChecked = checkedItems.includes(rec);
          return (
            <div 
              key={idx} 
              onClick={() => onTogglePlanItem(rec)}
              className={`p-4 rounded-xl shadow-sm border cursor-pointer transition-all flex gap-4 items-center ${
                isChecked 
                ? 'bg-emerald-50 border-emerald-200' 
                : 'bg-white border-slate-100 hover:border-blue-200'
              }`}
            >
              <div className={`shrink-0 transition-colors ${isChecked ? 'text-emerald-600' : 'text-slate-300'}`}>
                {isChecked ? <CheckSquare className="w-6 h-6" /> : <Square className="w-6 h-6" />}
              </div>
              <p className={`leading-relaxed font-medium transition-colors ${isChecked ? 'text-emerald-800 line-through opacity-70' : 'text-slate-700'}`}>
                {rec}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-white border border-slate-200 p-6 rounded-2xl shadow-sm">
        <div className="flex justify-between items-end mb-2">
          <span className="text-slate-500 font-bold text-sm uppercase tracking-wide">Vaš Napredak</span>
          <span className="text-2xl font-bold text-blue-600">{progressPercent}%</span>
        </div>
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
          <div 
            className="bg-blue-600 h-full rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="text-xs text-slate-400 mt-3 text-center">
          {progressPercent === 100 ? "Odlično! Sve ste završili za danas." : "Svaki korak se računa. Nastavite dalje."}
        </p>
      </div>
    </div>
  );
};

