import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabase/config';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;
      
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full bg-white p-8 border-4 border-primary">
        <h2 className="text-center font-heading font-black text-4xl text-primary uppercase mb-6">Admin Login</h2>
        {error && <p className="text-red-500 mb-4 font-body text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-primary/20 p-3 font-body focus:border-primary outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-primary font-bold uppercase tracking-widest text-sm mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-2 border-primary/20 p-3 font-body focus:border-primary outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-background font-heading font-bold text-xl uppercase py-4 hover:bg-primary/90 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
