import { createContext, useContext, useState, useEffect, ReactElement } from 'react';
import { useSegments, router } from 'expo-router';

// DB.
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';

/****************************************
 * - Auth Context -
 ***************************************/
export const AuthContext = createContext<Session | null>(null);
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('Auth context must be used within the provider.');
  return context;
};

/****************************************
 * - Auth Provider -
 ***************************************/
export const AuthProvider = ({ children }: { children: ReactElement }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useRequireAuth(session);

  // Render.
  return <AuthContext.Provider value={session}>{children}</AuthContext.Provider>;
};

function useRequireAuth(session: Session | null) {
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === '(auth)';
    if (!session && !inAuthGroup) router.replace('/login');
    else if (session && session.user && inAuthGroup) router.replace('/');
  }, [session, segments]);
}
