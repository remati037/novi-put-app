import { BarChart, TrendingUp } from 'lucide-react';
import { UserData } from '../types';
import { calculateRiskScore, getRiskLevel } from '../utils/helpers';

interface AnalysisScreenProps {
  userData: UserData;
  onStartJourney: () => void;
}

export const AnalysisScreen = ({ userData, onStartJourney }: AnalysisScreenProps) => {
  const score = calculateRiskScore(userData.quizAnswers);
  const risk = getRiskLevel(score);
  const percentage = Math.min((score / 18) * 100, 100);

  return (
    <div className="min-h-screen bg-white p-6 flex flex-col items-center justify-center max-w-md mx-auto">
      <div className="text-center mb-8">
        <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
          <BarChart className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Analiza Vašeg Profila</h2>
        <p className="text-slate-500">Na osnovu vaših iskrenih odgovora</p>
      </div>

      <div className="w-full bg-slate-100 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="flex justify-between items-end mb-2 relative z-10">
          <span className="text-slate-500 font-medium">Nivo Rizika</span>
          <span className={`text-xl font-bold ${risk.color}`}>{risk.level}</span>
        </div>
        
        <div className="w-full bg-slate-200 h-4 rounded-full mb-4 overflow-hidden relative z-10">
          <div 
            className={`h-full rounded-full transition-all duration-1000 ${
              risk.level === 'Nizak' ? 'bg-emerald-500' : 
              risk.level === 'Srednji' ? 'bg-orange-500' : 'bg-rose-600'
            }`} 
            style={{ width: `${percentage}%` }}
          ></div>
        </div>

        <p className="text-slate-700 text-sm leading-relaxed relative z-10">
          {risk.description}
        </p>
        
        <div className={`absolute top-0 right-0 w-32 h-32 ${risk.bg} rounded-full -mr-16 -mt-16 blur-2xl opacity-50`}></div>
      </div>

      <button 
        onClick={onStartJourney}
        className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-slate-900/20 hover:bg-slate-800 transition-all flex justify-center items-center gap-2"
      >
        Započni Oporavak <TrendingUp className="w-5 h-5" />
      </button>
    </div>
  );
};

