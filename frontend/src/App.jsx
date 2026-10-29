
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/health`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Backend request failed");
        }
        return response.json();
      })
      .then((data) => setHealth(data))
      .catch(() => setError("Cannot connect to the backend."));
  }, []);

  return (
    <main style={{ fontFamily: "system-ui", padding: "40px" }}>
      <h1>VoiceReach AI</h1>
      <p>AI-Powered College Outreach & Admissions CRM</p>

      <h2>System Status</h2>

      {health ? (
        <>
          <p>Backend: Connected</p>
          <p>Service: {health.service}</p>
          <p>Status: {health.status}</p>
        </>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <p>Connecting to backend...</p>
      )}
    </main>
  );
}

export default App;
