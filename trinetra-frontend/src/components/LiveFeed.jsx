import React, { useState, useEffect } from "react";

const LiveFeed = () => {
  const [systemStatus, setSystemStatus] = useState("Fetching status...");

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://localhost:5000/status")
        .then((res) => res.json())
        .then((data) => setSystemStatus(data.summary))
        .catch((err) => console.error("Error fetching status:", err));
    }, 2000); // Fetch every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>🔴 Live Surveillance Feed</h2>
      <img
        src="http://localhost:5000/video"
        alt="Live Feed"
        style={{ width: "100%", maxHeight: "480px", border: "2px solid black", borderRadius: "8px" }}
      />
      <h3 className="mt-4 text-xl text-green-500">Status: {systemStatus}</h3>
    </div>
  );
};

export default LiveFeed;
