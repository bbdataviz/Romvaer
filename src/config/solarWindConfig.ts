export const variableConfig = {
  density: {
    column: 1,
    title: "Plasma Density",
    unit: "particles/cm&sup3;" // cm^3
  },
  speed: {
    column: 2,
    title: "Solar Wind Speed",
    unit: "km/s"
  },
  temperature: {
    column: 3,
    title: "Plasma Temperature",
    unit: "&#176;C" // "Celsius"
  }
} as const; // immutable config

export type SolarWindVariable =
  keyof typeof variableConfig; // derives key and type automatically

