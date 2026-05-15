export function getAuroraGradient(value : number) {

  function auroraGradient (color: string[]) {
    let color2 = color[1];
    color.length === 1 ? color2 = `${color[0]}66` : `${color[1]}66`; 

    return { 
      linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
      stops: [
        [0, color[0]] as [number, string],
        [1, color2] as [number, string]
      ]
    };
  }

  if (value >= 9) return auroraGradient(["#e60a69"]);
  if (value >= 7.67) return auroraGradient(["#92068d"]);
  if (value >= 6.67) return auroraGradient(["#ff21c0"]); 
  if (value >= 5.67) return auroraGradient(["#f876ff"]);
  if (value >= 4.67) return auroraGradient(["#53ed7c", "#f876ff"]);
  if (value >= 3.67) return auroraGradient(["#3be067"]);
  if (value >= 2.67) return auroraGradient(["#15bead"]);

  return auroraGradient(["#2a7b9b"]);
}

export function getStormLevel(value : number) {
  if (value >= 9) return "G5";
  if (value >= 7.67) return "G4";
  if (value >= 6.67) return "G3";
  if (value >= 5.67) return "G2";
  if (value >= 4.67) return "G1";

  return "";
}

export function getStormDescription(value : number) {
  if (value >= 9) return "Extreme Geomagnetic Storm";
  if (value >= 7.67) return "Severe Geomagnetic Storm";
  if (value >= 6.67) return "Strong Geomagnetic Storm";
  if (value >= 5.67) return "Moderate Geomagnetic Storm";
  if (value >= 4.67) return "Minor Geomagnetic Storm";
  if (value >= 3.57) return "Active Geomagnetic Activity";
  if (value >= 2.67) return "Moderate Geomagnetic Activity";

  return "Quiet";
}