import { useState } from 'react';
import { Shield, Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen = ({ onAuthSuccess }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error } = isLogin
        ? await signIn(email, password)
        : await signUp(email, password);

      if (error) {
        setError(error.message);
      } else {
        if (!isLogin) {
          setError('Proverite email za potvrdu naloga!');
          setTimeout(() => {
            setIsLogin(true);
            setError(null);
          }, 3000);
        } else {
          onAuthSuccess();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Došlo je do greške');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Shield className="w-20 h-20 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Novi Put</h1>
          <p className="text-slate-300">
            {isLogin ? 'Dobrodošli nazad' : 'Kreirajte novi nalog'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-rose-500/20 border border-rose-500 text-rose-200 px-4 py-3 rounded-lg flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="vas@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Lozinka
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full pl-10 pr-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-lg font-bold text-lg transition-all shadow-lg shadow-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Učitavanje...' : isLogin ? 'Prijavi se' : 'Kreiraj nalog'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError(null);
            }}
            className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
          >
            {isLogin
              ? 'Nemate nalog? Kreirajte ga ovde'
              : 'Već imate nalog? Prijavite se'}
          </button>
        </div>
      </div>
    </div>
  );
};

