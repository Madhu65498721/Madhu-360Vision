import { useState } from "react";
import "./App.css";

function App() {
  const [panelOpen, setPanelOpen] = useState(true);

  const [cameras, setCameras] = useState({
    camera1: true,
    camera2: true,
    camera3: true,
    camera4: true,
    vrMode: false,
  });

  const handleCheckbox = (name) => {
    setCameras((previous) => ({
      ...previous,
      [name]: !previous[name],
    }));
  };

  return (
    <div className="dashboard">

      {/* ================= HEADER ================= */}
      <header className="top-header">
        <div className="logo-section">
          <div className="logo-box">360°</div>

          <div>
            <h1>Madhu 360 Vision</h1>
            <p>Camera Monitoring Dashboard</p>
          </div>
        </div>

        <div className="system-status">
          <span className="status-dot"></span>
          SYSTEM READY
        </div>
      </header>


      {/* ================= MAIN CONTENT ================= */}
      <main className="dashboard-content">

        <div className="video-grid">

          {/* VIDEO 1 */}
          {cameras.camera1 && (
            <div className="video-card">
              <div className="video-header">
                <span>CAMERA 01</span>
                <span className="live-badge">LIVE</span>
              </div>

              <div className="video-screen">
                <div className="video-placeholder">
                  <div className="camera-icon">◉</div>
                  <h2>VIDEO OUTPUT 01</h2>
                  <p>Camera 01 feed</p>
                </div>
              </div>
            </div>
          )}


          {/* VIDEO 2 */}
          {cameras.camera2 && (
            <div className="video-card">
              <div className="video-header">
                <span>CAMERA 02</span>
                <span className="live-badge">LIVE</span>
              </div>

              <div className="video-screen">
                <div className="video-placeholder">
                  <div className="camera-icon">◉</div>
                  <h2>VIDEO OUTPUT 02</h2>
                  <p>Camera 02 feed</p>
                </div>
              </div>
            </div>
          )}


          {/* VIDEO 3 */}
          {cameras.camera3 && (
            <div className="video-card">
              <div className="video-header">
                <span>CAMERA 03</span>
                <span className="live-badge">LIVE</span>
              </div>

              <div className="video-screen">
                <div className="video-placeholder">
                  <div className="camera-icon">◉</div>
                  <h2>VIDEO OUTPUT 03</h2>
                  <p>Camera 03 feed</p>
                </div>
              </div>
            </div>
          )}


          {/* VIDEO 4 */}
          {cameras.camera4 && (
            <div className="video-card">
              <div className="video-header">
                <span>CAMERA 04</span>
                <span className="live-badge">LIVE</span>
              </div>

              <div className="video-screen">
                <div className="video-placeholder">
                  <div className="camera-icon">◉</div>
                  <h2>VIDEO OUTPUT 04</h2>
                  <p>Camera 04 feed</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </main>


      {/* ================= LEFT CONTROL PANEL ================= */}
      <aside className={`control-panel ${panelOpen ? "open" : "closed"}`}>

        <button
          className="panel-toggle"
          onClick={() => setPanelOpen(!panelOpen)}
        >
          {panelOpen ? "‹" : "›"}
        </button>


        {panelOpen && (
          <div className="panel-content">

            <div className="panel-title">
              <h2>Controls</h2>
              <p>Display Options</p>
            </div>


            {/* CAMERA OPTIONS */}
            <div className="control-section">

              <h3>Camera Outputs</h3>

              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={cameras.camera1}
                  onChange={() => handleCheckbox("camera1")}
                />

                <span>Camera 01</span>
              </label>


              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={cameras.camera2}
                  onChange={() => handleCheckbox("camera2")}
                />

                <span>Camera 02</span>
              </label>


              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={cameras.camera3}
                  onChange={() => handleCheckbox("camera3")}
                />

                <span>Camera 03</span>
              </label>


              <label className="checkbox-row">
                <input
                  type="checkbox"
                  checked={cameras.camera4}
                  onChange={() => handleCheckbox("camera4")}
                />

                <span>Camera 04</span>
              </label>

            </div>


            {/* VR OPTION */}
            <div className="control-section">

              <h3>Mode</h3>

              <label className="checkbox-row">

                <input
                  type="checkbox"
                  checked={cameras.vrMode}
                  onChange={() => handleCheckbox("vrMode")}
                />

                <span>VR Mode</span>

              </label>

            </div>


            {/* STATUS */}
            <div className="panel-status">

              <div className="status-title">
                STATUS
              </div>

              <div className="status-item">
                <span className="small-dot"></span>
                Frontend Ready
              </div>

              <div className="status-item">
                <span className="small-dot"></span>
                Backend Disconnected
              </div>

            </div>

          </div>
        )}

      </aside>


      {/* ================= FOOTER ================= */}
      <footer className="bottom-bar">
        <span>Madhu 360 Vision</span>
        <span>Frontend Prototype</span>
      </footer>

    </div>
  );
}

export default App;