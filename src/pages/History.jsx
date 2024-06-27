import React, { useState, useEffect } from "react";
import DataChart from "../components/Datachart";

const devices = ["ESP32_Cam_1", "ESP32_Cam_2", "ESP32_Cam_3"];

const History = () => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // useEffect for setting up the interval for automatic refresh
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
    }, 30 * 60 * 1000); // 30 minutes

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="date-picker mb-4 p-2 rounded shadow-sm flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <label
            className="text-gray-700 text-sm font-medium"
            htmlFor="startDate"
          >
            Start Date:
          </label>
          <input
            type="date"
            id="startDate"
            className="shadow-sm appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="flex items-center space-x-2">
          <label
            className="text-gray-700 text-sm font-medium"
            htmlFor="endDate"
          >
            End Date:
          </label>
          <input
            type="date"
            id="endDate"
            className="shadow-sm appearance-none border rounded py-1 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-sm"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>
      {devices.map((device) => (
        <div key={device} className="mb-4">
          <h2 className="text-xl font-bold mb-2">{device}</h2>
          <div className="bg-white p-4 rounded shadow">
            <DataChart
              deviceId={device}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default History;
