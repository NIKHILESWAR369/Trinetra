import React, { useState } from "react";
import LiveFeed from "./components/LiveFeed";
import StatusBar from "./components/StatusBar";
import AlertsLog from "./components/AlertsLog";
import "./App.css";
import trinetraLogo from "./assets/trinetra-logo.png";

const features = [
  { title: "Live Video Feed Analysis", description: "Capture and process real-time camera input." },
  { title: "Person Detection", description: "Detect human presence." },
  { title: "Smoking Detection", description: "Identify if a person is smoking using a custom model." },
  { title: "Alert Mechanism", description: "Display on-screen alerts if smoking or harmful actions are detected." },
  { title: "Integration Ready", description: "Designed to integrate with existing CCTV systems." },
  { title: "Testable with Laptop Camera", description: "No hardware dependency required during early testing stages." },
  { title: "Harassment Detection", description: "Uses body pose and behavior models to flag suspicious incidents." },
  { title: "Theft Detection", description: "Detects suspicious activities like loitering or object theft." },
  { title: "Action Classifier", description: "Integrates pre-trained AI models to classify harmful actions." },
  { title: "Multi-Channel Alerts", description: "Alerts via email, SMS, app notifications to ensure immediate action." },
  { title: "Logging System", description: "Maintains detailed logs with timestamps and frame screenshots." },
  { title: "Admin Dashboard", description: "Centralized dashboard for monitoring alerts, video logs, and control." },
  { title: "Location Tagging", description: "Links incidents to exact location coordinates for quicker response." },
  { title: "Night Mode Vision", description: "Improves detection in low light conditions." },
  { title: "GDPR Compliance", description: "Ensures privacy by blurring faces and encrypting sensitive data." }
];

const App = () => {
  const [started, setStarted] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <div className="app-container">
      
      {!started ? (
        !selectedFeature ? (
          <div className="landing-page">
            <img src={trinetraLogo} alt="Trinetra Logo" className="logo-img" />
            <h1>Welcome to Trinetra</h1>
            <p className="tagline">AI-Powered Smart Surveillance System</p>

            <section className="features-section">
              <h2>Key Features</h2>
              <div className="features-grid">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="feature-card"
                    onClick={() => setSelectedFeature(feature)}
                  >
                    <h3>{feature.title}</h3>
                    <p>{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <button className="start-btn" onClick={() => setStarted(true)}>
              Start Surveillance
            </button>
          </div>
        ) : (
          <div className="feature-details-page">
            <button className="back-btn" onClick={() => setSelectedFeature(null)}>←</button>
            <img src={trinetraLogo} alt="Trinetra Logo" className="logo-img feature-logo" />
            <h2>{selectedFeature.title}</h2>
            <p className="feature-full-desc">{selectedFeature.description}</p>
            <p className="feature-full-desc">Further technical information and visuals can be added here.</p>
          </div>
        )
      ) : (
        <div className="dashboard">
          <button className="back-btn" onClick={() => setStarted(false)}>←</button>
          <img src={trinetraLogo} alt="Trinetra Logo" className="logo-img feature-logo" />
          <h1>Trinetra Surveillance Dashboard</h1>
          <StatusBar />
          <LiveFeed />
          <AlertsLog />
        </div>
      )}

    </div>
  );
};

export default App;
