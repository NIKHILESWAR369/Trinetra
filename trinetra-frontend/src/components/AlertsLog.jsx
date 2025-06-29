import React, { useState, useEffect } from "react";

const AlertsLog = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch('http://localhost:5000/alerts')
        .then(res => res.json())
        .then(data => setAlerts(data.alerts))
        .catch(err => console.error(err));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>⚠️ Alert Logs</h2>
      <ul>
        {alerts.length === 0 ? (
          <li>No alerts yet</li>
        ) : (
          alerts.map((alert, index) => <li key={index}>{alert}</li>)
        )}
      </ul>
    </div>
  );
};

export default AlertsLog;

