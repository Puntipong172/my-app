import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Auth";
import Account from "./account";
import Profiles from "./Profiles"; 
import Resetpassword from "./Resetpassword"; 
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import Durian from "./durian";
import Grape from "./grape";

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
        <Route path="/grape" element={<Grape session={session}  />} />
        <Route path="/durian" element={<Durian session={session}  />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/reset-password" element={<Resetpassword />} /> 
      </Routes>
    </Router>
  );
}
