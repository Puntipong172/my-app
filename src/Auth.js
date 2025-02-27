import { useState } from "react";
import { supabase } from "./supabaseClient";
export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const handleLogin = async (email) => {
    try {
      setLoading(true);
      // Replace with your actual auth logic
      const { error } = await supabase.auth.signInWithOtp({ email });
      if (error) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert("Check your email for the login link!");
    } catch (error) {
      console.error("Login error:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '10px'
        }}>
          Welcome Back
        </h1>
        <p style={{
          color: '#666',
          textAlign: 'center',
          marginBottom: '30px'
        }}>
          Sign in using a magic link sent to your email
        </p>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              marginBottom: '20px'
            }}
          />
          <button
            type="submit"
            disabled={loading || !email}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontWeight: '500',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}>
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
        </form>
      </div>
    </div>
  )
}