import AuthProvider, { useAuth } from "@/providers/authProvider";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { Alert, StatusBar } from "react-native";

export default function RootLayout() {
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
