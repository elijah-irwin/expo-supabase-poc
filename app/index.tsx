// React.
import { useState, useEffect } from 'react';
import { View } from 'react-native';
import 'react-native-url-polyfill/auto';

// DB.
import { supabase } from '../lib/subabase';
import { Session } from '@supabase/supabase-js';

// Pages.
import Auth from '../components/Auth';
import Account from '../components/Account';

/****************************************
 * - Main Page -
 ***************************************/
export default function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <View style={{ backgroundColor: 'red' }}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  );
}
