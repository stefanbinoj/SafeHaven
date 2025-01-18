import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginPage from "."; // Login component
import OTPPage from "./otpPage"; // OTP component
import UserDashboard from "../(dashboard-users)/_layout";
import AdminDashboard from "../(dashboard-admins)/_layout";

const Stack = createStackNavigator();

export default function LoginSession() {
  return (
    // <Tabs
    //   screenOptions={{
    //     tabBarActiveTintColor: "blue",
    //     headerShown: false,
    //   }}
    // >
    //   <Tabs.Screen
    //     name="index"
    //     options={{
    //       title: "Tab One",
    //     }}
    //   />
    //   <Tabs.Screen
    //     name="two"
    //     options={{
    //       title: "Tab Two",
    //     }}
    //   />
    // </Tabs>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="OTP"
        component={OTPPage}
      />
      {/* <Stack.Screen
        name="Users"
        component={UserDashboard}
        options={{ headerShown: false }} // Hide the header for TabNavigator
      />
      <Stack.Screen
        name="Admins"
        component={AdminDashboard}
        options={{ headerShown: false }} // Hide the header for TabNavigator
      /> */}
    </Stack.Navigator>
  );
}
