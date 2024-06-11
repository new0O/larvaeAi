import React, { useEffect, useState } from "react";
import {
  getExistingImages,
  getExistingSensorData,
  createWebSocket,
} from "./api";

const Appp = () => {
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

    socket.on("message", (data) => {
      if (data.type === "image") {
        setImages((prevImages) => [...prevImages, data.data]);
      } else if (data.type === "sensor") {
        setSensorData((prevSensorData) => [...prevSensorData, data.data]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Processed Images</h1>
      <ul>
        {images.map((img) => (
          <li key={img.id}>
            <p>Device ID: {img.device_id}</p>
            <p>Original Filename: {img.original_filename}</p>
            <p>Processed Filename: {img.processed_filename}</p>
            <p>Detections: {JSON.stringify(img.detections)}</p>
            <p>Timestamp: {img.timestamp}</p>
          </li>
        ))}
      </ul>

      <h1>Sensor Data</h1>
      <ul>
        {sensorData.map((data) => (
          <li key={data.id}>
            <p>Device ID: {data.device_id}</p>
            <p>Water Level: {data.water_level}</p>
            <p>Humidity: {data.humidity}</p>
            <p>Temperature: {data.temperature}</p>
            <p>Water Temperature: {data.waterTemp}</p>
            <p>Timestamp: {data.timestamp}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Appp;
