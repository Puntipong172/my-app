import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [email, setEmail] = useState("Loading...");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await supabase.auth.refreshSession();
        const { data, error } = await supabase.auth.getUser();
        if (error) throw error;
        setEmail(data?.user?.email || "No email found");
      } catch (error) {
        console.error("Error fetching user:", error.message);
        setEmail("No email found");
      }
    };

    fetchUser();
  }, []);

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      alert("Password updated successfully! Please login again.");
      navigate("/");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
      backgroundColor: "#f5f5f5"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "400px",
        padding: "40px",
        backgroundColor: "white",
        borderRadius: "10px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "10px" }}>
          Reset Password
        </h1>
        <p style={{ textAlign: "center", color: "#555555", marginBottom: "10px" }}>
          For this your email:{" "}
        <span style={{ fontWeight: "bold", color: "#000fff" }}>{email}</span>
        </p>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #ddd",
            borderRadius: "6px",
            marginBottom: "20px"
          }}
        />
        <button
          onClick={handleResetPassword}
          disabled={loading || !newPassword}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}>
          {loading ? "Processing..." : "Reset Password"}
        </button>
      </div>
    </div>
  );
}
