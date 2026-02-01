'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import NavigationBar from '@/components/common/NavigationBar'; // Import Navbar so the page looks complete

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  // 1. NEW: Google Login Handler
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/`, // Just slash (Home Page)
      },
    });

    if (error) setMessage(error.message);
    // Note: Google will redirect the browser, so we don't need to manually router.push here
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setMessage(signUpError.message);
      } else {
        setMessage('Account created! Logging in...');
        router.push('/');
      }
    } else {
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-white">
      <NavigationBar />
      
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="bg-gray-800/50 p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-400 mt-2">Sign in to save your roadmaps</p>
          </div>

          {/* 2. Google Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-bold py-3 rounded-lg hover:bg-gray-100 transition-colors mb-6"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-800 text-gray-400">Or continue with email</span>
            </div>
          </div>
        
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-sm mb-1 text-gray-300">Email Address</label>
              <input
                type="email"
                required
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm mb-1 text-gray-300">Password</label>
              <input
                type="password"
                required
                className="w-full p-3 rounded-lg bg-gray-900/50 border border-gray-600 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50 mt-2"
            >
              {loading ? 'Processing...' : 'Sign In'}
            </button>
          </form>

          {message && (
            <div className="mt-4 p-3 rounded bg-emerald-500/10 border border-emerald-500/20 text-center">
              <p className="text-sm text-emerald-400">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}