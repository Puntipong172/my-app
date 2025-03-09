import { supabase } from "./supabaseClient";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Grape({ session }) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
//   const [date, setDate] = useState("");
//   const [time, setTime] = useState("");
//   const [tree, setTree] = useState("");
//   const [disease, setDisease] = useState("");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (!session) {
      navigate("/");
    } else {  
      fetchGrapeData();
    }
  }, [session, navigate]);
  
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchGrapeData = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("grape")
        .select("date, time, tree, disease"); // เอาข้อมูลทั้งหมด
      if (error) throw error;
      setData(data || []);
    } catch (error) {
      console.error("Error fetching grape data:", error.message);
    } finally {
      setLoading(false);
    }
  };
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const borderColor = {
    light:"#710088",
    dark:"#f415fc",
  } ;

  return (
    <div className={`app-container ${theme}`} style={{ position: "relative", padding: "20px" }}>
    <button
      onClick={() => navigate("/durian")}
      style={{
        position: "absolute",
        top: "10px",
        left: "10px",
        padding: "8px 12px",
        backgroundColor: "#e4d128",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      View Durian Data
    </button>

    <button
          onClick={toggleTheme}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "8px 12px",
            backgroundColor: "#333",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }} >
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>

    <h1 className="theme-text" style={{ textAlign: "center" }}>Grape Data</h1>
    
    {loading ? (
      <p className="theme-text">Loading...</p>
    ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>Date</th>
            <th style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>Time</th>
            <th style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>tree</th>
            <th style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>Disease</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", padding: "10px" }}>Loading...</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>{item.date}</td>
                <td style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>{item.time}</td>
                <td style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>{item.tree}</td>
                <td style={{ padding: "10px", border: `2px solid ${borderColor[theme]}` }}>{item.disease}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
        )}
  </div>
);
}


  