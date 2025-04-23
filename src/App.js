import React, { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState(null);
  const [error, setError] = useState(null);

  // ✅ Backend URL (no trailing slash!)
  const API_BASE = "https://my-fastapi-backend-ajenfcfqejehavd4.southeastasia-01.azurewebsites.net";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setGreeting(null);
  
    console.log("📤 Sending name:", name);
  
    try {
      const res = await fetch(`${API_BASE}/greet/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
  
      console.log("📥 Response object:", res);
  
      if (!res.ok) {
        const errText = await res.text();
        console.error("❌ Response error text:", errText);
        throw new Error(errText || "Failed to fetch greeting");
      }
  
      const data = await res.json();
      console.log("✅ Parsed JSON:", data);
      setGreeting(data.message);
      setName("");
    } catch (err) {
      console.error("❌ Caught exception:", err);
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="app">
      <div className="card">
        <h1>🚀 FastAPI + React</h1>
        <p className="subtitle">Enter your name below</p>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <button type="submit">Go</button>
        </form>

        {greeting && <div className="greeting">{greeting}</div>}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;
