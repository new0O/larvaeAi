import React, { useEffect, useState } from "react";
import {
  getLatestSensorData,
  getExistingImages,
  createWebSocket,
} from "../api";

export default function Home() {
  const [selectedCamera, setSelectedCamera] = useState("ESP32_Cam_1");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [images, setImages] = useState([]);
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

  // Fetch the available images when the selected camera changes
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const fetchedImages = await getExistingImages(selectedCamera);
        console.log("Fetched images:", fetchedImages);
        setImages(fetchedImages);
        if (fetchedImages.length > 0) {
          setSelectedImageIndex(0);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [selectedCamera]);

  // Update the displayed image when the selected image changes
  useEffect(() => {
    if (images.length > 0 && selectedImageIndex < images.length) {
      const selectedImage = images[selectedImageIndex];
      const image = new Image();
      image.src = `data:image/jpeg;base64,${selectedImage.processed_image}`;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0);
        context.font = "20px Arial";
        context.fillStyle = "white";
        context.fillText(
          new Date(selectedImage.timestamp).toLocaleString(),
          10,
          canvas.height - 20
        );

        setImageWithTimestamp(canvas.toDataURL("image/jpeg"));
      };
    }
  }, [images, selectedImageIndex]);

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
          {images.length > 0 && (
            <select
              value={selectedImageIndex}
              onChange={(e) => setSelectedImageIndex(Number(e.target.value))}
              className="mb-4 p-2 border font-semibold border-gray-300 rounded"
            >
              {images.map((image, index) => (
                <option key={index} value={index}>
                  {new Date(image.timestamp).toLocaleString()}
                </option>
              ))}
            </select>
          )}
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