import './App.css';import './index.css';  
import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import Auth from './Auth';  import Account from './account';
function App() {
  const [session, setSession] = useState(null);
  useEffect(() => {
    // ✅ ตรวจสอบ Session ที่อัปเดตล่าสุด
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error getting session:", error);
      setSession(data?.session || null);
    };
    getSession();
    // ✅ ติดตามการเปลี่ยนแปลงของ Auth State
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => listener.subscription?.unsubscribe();
  }, []);
  return (
    <div className="container" style={{ padding: '50px 0 100px 0'}}>
      {!session ? <Auth /> : <Account key={session?.user?.id} session={session} />}
    </div>
  );
}
export default App;
