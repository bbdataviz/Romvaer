export const KpIndexConfig = {
  observed: {
    sourceType: "observed",
    endpoint: "https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json"

  },
  forecast: {
    sourceType: ["observed", "predicted", "estimated"],
    endpoint: "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json"
  }
} as const;

export type KpIndexVariable = 
  keyof typeof KpIndexConfig;


