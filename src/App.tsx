import './App.css'
import { useState } from 'react';
import Header from './Header.tsx';
import DashboardLayout from './DashboardLayout.tsx';
import SolarWind from './components/SolarWind.tsx';
import KpIndex from './components/KpIndex.tsx';
import Legend from './components/Legend.tsx';
import { type DashboardPage } from './config/dashboardConfig.ts';
import { type SolarWindVariable } from './config/solarWindConfig.ts';
import { type TimeRange } from './config/timeRangeConfig.ts';
import satellitePosition from './assets/DSCOVR-satellite-position.svg';


export default function App() {
  
  const [page, setPage] = useState<DashboardPage>("solarWind");

  const [range, setRange] = useState<TimeRange>("24h");
  const handleRange = (range: TimeRange) => {
    setRange(range);
  };

  const [expand, setExpand] = useState<SolarWindVariable | null>(null);
  const [expandSat, setExpandSat] = useState<boolean>(false);
  
  return (
    <>
      <Header />
      <DashboardLayout range={range} page={page} setPage={setPage} expand={expand} setExpand={setExpand} expandSat={expandSat} setExpandSat={setExpandSat}>
        {page === "solarWind" && (
          <>
            <div className="toolbar">
              <p>Last</p>
              <button onClick={() => handleRange("60m")}>60m</button>
              <button onClick={() => handleRange("24h")}>24h</button>
              <button onClick={() => handleRange("7d")}>7d</button>
            </div>
            
            <div className="chart-grid solar-wind-grid">
              <div className="chart-card">
                <button className="modal-btn" 
                  onClick={() => setExpand("density")}>⛶
                </button>
                <SolarWind variable="density" range={range} />
              </div>

              <div className="chart-card">
                <button className="modal-btn"
                  onClick={() => setExpand("speed")}>⛶
                </button>
                <SolarWind variable="speed" range={range} />
              </div>

              <div className="chart-card">
                <button className="modal-btn"
                  onClick={() => setExpand("temperature")}>⛶
                </button>
                <SolarWind variable="temperature" range={range} />
              </div>

              <div className="chart-card">
                <div className="chart-element">
                    <div className="alternative-content">
                      <button className="modal-btn"
                        onClick={() => setExpandSat(true)}>⛶
                      </button>
                      <h2>SOLAR1 – Satellite Position</h2>
                      <div className="image-container">
                        <img src={satellitePosition} />
                      </div>
                    </div>
                </div>
              </div>
            </div>
          </>
        )}

        {page === "kIndex" && (
          <>
            <div className="toolbar"></div>
            <div className="chart-grid kp-grid">
            
              <div className="chart-card">
                <KpIndex />
                <Legend />
              </div>

              <div className="alternative-content">
                <h2>Kp-Index</h2>
                <div className="kp-info">
                  <p> The planetary K-index measures global geomagnetic activity on a scale from 0 to 9, indicating disturbances in Earth's magnetic field caused by variations in the solar wind. </p>
                  <p><b> Impacts:</b> Elevated Kp levels (&gt; 6) can affect technological systems, including GPS/GNSS positioning, radio communication, power infrastructure, and spacecraft or drone operations. </p>
                  <p><b>Aurora Visibility:</b> Kp 3–4 provides favorable conditions for aurora viewing in northern regions, while Kp 5 and above can allow auroral activity to become visible at much lower latitudes. </p>
                </div> 
              </div>
              
            </div>
          </>
        )}
      </DashboardLayout>
    </>
  )
}
