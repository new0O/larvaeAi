import axios from "axios";
import { io } from "socket.io-client";

const API_URL = "http://192.168.1.11:8080";

// Function to fetch existing processed images
export const getExistingImages = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/processed-images`, {
      params: { device_id: deviceId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching processed images:", error);
    throw error;
  }
};

// Function to fetch existing sensor data
export const getExistingSensorData = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/sensor-data`, {
      params: { device_id: deviceId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
};

// Function to create a WebSocket connection
export const createWebSocket = () => {
  const socket = io("ws://192.168.1.11:8080/ws");

  socket.on("connect", () => {
    console.log("WebSocket connected");
  });

  socket.on("disconnect", () => {
    console.log("WebSocket disconnected");
  });

  socket.on("connect_error", (error) => {
    console.error("WebSocket connection error:", error);
  });

  return socket;
};
