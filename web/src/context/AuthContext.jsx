import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setSession(session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const value = {
    user: session?.user ?? null,
    token: session?.access_token ?? null,
    signOut: () => supabase.auth.signOut(),
  };

  if (loading) return <div className="p-5 text-center">Loading...</div>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
