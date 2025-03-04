import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

export default function Profiles() {
  const [profiles, setProfiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    const { data, error } = await supabase.from("profiles").select("*"); // ⬅️ ดึงข้อมูลทุกแถว
    if (error) console.error("Error fetching profiles:", error);
    else setProfiles(data);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>All User Profiles</h1>
      <button onClick={() => navigate("/account")} style={styles.backButton}>
        Back to Profile
      </button>
      <table style={styles.table}>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Email</th>
            <th>Username</th>
            <th>fullName</th>
            <th>Website</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile) => (
            <tr key={profile.id}>
              <td>{profile.id}</td>
              <td>{profile.username || "N/A"}</td>
              <td>{profile.fullName || "N/A"}</td>
              <td>{profile.website || "N/A"}</td>
              <td>
                {profile.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" style={styles.avatar} />
                ) : (
                  "No Avatar"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  avatar: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
  },
  backButton: {
    marginBottom: "10px",
    padding: "10px 15px",
    fontSize: "14px",
    borderRadius: "5px",
    cursor: "pointer",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    transition: "0.3s",
  },
};
