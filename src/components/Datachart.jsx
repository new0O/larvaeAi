import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAggregatedData } from "../api";

const DataChart = ({ deviceId, startDate, endDate }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAggregatedData(deviceId, startDate, endDate);
        const formattedData = result.detections.map((detection) => {
          const sensors = result.sensor_data.filter(
            (sensor) =>
              sensor.timestamp === detection.timestamp &&
              sensor.device_id === deviceId
          );
          const sensorData = sensors.reduce((acc, sensor) => {
            acc["avg_water_level"] = sensor.avg_water_level.toFixed(2);
            acc["avg_humidity"] = sensor.avg_humidity.toFixed(2);
            acc["avg_temperature"] = sensor.avg_temperature.toFixed(2);
            acc["avg_waterTemp"] = sensor.avg_waterTemp.toFixed(2);

            return acc;
          }, {});
          return {
            date: new Date(detection.timestamp).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            time: new Date(detection.timestamp).toLocaleTimeString(),
            count: detection.count,
            ...sensorData,
          };
        });
        setData(formattedData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, [deviceId, startDate, endDate]);

  const sensorNames = {
    avg_water_level: "Water Level",
    avg_humidity: "Humidity",
    avg_temperature: "Temperature",
    avg_waterTemp: "Water Temperature",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const sensorData = payload[0].payload;

      return (
        <div
          style={{
            padding: "8px",
            backgroundColor: "white",
            border: "1px solid #073763",
            borderRadius: "4px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            textAlign: "left",
          }}
        >
          <p style={{ fontSize: "12px", fontWeight: "bold", margin: "4px 0" }}>
            {`Date and Time: ${sensorData.date} ${label}`}
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: "4px",
              alignItems: "center",
              fontSize: "12px",
              margin: "4px 0",
            }}
          >
            <span style={{ fontWeight: "bold" }}>Larvae Count:</span>
            <span style={{ fontWeight: "bold" }}>{payload[0].value}</span>
          </div>

          {Object.keys(sensorData)
            .filter((key) => key.startsWith("avg_"))
            .map((key) => {
              const unit =
                key === "avg_temperature"
                  ? "°C"
                  : key === "avg_humidity"
                  ? "%"
                  : key === "avg_waterTemp"
                  ? "°C"
                  : key === "avg_water_level"
                  ? "%"
                  : "";

              return (
                <div
                  key={key}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "4px",
                    alignItems: "center",
                    fontSize: "12px",
                    margin: "4px 0",
                  }}
                >
                  <span>{sensorNames[key]}:</span>
                  <span>
                    {sensorData[key]} {unit}
                  </span>
                </div>
              );
            })}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis
          dataKey="time"
          label={{
            value: "Time",
            position: "insideBottomRight",
            offset: -5,
            stroke: "#000000",
          }}
        />
        <YAxis
          label={{
            value: "Larvae Count",
            angle: -90,
            position: "insideLeft",
            stroke: "#000000",
          }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#cc0000"
          name="Larvae Count"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default DataChart;
