import { useEffect, useState } from 'react';
import { Chart } from '@highcharts/react';
import { Accessibility } from '@highcharts/react/options/Accessibility';
import { ColumnSeries } from '@highcharts/react/series/Column';
import { getAuroraGradient, getStormLevel, getStormDescription } from '../utils/kpUtils.ts';

interface KpIndexVariables {
  time_tag: string;
  kp: number;
  observed: string;
}

interface KpCustomData {
  statusType?: string;
  stormLevel?: string;
  description?: string;
}

export default function KpIndex() {

  const [data, setData] = useState<Highcharts.PointOptionsObject[]>([]);

  const [currentStorm, setCurrentStorm] = useState<{
    stormLevel?: string; 
    description?: string;
  }>({});

  useEffect(() => {

    const fetchData = async () => {

      try {

        const response = await fetch(
          "https://services.swpc.noaa.gov/products/noaa-planetary-k-index-forecast.json"
        );

        const json: KpIndexVariables [] = await response.json();
        
        function formatNOAAtimestamps(timestamp : string) {
          return new Date(timestamp + "Z").getTime();
        } 

        const formatted: Highcharts.PointOptionsObject[] = json.map((row) => {
          /* normalize */
          const kp = Number(row.kp);
          const timestamp = formatNOAAtimestamps(row.time_tag);
          const statusType = row.observed;
          
          return {
            x: timestamp, 
            y: kp,
            color: getAuroraGradient(kp),
            custom: {
              statusType: statusType,
              stormLevel: getStormLevel(kp),
              description: getStormDescription(kp)
            } as KpCustomData
          }  
        });

        setData(formatted);

        const latestObserved = formatted.filter(point => {
          const custom = point.custom as KpCustomData;
          return custom.statusType === "observed";
        }) 
        .at(-1); 

        setCurrentStorm(
          (latestObserved?.custom as KpCustomData) ?? {}
        ); 

      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 60_000);

    return () => clearInterval(interval);

  }, []);

  const estimatedStart = data.find(
    point =>
      (point.custom as KpCustomData)?.statusType === "estimated"
  )?.x as number | undefined;

  const predictedStart = data.find(
    point =>
      (point.custom as KpCustomData)?.statusType === "predicted"
  )?.x as number | undefined;

  const observedStart = data.at(0)?.x as number | undefined;
  const forecastEnd = data.at(-1)?.x as number | undefined;


  const optionsChart: Highcharts.Options = {
    chart: {
      backgroundColor: "#0000",
      borderRadius: 10,
      spacing: [25, 25, 30, 15]
    },
    title: {
      text: "Planetary K-Index and Forecast",
      style: {
        color: "whitesmoke",
        fontSize: "1.3rem",
        fontWeight: "200"
      }
    },
    subtitle: {
      text: currentStorm?.stormLevel
        ? `Current Level: ${currentStorm.description} (${currentStorm.stormLevel})`
        : `Current Level: ${currentStorm?.description ?? "Unknown"}`,
      style: {
        color: "#aaa",
        fontSize: "0.95rem"
      } 
    },
    xAxis: {
      type: "datetime",
      plotBands: [
        ...(observedStart && estimatedStart
          ? [{
              from: observedStart,
              to: estimatedStart,
              color: "rgba(180,180,180,0.00)",
              label: {
                useHTML: true,
                text: `<span>●</span>`,
                align: "center" as const,
                style: { 
                  color: "#999",
                  fontSize: "14px",
                  padding: "5px"
                }
              }
          }]
        : []),

        ...(estimatedStart && predictedStart
          ? [{
              from: estimatedStart,
              to: predictedStart,
              color: "rgba(180,180,180,0.08)",
              label: {
                useHTML: true,
                text: `<span>◐</span>`,
                align: "center"  as const,
                style: { 
                  color: "#999",
                  fontSize: "18px",
                  padding: "5px 15px 5px"
                }
              }
          }]
        : []),
        
        ...(predictedStart && forecastEnd
          ? [{
            from: predictedStart,
            to: forecastEnd,
            color: "rgba(180,180,180,0.14)",
            label: {
              useHTML: true,
              text: `<span>△</span>`,
              align: "center" as const,
              style: {
                color: "#999",
                fontSize: "16px",
                padding: "5px"
              }
            }
          }]
        : [])
      ],
      labels: {
        formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
          const date = new Date(this.value as number)

          const day = date.toLocaleDateString([], {
            day: "2-digit",
            month: "short"
          });

          const html = `<div style="padding:4px 0px;">
            <div style="font-size:11px;color:#aaa;">${day}</div>
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
        text: "Kp Index",
        style: { color: "#ccc" } 
      },
      min: 0,
      max: 9
    },
    legend: {
      enabled: false
    },
    tooltip : {
      shared: true,
      useHTML: true,
      followPointer: true,
      snap: 0,
      animation: false,
      backgroundColor: "#1118",
      borderColor: "#444",
      style: { color: "#eee" },

      formatter: function (this: Highcharts.Point) {

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

        const custom = this.options.custom as KpCustomData;

        return `
          <div style="padding:6px 8px;">
            <div style="font-size:12px;color:#aaa;margin-bottom:6px;">
              ${day} | ${time}
            </div>
          
            <div style="font-size:15px;">
              <b>Kp ${this.y}</b>
              ${custom.stormLevel ? `(${custom.stormLevel})` : ""}
              | ${custom.statusType}<br>
            </div>
              
            <div style="margin-top:4px;color:#ccc;">
              ${custom.description}
            </div> 
          </div>
        `;
      }
    }, 
    credits: {
      position: {
        verticalAlign: 'bottom',
        x: -25,
        y: -5
      }
    }
  };

  const optionsColumn: Highcharts.PlotColumnOptions = {
    borderWidth: 0
  };

  return(
    <>
      <Chart options={optionsChart}>
        <Accessibility />
        <ColumnSeries data={data} options={optionsColumn}/> 
      </Chart>
    </>
  );  
}
