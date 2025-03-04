import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Account from "./account";
import Profiles from "./Profiles"; // ⬅️ นำเข้าไฟล์ใหม่
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/account" element={<Account session={session} />} />
        <Route path="/profiles" element={<Profiles />} /> {/* ✅ เพิ่มเส้นทางนี้ */}
      </Routes>
    </Router>
  );
}
