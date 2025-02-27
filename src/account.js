import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [website, setWebsite] = useState("");
  const [avatar_url, setAvatar] = useState("");
  useEffect(() => {
    if (session) getProfile();
  }, [session]);
  async function getProfile() {
    try {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) return;
      let { data, error, status } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.id)
        .single();
      if (error && status !== 406) throw error;
      if (data) {
        setUsername(data.username || "");
        setWebsite(data.website || "");
        setAvatar(data.avatar_url || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
    } finally {
      setLoading(false);
    }
  }
  async function updateProfile() {
    try {
      setLoading(true);
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error("User not found");
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };
      let { error } = await supabase.from("profiles").upsert(updates);
      if (error) throw error;
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        backgroundColor: "#f5f5f5",
      }}>
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "40px",
          backgroundColor: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          Profile
        </h1>
        <p
          style={{
            color: "#666",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          Update your profile information below
        </p>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="email" style={{ display: "block", marginBottom: "8px" }}>
            Email
          </label>
          <input
            type="text"
            id="email"
            value={session?.user?.email || ""}
            disabled
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
              backgroundColor: "#f9f9f9",
              color: "#888",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="username" style={{ display: "block", marginBottom: "8px" }}>
            Name
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="website" style={{ display: "block", marginBottom: "8px" }}>
            Website
          </label>
          <input
            type="text"
            id="website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "6px",
            }}  />
        </div>
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
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
            marginBottom: "20px",  }} >
          {loading ? "Updating..." : "Update Profile"}
        </button>
        <button
          onClick={() => supabase.auth.signOut()}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#ddd",
            color: "#333",
            border: "none",
            borderRadius: "6px",
            fontWeight: "500",
            cursor: "pointer",   }} >
          Sign Out
        </button>
      </div>
    </div>
  );
}
