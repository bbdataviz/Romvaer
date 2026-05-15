# Romvær

A responsive space weather dashboard for visualizing real-time solar wind conditions, geomagnetic activity, and aurora visibility using live NOAA SWPC data.
This dashboard is designed for enthusiasts interested in space weather and aurora observation.
Built with React, TypeScript, Vite, and Highcharts.

---

## 💡 Motivation

I built Romvær to explore modern frontend development and scientific data visualization using React and Highcharts.

The project combines my interests in space weather, data visualization, interactive monitoring systems, and responsive UI design while working with real-time NOAA data streams.

--- 

## ✨ Features

- Real-time solar wind data visualization
- Planetary K-index forecast and storm levels
- Aurora visibility guidance
- Responsive desktop/mobile layout
- Interactive Highcharts with tooltips and overlays
- Client-side time range filtering
- Custom geomagnetic storm classification system
- NOAA SWPC data integration

---

## 📸 Preview

### Solar Wind Monitoring Dashboard

![Solar wind monitoring dashboard](./screenshots/solar-wind.png)

### Planetary K-index Forecast

![Planetary K-index forecast visualization](./screenshots/geomagnetic-activity-and-forecast.png)

### Modular & Mobile View

![Responsive mobile dashboard and extended view layout](./screenshots/modular-and-mobile-view.png)

---
## 🚀 Live Demo

View project: https://romvaer.vercel.app/
- Live deployment with automatic updates via Vercel
- Real-time NOAA SWPC data integration
---

## 🛰 Data Sources

This project uses public data provided by NOAA Space Weather Prediction Center (SWPC).

Link: https://services.swpc.noaa.gov/products/

---

## 🛠 Tech Stack

- React
- TypeScript
- Vite
- Highcharts
- CSS3, HTML5
- NOAA SWPC API

---

## 📂 Project Structure

- `components/` – reusable chart and UI components
- `config/` – dashboard and chart configuration
- `utils/` – geomagnetic storm utilities and helpers
- `assets/` – static visual assets

---

## ⚙️ Local Development

Clone the repository:

```bash
git clone https://github.com/bbdataviz/Romvaer.git
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## 📱 Responsiveness

The dashboard is designed for both desktop and mobile layouts using CSS Grid, Flexbox, and responsive breakpoints.
The desktop layout provides the most complete monitoring experience, while the mobile layout focuses on compact navigation and readability.


---

## 🎨 Design Notes

The UI was inspired by:
- modern monitoring dashboards
- atmospheric aurora color palettes
- scientific visualization interfaces

The project focuses on balancing:
- data density
- readability
- responsive interaction
- visual hierarchy

---

## 🔭 Future Improvements

- Anomaly detection in solar wind data
- Real-time DSCOVR satellite position visualization
- Historical geomagnetic activity views (event visualization)
- Expanded aurora forecast tools
- Improved accessibility, e.g., informational overlays and keyboard navigation

---

## 📄 License

This project is licensed under the MIT License.
Copyright (c) 2026 Beatrice Budich
