export const variableConfig = {
  density: {
    column: 1,
    title: "Plasma density",
    unit: "cm&#x207B;&sup3;" // cm^-3
  },
  speed: {
    column: 2,
    title: "Solar Wind Speed",
    unit: "km/s"
  },
  temperature: {
    column: 3,
    title: "Plasma temperature",
    unit: "&#176;C" // "K"
  }
} as const; // immutable config

export type SolarWindVariable =
  keyof typeof variableConfig; // derives key and type automatically

