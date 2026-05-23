import React from 'react';
import SolarWind from './components/SolarWind.tsx';
import { type DashboardPage} from './config/dashboardConfig';
import { type SolarWindVariable } from './config/solarWindConfig.ts';
import { type TimeRange } from './config/timeRangeConfig.ts';
import satellitePosition from './assets/DSCOVR-satellite-position.svg';

interface DashboardLayoutProps {
  children: React.ReactNode;
  range: TimeRange;
  page: DashboardPage;
  setPage: React.Dispatch<React.SetStateAction<DashboardPage>>;
  expand: SolarWindVariable | null;
  setExpand: React.Dispatch<React.SetStateAction<SolarWindVariable | null>>; 
  expandSat: boolean;
  setExpandSat: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DashboardLayout({children, range, page, setPage, expand, setExpand, expandSat, setExpandSat} : DashboardLayoutProps) {
  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Space Weather Data</h2>
        <nav className="desktop-nav">    
          <button className={page === "solarWind"? "active" : ""} 
            onClick={() => setPage("solarWind")}>
              Solar Wind<span>›</span>
          </button>
      
          <button className={page === "kIndex" ? "active" : ""}
            onClick={() => setPage("kIndex")}>
              Planetary K-index<span>›</span>
          </button>
    
          <a className="nav-link"
            href="https://services.swpc.noaa.gov/products/"
            target="_blank"
            rel="noreferrer"
          >
            NOAA data <span className="external-link">↗</span>
          </a>
        </nav>

        <p>Positioned far upstream of Earth at the Sun–Earth L1 Lagrange point, <strong>DSCOVR</strong> provides early measurements of the solar wind before geo- <br></br> magnetic disturbances interact with Earth’s magnetosphere.</p>
        {/* Longer Version: <p>The Deep Space Climate Observatory (DSCOVR) continuously measures real-time solar wind conditions using its Faraday Cup plasma sensor.</p>
        <p>Positioned at the Sun–Earth L1 Lagrange point, approximately 1.5 million kilometers (1 million miles) from Earth, DSCOVR can detect changes in the solar wind 15 to 60 minutes before they reach Earth.</p>*/}
      </aside>

      <nav className="mobile-nav">
        <button className={page === "solarWind" ? "active" : ""}
          onClick={() => setPage("solarWind")}>
            Solar Wind
        </button>

        <button className={page === "kIndex" ? "active" : ""}
          onClick={() => setPage("kIndex")}>
            Kp-Index
        </button>

        <a className="nav-link"
          href="https://services.swpc.noaa.gov/products/"
          target="_blank"
          rel="noreferrer"
        >
          NOAA data <span className="external-link">↗</span>
        </a>
      </nav>

      <main className="content">
        {children}
        {expand && (
          <div className="modal-overlay"
            onClick={() => setExpand(null)}>
            <div className="modal-content"
              onClick={(e) => e.stopPropagation()}>
              <button className="modal-btn"
                onClick={() => setExpand(null)}>⛶
              </button>
              <SolarWind variable={expand} range={range} />
            </div>
          </div>
        )}
        {expandSat && (
          <div className="modal-overlay"
            onClick={() => setExpandSat(false)}>
            <div className="modal-content"
              onClick={(e) => e.stopPropagation()}>
              <div className="chart-element">
                <button className="modal-btn"
                  onClick={() => setExpandSat(false)}>⛶
                </button>
                <div className="image-container  modal-image-container">
                  <img src={satellitePosition} />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}