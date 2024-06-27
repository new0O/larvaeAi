import axios from "axios";

const API_URL = "http://192.168.8.101:8080";
// const API_URL = "http://192.168.1.11:8080";
// const API_URL = "http://192.168.52.204:8080";

// Function to create a WebSocket connection
export const createWebSocket = () => {
  const websocket = new WebSocket("ws://192.168.8.101:8080/ws");
  // const websocket = new WebSocket("ws://192.168.1.11:8080/ws");
  // const websocket = new WebSocket("ws://192.168.52.204:8080/ws");

  websocket.onopen = (event) => {
    console.log("WebSocket connected");
  };

  websocket.onmessage = (event) => {
    console.log("Received message:", event.data);
  };

  websocket.onclose = (event) => {
    console.log("WebSocket closed");
  };

  return websocket;
};

// Function to fetch existing processed images
export const getExistingImages = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/processed-images`, {
      params: { device_id: deviceId },
    });
    console.log("success", response);
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
    console.log("success", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    throw error;
  }
};

// Function to fetch existing AggregatedData
export const getAggregatedData = async (deviceId, startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/aggregated-data`, {
      params: { device_id: deviceId, start_date: startDate, end_date: endDate },
    });
    console.log("Aggregated data fetched successfully", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching aggregated data:", error);
    throw error;
  }
};

// Function to fetch latest sensor data
export const getLatestSensorData = async (deviceId) => {
  try {
    const response = await axios.get(`${API_URL}/latest-sensor-data`, {
      params: { device_id: deviceId },
    });
    console.log("Latest sensor data fetched successfully", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching latest sensor data:", error);
    throw error;
  }
};
