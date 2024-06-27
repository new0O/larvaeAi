import React, { useEffect, useState } from "react";
import {
  getLatestSensorData,
  getExistingImages,
  createWebSocket,
} from "../Api";

export default function Home() {
  const [selectedCamera, setSelectedCamera] = useState("ESP32_Cam_1");
  const [latestImage, setLatestImage] = useState(null);
  const [latestSensorData, setLatestSensorData] = useState({
    ESP32_Cam_1: null,
    ESP32_Cam_2: null,
    ESP32_Cam_3: null,
  });
  const [imageWithTimestamp, setImageWithTimestamp] = useState(null);

  // Fetch all sensor data initially and set up WebSocket connection
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [data1, data2, data3] = await Promise.all([
          getLatestSensorData("ESP32_Cam_1"),
          getLatestSensorData("ESP32_Cam_2"),
          getLatestSensorData("ESP32_Cam_3"),
        ]);

        setLatestSensorData({
          ESP32_Cam_1: data1,
          ESP32_Cam_2: data2,
          ESP32_Cam_3: data3,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const socket = createWebSocket();

    socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      console.log("Received data from WebSocket:", parsedData);
      if (parsedData.type === "sensor") {
        setLatestSensorData((prevSensorData) => ({
          ...prevSensorData,
          [parsedData.device_id]: parsedData.data,
        }));
      }
    };

    return () => {
      socket.close();
    };
  }, []);

  useEffect(() => {
    const fetchLatestImage = async () => {
      try {
        const images = await getExistingImages(selectedCamera);
        console.log("Fetched images:", images);
        if (images.length > 0) {
          setLatestImage(images[images.length - 1]);
        } else {
          setLatestImage(null);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };
    fetchLatestImage();
  }, [selectedCamera]);

  useEffect(() => {
    if (latestImage) {
      const image = new Image();
      image.src = `data:image/jpeg;base64,${latestImage.processed_image}`;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(
          new Date(latestImage.timestamp).toLocaleString(),
          10,
          canvas.height - 20
        );

        setImageWithTimestamp(canvas.toDataURL("image/jpeg"));
      };
    }
  }, [latestImage]);

  const renderData = (latestData) => {
    if (!latestData)
      return (
        <>
          <div className="font-semibold">
            <div className="boxh flex items-center justify-center hover:scale-105 s transition-transform duration-300">
              Water Level: <br /> N/A
            </div>
            <div className="boxh flex items-center justify-center hover:scale-105 transition-transform duration-300">
              Humidity:
              <br /> N/A
            </div>
            <div className="boxh flex items-center justify-center hover:scale-105 transition-transform duration-300">
              Temperature: <br /> N/A
            </div>
            <div className="boxh flex items-center justify-center hover:scale-105 transition-transform duration-300">
              Water Temperature: <br /> N/A
            </div>
          </div>
        </>
      );

    return (
      <>
        <div className="font-semibold">
          <div className="boxh flex items-center justify-center hover:scale-105 transition-transform duration-300 text-center">
            Water Level: <br />
            {latestData.water_level} %
          </div>
          <div className="boxh flex items-center justify-center hover:scale-105 transition-transform duration-300 text-center">
            Humidity: <br />
            {latestData.humidity} %
          </div>
          <div className="boxh flex items-center justify-center hover:scale-105 transition-transform duration-300 text-center">
            Temperature: <br />
            {latestData.temperature} °C
          </div>
          <div className="boxh flex items-center justify-center hover:scale-105 transition-transform duration-300 text-center">
            Water Temperature: <br />
            {latestData.waterTemp} °C
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="container mx-auto bg-gray-100 p-6 rounded-lg shadow-lg">
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3 p-4 bg-white cutive-mono-regular rounded-lg shadow-md flex flex-col items-center relative">
          <select
            value={selectedCamera}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="mb-4 p-2 border font-semibold border-gray-300 rounded"
          >
            <option value="ESP32_Cam_1">ESP32 Camera 1</option>
            <option value="ESP32_Cam_2">ESP32 Camera 2</option>
            <option value="ESP32_Cam_3">ESP32 Camera 3</option>
          </select>
          {imageWithTimestamp && (
            <img
              src={imageWithTimestamp}
              alt="ESP32 Camera"
              className="w-full h-auto rounded"
            />
          )}
        </div>
        <div className="col-span-1 p-4 cutive-mono-regular bg-white rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-2 text-center">
            ESP32 Cam 1
          </div>
          {renderData(latestSensorData.ESP32_Cam_1)}
        </div>
        <div className="col-span-1 p-4 cutive-mono-regular bg-white rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-2 text-center">
            ESP32 Cam 2
          </div>
          {renderData(latestSensorData.ESP32_Cam_2)}
        </div>
        <div className="col-span-1 p-4 cutive-mono-regular bg-white rounded-lg shadow-md">
          <div className="text-xl font-semibold mb-2 text-center">
            ESP32 Cam 3
          </div>
          {renderData(latestSensorData.ESP32_Cam_3)}
        </div>
      </div>
    </div>
  );
}
