# 🌌 Astrophage Tracker

A sci-fi-inspired solar monitoring dashboard powered by real NASA data.

Inspired by *Project Hail Mary*, **Astrophage Tracker** visualizes solar irradiance data across Earth and simulates the fictional energy-draining effects of "Astrophage." The dashboard fetches daily irradiance metrics from the NASA POWER API, plots interactive charts, and displays warning levels based on real-time energy fluctuations.

---

## 🚀 Features

- 🔭 Live solar irradiance data from NASA POWER API
- 📉 Glowing graph panel to visualize daily energy levels
- 🛑 Astrophage containment warnings based on week-over-week energy drops
- 🌍 Manual coordinate input for global tracking
- 🧬 Fictional sci-fi overlay built on real scientific data

---

## 🧪 Tech Stack

- **Frontend:** React + TypeScript
- **Charting:** Chart.js (via react-chartjs-2)
- **Styling:** Custom CSS with terminal aesthetics
- **Data Source:** NASA POWER API (https://power.larc.nasa.gov/)

---

## 🧰 Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/ErdagEge/astrophage-tracker.git
   cd astrophage-tracker
   ```
   
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file and set `REACT_APP_NASA_API` to the NASA POWER API base
   URL. Adjust this value if you need to point to a different instance.

4. Run the app:

```bash
npm start
```

5. Visit http://localhost:3000 in your browser.

## 🔧 Development Notes
- You can adjust latitude and longitude using the input fields.
- The app auto-refreshes irradiance data and graph when coordinates change.
- By default, irradiance data is pulled for the past 7 days with a 3-day buffer.

---

## 📚 Credits
- NASA POWER API: Solar & meteorological data
- Chart.js: Data visualization
- Andy Weir: Author of Project Hail Mary, the creative inspiration behind this project

---

##📄 License
MIT License
