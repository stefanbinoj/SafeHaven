import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosAccPublic } from "./axios.config";
import { useNavigation } from "@react-navigation/native"; // For navigation

// Refresh access token
export async function refreshTheAccessToken() {
  const navigation = useNavigation(); // Using React Navigation to navigate

  try {
    const refreshToken = await AsyncStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.log("No refresh token found");
      // If no refresh token exists, navigate to the login screen
      navigation.navigate("Login");
      return null;
    }

    const response = await axiosAccPublic.post("/api/Auth/refresh", {
      refreshToken,
    });
    const { accessToken } = response.data;

    await AsyncStorage.setItem("accessToken", accessToken);

    return accessToken;
  } catch (error) {
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("accessToken");
    console.error("Error refreshing token", error);
    // Navigate to login screen if refresh fails
    navigation.navigate("Login");
    return null;
  }
}
