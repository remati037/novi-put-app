import { AlertTriangle, ChevronRight } from 'lucide-react';
import { UserData, ViewType } from '../types';

interface UrgesScreenProps {
  userData: UserData;
  onViewChange: (view: ViewType) => void;
  onUrgeLog: (intensity: number) => void;
}

export const UrgesScreen = ({ userData, onViewChange, onUrgeLog }: UrgesScreenProps) => {
  return (
    <div className="p-6 max-w-md mx-auto min-h-screen flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => onViewChange('dashboard')} className="p-2 hover:bg-slate-100 rounded-full">
          <ChevronRight className="w-6 h-6 rotate-180" />
        </button>
        <h2 className="text-2xl font-bold">SOS Zona</h2>
      </div>

      <div className="bg-rose-50 border border-rose-100 rounded-2xl p-6 text-center mb-8">
        <AlertTriangle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-rose-800 mb-2">Osećate iskušenje?</h3>
        <p className="text-rose-700 mb-6">Zastanite. Udahnite duboko 5 puta. Iskušenje je samo talas, proći će.</p>
        
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map(intensity => (
            <button 
              key={intensity}
              onClick={() => onUrgeLog(intensity)}
              className={`py-3 rounded-lg font-bold text-sm ${
                intensity === 1 ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' :
                intensity === 2 ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' :
                'bg-red-100 text-red-700 hover:bg-red-200'
              }`}
            >
              {intensity === 1 ? 'Slabo' : intensity === 2 ? 'Srednje' : 'Jako'}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-slate-800 mb-4">Istorija Borbe</h3>
        {userData.urgeHistory.length === 0 ? (
          <div className="text-center text-slate-400 py-10">Nema zabeleženih iskušenja. Odlično!</div>
        ) : (
          <div className="space-y-3">
            {userData.urgeHistory.slice(0, 5).map((log, idx) => (
              <div key={idx} className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-12 rounded-full ${
                    log.intensity === 1 ? 'bg-yellow-400' :
                    log.intensity === 2 ? 'bg-orange-400' : 'bg-red-400'
                  }`}></div>
                  <div>
                    <div className="font-semibold text-slate-700">
                      {log.intensity === 1 ? 'Slabo' : log.intensity === 2 ? 'Srednje' : 'Jako'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {new Date(log.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                {log.resisted && <span className="text-emerald-500 font-bold text-sm bg-emerald-50 px-2 py-1 rounded">Pobedio/la</span>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

