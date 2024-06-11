import React, { useState, useEffect } from "react";

const History = () => {
  const [processedImageData, setProcessedImageData] = useState(null);
  const [detectionsCount, setDetectionsCount] = useState(0);
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    // Fetch data from your FastAPI server
    fetchProcessedData();
    fetchSensorData();
  }, []);

  const fetchProcessedData = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.177:8080/images/ESP32_Cam_1"
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const latestImage = data[0]; // Assuming data is sorted by timestamp
        setProcessedImageData(latestImage.processed_image);
        setDetectionsCount(latestImage.detections_count);
      }
    } catch (error) {
      console.error("Error fetching processed image data:", error);
    }
  };

  const fetchSensorData = async () => {
    try {
      const response = await fetch(
        "http://192.168.100.177:8080/sensor-data/ESP32_Cam_1"
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const latestSensorData = data[0]; // Assuming data is sorted by timestamp
        setSensorData(latestSensorData);
      }
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  };

  return (
    <div>
      {processedImageData && (
        <img
          src={`data:image/jpeg;base64,${processedImageData}`}
          alt="Processed Image"
        />
      )}
      <p>Detections Count: {detectionsCount}</p>
      {sensorData && (
        <div>
          <p>Device ID: {sensorData.device_id}</p>
          <p>Water Level: {sensorData.water_level}</p>
          <p>Humidity: {sensorData.humidity}</p>
          <p>Temperature: {sensorData.temperature}</p>
          <p>Water Temperature: {sensorData.waterTemp}</p>
        </div>
      )}
    </div>
  );
};

export default History;
