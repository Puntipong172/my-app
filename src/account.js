import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

export default function Account({ session }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar_url, setAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(session?.user?.email || "");

  useEffect(() => {
    if (!session) {
      navigate("/");
    } else {
      fetchProfile();
    }
  }, [session, navigate]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("username, website, avatar_url, full_name, phone")
        .eq("id", session.user.id)
        .single();
      if (error && error.code !== "PGRST116") throw error;
      if (data) {
        setUsername(data.username || "");
        setWebsite(data.website || "");
        setEmail(data.email || "");
        setAvatar(data.avatar_url || "");
        setFullName(data.full_name || "");
        setPhone(data.phone || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const updateProfile = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.from("profiles").upsert({
        id: session.user.id,
        email: session.user.email,
        username,
        website,
        avatar_url,
        full_name: fullName,
        phone,
      });

      if (error) throw error;
      alert("Profile updated successfully!");
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
        <h1 style={{ fontSize: "24px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
          Profile Page
        </h1>
        <input
          type="email"
          value={email}
          disabled
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "15px" }}
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "15px" }}
        />
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "15px" }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "15px" }}
        />
        <input
          type="text"
          placeholder="Website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "15px" }}
        />
        <input
          type="text"
          placeholder="Avatar URL"
          value={avatar_url}
          onChange={(e) => setAvatar(e.target.value)}
          style={{ width: "100%", padding: "12px", border: "1px solid #ddd", borderRadius: "6px", marginBottom: "15px" }}
        />
        <button
          onClick={updateProfile}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            marginInlineStart: "3%",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1
          }}>
          {loading ? "Saving..." : "Update Profile"}
        </button>
            <div>
              <button onClick={() => navigate("/profiles")} style={{
                width: "35%",
                padding: "8px",
                backgroundColor: "#2563eb",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "500",
                marginTop: "16px",
                marginInlineStart: "68%"
                }}>
                View All Profiles
              </button>
            </div>
        </div>
    </div>
  );
  
}
