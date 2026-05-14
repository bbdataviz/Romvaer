export const timeRangeConfig = {
  "60m": {
    range: "60m",
    minutes: 60
  },
  "24h": {
    range: "24h",
    minutes: 1440
  },
  "7d": {
    range: "7d",
    minutes: 10080
  }
} as const;

export type TimeRange =
  keyof typeof timeRangeConfig;