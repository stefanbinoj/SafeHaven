import AuthProvider, { useAuth } from "@/providers/authProvider";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Alert, StatusBar } from "react-native";
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function RootLayout() {
  
  // Function to request location permission
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission denied", "We need location permission to access your location.");
      return;
    }

    // Fetch user's current location
    const location = await Location.getCurrentPositionAsync({});
    console.log(location);
  };

  // Request location permission when the app opens
  useEffect(() => {
    requestLocationPermission();
    requestMediaPermission();
    console.log('hi')
  }, []);

  // Function to request media permission
  const requestMediaPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
    if (status !== 'granted') {
      Alert.alert("Permission denied", "We need access to your media library.");
      return;
    }

    // You can now access the media (e.g., camera roll)
    console.log("Media permission granted");
  };
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <StatusBar
        backgroundColor="white" // Custom background color for status bar
      />
      <Stack>
        {isAuthenticated != true && (
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        )}
        <Stack.Screen
          name="(dashboard-users)"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="(dashboard-admins)"
          options={{ headerShown: false }}
        />
      </Stack>
    </>
  );
}
