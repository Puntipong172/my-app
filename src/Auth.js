import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    setLoading(true);
    try {
      let result;
      if (isSignUp) {
        result = await supabase.auth.signUp({ email, password });
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }
      if (result.error) throw result.error;

      alert(isSignUp ? "Sign up successful! Please check your email." : "Login successful!");
      if (!isSignUp) navigate("/durian");
      //if (!isSignUp) navigate("/durain");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPasswordRequest = async () => {
    if (!email) return alert("Please enter your email first!");
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:"https://my-app-ten-navy.vercel.app/reset-password",
      });
      if (error) throw error;
      alert("Check your email to reset password.");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>{isSignUp ? "Create Account" : "Welcome Back"}</h1>
        <p style={styles.subtitle}>{isSignUp ? "Join us today!" : "Sign in to continue"}</p>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button onClick={handleAuth} disabled={loading || !email || !password} style={styles.button}>
          {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
        </button>

        {!isSignUp && (
          <p style={styles.forgotPassword}>
            <button onClick={handleResetPasswordRequest} style={styles.linkButton}>
              Forgot Password?
            </button>
          </p>
        )}

        <p style={styles.switchText}>
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
          <button onClick={() => setIsSignUp(!isSignUp)} style={styles.linkButton}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    backgroundColor: "#f5f5f5",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #ddd",
    borderRadius: "6px",
    marginBottom: "15px",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.2s",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#1d4ed8",
  },
  forgotPassword: {
    textAlign: "center",
    marginTop: "10px",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#2563eb",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  switchText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
  },
};
