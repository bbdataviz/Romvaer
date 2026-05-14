import { useEffect, useState } from "react";
import Highcharts from "highcharts";
import { Chart, Title } from "@highcharts/react";
import { Accessibility } from '@highcharts/react/options/Accessibility';
import { AreaSplineSeries } from '@highcharts/react/series/AreaSpline';
import { variableConfig, type SolarWindVariable } from '../config/solarWindConfig';
import { timeRangeConfig, type TimeRange } from '../config/timeRangeConfig';


interface SolarWindProps {
  variable: SolarWindVariable;
  range: TimeRange;
}

export default function SolarWind({ variable, range }: SolarWindProps) {

  const minutes = timeRangeConfig[range].minutes;
  const [data, setData] = useState<[number, number][]>([]);  

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://services.swpc.noaa.gov/products/solar-wind/plasma-7-day.json" // longest time interval
          );
       
        const json = await response.json();
        const rows = json.slice(1);
        
        function convertNOAAtimestamps(timestamp : string) {
          return new Date(timestamp.replace(" ", "T") + "Z").getTime();
        }

        const latestTimestamp = convertNOAAtimestamps(rows[rows.length - 1][0]);
        const cutoff = latestTimestamp - minutes * 60 * 1000; // select a time range, convert min to ms
          
        const filteredRows = range === "7d" 
          ? rows 
          : rows.filter((row: any[]) => {
            const currentTimestamp = convertNOAAtimestamps(row[0]);
            
            return currentTimestamp >= cutoff;
          }); 
        
        const formatted = filteredRows.map((row: any[]) => {
          const value = parseFloat(row[variableConfig[variable].column]);

          const convert = variable === "temperature"
            ? value - 273.15 // Kelvin to Celsius
            : value;

          return [
            convertNOAAtimestamps(row[0]),
            convert
          ]
        }
      );
        setData(formatted);

      } catch (err) {
        console.error(err);
      }
    };
    
    fetchData();

    const interval = setInterval(fetchData, 60_000); // refresh every 60 s

    return () => clearInterval(interval);
    
  }, [variable, range, minutes]); // Dependencies


  const optionsChart: Highcharts.Options = {
    chart: {
      backgroundColor: "#0000",
      animation: false,
      borderRadius: 10,
      spacing: [25, 25, 35, 15],
    },
    title: {
      style: { 
        color: "whitesmoke", 
        fontSize: "1.3rem",
        fontWeight: "200"} 
    },
    xAxis: {
      type: "datetime",
      labels: { 
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {

          const date = new Date(this.value as number)
          
          const day = date.toLocaleDateString([], { 
            day: "2-digit",
            month: "short"
          });

          const time = date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit" 
          });

          let html = `<div style="padding:4px 0px;">
            <div style="font-size:11px;color:#aaa;">${day}<br>${time}</div>
          `;
          return html;    
        },
        style: { color: "#ccc" } 
      },
      lineColor: "#666",
      tickColor: "#666",
      crosshair: { // vertical dashed line on interaction
        color: "#888",
        width: 1,
        dashStyle: "ShortDot"
      }
    },
    yAxis: {
      labels: { style: { color: "#ccc" } },
      gridLineColor: "#444",
      title: { 
        text: variableConfig[variable].unit, 
        style: { color: "#ccc" } }
    }, 
    legend: {
      enabled: false
    }, 
    tooltip: {
      shared: true,
      useHTML: true,
      followPointer: true,
      snap: 0,
      animation: false,
      backgroundColor: "#1118",
      borderColor: "#444",
      style: { color: "#eee" },

      formatter: function (this: Highcharts.Point & {
        points?: Highcharts.Point[]; // this is a normal Highcharts point plus maybe a shared-points array
        }
      ) {
        const date = new Date(this.x as number);

        const day = date.toLocaleDateString([], {
          weekday: "short",
          day: "2-digit",
          month: "short"
        });

        const time = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit"
        });

        let html = `
          <div style="padding:6px 8px;">
            <div style="font-size:12px;color:#aaa;">${day}</div>
            <div style="font-size:14px;margin-bottom:6px;">${time}</div>
        `; 

        this.points?.forEach(point => {
          html += `
            <div style="display:flex;justify-content:space-between;gap:12px;">
              <span><b>${variable === "temperature" 
                ? point.y?.toFixed(0) 
                : point.y?.toFixed(2)}</b> 
                ${variableConfig[variable].unit}</span>
            </div>
          `;
        });

        html += `</div>`;
        return html;
      }
    }, 
    credits: {
      position: {
        verticalAlign: 'bottom',
        x: -10,
        y: -10
      }
    }
  };

  const containerProps = {
    className: "chart-element",
    style: { width: "100%", height: "100%" }
  };

  const optionsArea: Highcharts.PlotAreasplineOptions = {
    connectNulls: true, // close gaps due to missing values
    color: {
      linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1}, 
      stops: [
        [0, "#53ed7c"], // Start color
        [1, "#2a7b9bb3"] // End color (transparent)
      ]
    }, 
    lineWidth: 0.5,
    animation: { duration: 2000 }
  };

  return (
    <Chart options={optionsChart} containerProps={containerProps}>
      <Title>{variableConfig[variable].title}</Title>
      <Accessibility />
      <AreaSplineSeries data={data} options={optionsArea}/>
    </Chart>
  );
}


