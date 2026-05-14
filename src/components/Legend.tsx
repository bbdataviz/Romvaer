export function Legend (){
return(
    <>
      <div className="legend">
        <div className="legend-group">
          <span className="legend-title">
            Geomagnetic Activity
          </span>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-icon quiet"></span>
              <span>Quiet</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon mod"></span>
              <span>Moderate</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon act"></span>
              <span>Active</span>
            </div>
            <span>Storm:</span>
            <div className="legend-item">
              <span className="legend-icon g1"></span>
              <span>Minor (G1)</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon g2"></span>
              <span>Moderate (G2)</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon g3"></span>
              <span>Strong (G3)</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon g4"></span>
              <span>Severe (G4)</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon g5"></span>
              <span>Extreme (G5)</span>
            </div>
          </div>
        </div>

        <div className="legend-group">
          <span className="legend-title">Data Source</span>
          <div className="legend-items">
            <div className="legend-item">
              <span className="legend-icon-source obs">●</span>
              <span>Observed</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon-source est">◐</span>
              <span>Estimated</span>
            </div>
            <div className="legend-item">
              <span className="legend-icon-source pred">△</span>
              <span>Predicted</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}