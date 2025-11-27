import { Shield, ChevronRight } from 'lucide-react';

interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen = ({ onStart }: IntroScreenProps) => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6 text-center">
    <Shield className="w-20 h-20 text-emerald-400 mb-6" />
    <h1 className="text-4xl font-bold mb-4">Novi Put</h1>
    <p className="text-slate-300 mb-8 max-w-md">
      Preuzmite kontrolu nad svojim životom. Razumite svoje navike, pratite napredak i izgradite bolju verziju sebe.
    </p>
    <button 
      onClick={onStart}
      className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-emerald-500/30 flex items-center gap-2"
    >
      Započni Procenu <ChevronRight />
    </button>
  </div>
);

