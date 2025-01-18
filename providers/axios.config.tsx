import axios from "axios";
const ACC_BACKEND_BASE_URL = process.env.NEXT_PUBLIC_ACC_BACKEND_BASE_URL;

export const axiosAccPublic = axios.create({
  baseURL: ACC_BACKEND_BASE_URL,
});

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { refreshTheAccessToken } from "./authUtils";

// Attach access token to request header
const attachAccessToken = async (config: any) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
};

// Axios instance with retry and token logic
export const axiosWithToken = axios.create({
  baseURL: ACC_BACKEND_BASE_URL,
});

// Attach the access token for all requests
axiosWithToken.interceptors.request.use(attachAccessToken);

// Add retry logic with token refresh
axiosWithToken.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (
      !originalConfig._retry &&
      (error.response?.status === 401 || error.code === "ECONNABORTED")
    ) {
      console.log("Token expired, retrying...");

      originalConfig._retry = true;

      try {
        // Attempt to refresh the token
        const newAccessToken = await refreshTheAccessToken();
        if (newAccessToken) {
          originalConfig.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return await axiosWithToken(originalConfig);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // Redirect to login screen if refresh fails
        const navigation = useNavigation();
        navigation.navigate("Login"); // Redirect to login screen

        return Promise.reject(refreshError);
      }
    }

    // If the token refresh fails or there is a 403/401 error, redirect to login
    if (error.response?.status === 403 || error.response?.status === 401) {
      const navigation = useNavigation();
      navigation.navigate("Login"); // Navigate to login screen
    }

    return Promise.reject(error);
  }
);
