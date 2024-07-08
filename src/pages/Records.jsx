import React, { useEffect, useState } from "react";
import {
  getExistingImages,
  getExistingSensorData,
  createWebSocket,
} from "../api";

const Records = () => {
  const [images, setImages] = useState([]);
  const [sensorData, setSensorData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const initialImages = await getExistingImages();
        setImages(initialImages);
        const initialSensorData = await getExistingSensorData();
        setSensorData(initialSensorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const socket = createWebSocket();

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log("Received data from WebSocket:", parsedData);
      if (parsedData.type === "image") {
        setImages((prevImages) => [...prevImages, parsedData.data]);
      } else if (parsedData.type === "sensor") {
        setSensorData((prevSensorData) => [...prevSensorData, parsedData.data]);
      }
    };

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
    };
  }, []);

  const groupByDeviceId = (data) => {
    return data.reduce((acc, item) => {
      if (!acc[item.device_id]) {
        acc[item.device_id] = [];
      }
      acc[item.device_id].push(item);
      return acc;
    }, {});
  };

  const groupedImages = groupByDeviceId(images);
  const groupedSensorData = groupByDeviceId(sensorData);

  return (
    <div>
      <h1>Processed Images</h1>
      {Object.keys(groupedImages).map((deviceId) => (
        <div key={deviceId}>
          <h2>Device ID: {deviceId}</h2>
          <ul>
            {groupedImages[deviceId].map((img) => (
              <li key={img.id}>
                <p>Original Filename: {img.original_filename}</p>
                <p>Processed Filename: {img.processed_filename}</p>
                <p>Detections: {JSON.stringify(img.detections)}</p>
                <p>Timestamp: {img.timestamp}</p>
                <img
                  src={`data:image/jpeg;base64,${img.processed_image}`}
                  alt={`Processed ${img.device_id}`}
                  style={{ width: "300px", height: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}

      <h1>Sensor Data</h1>
      {Object.keys(groupedSensorData).map((deviceId) => (
        <div key={deviceId}>
          <h2>Device ID: {deviceId}</h2>
          <ul>
            {groupedSensorData[deviceId].map((data) => (
              <li key={data.id}>
                <p>Water Level: {data.water_level}</p>
                <p>Humidity: {data.humidity}</p>
                <p>Temperature: {data.temperature}</p>
                <p>Water Temperature: {data.waterTemp}</p>
                <p>Timestamp: {data.timestamp}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Records;
