import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AdminMap from "./Adminmap";
import AdminProfile from "./profile";
import AdminReport from "./Adminreport";
import CustomTabbar from "@/components/CustomTabbar";
import React, { useEffect, useState } from "react";
import CustomLoadingAnimation from "@/animation/default";
import { createStackNavigator } from "@react-navigation/stack";
import RepordCard from "@/components/RepordCard";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const AdminReportStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminReportCard"
        component={AdminReport}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IndividualReport"
        component={RepordCard}
        options={{ headerShown: false }}
      />
      {/* Add more Stack screens if needed */}
    </Stack.Navigator>
  );
};

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false); // Hide loading animation after 2 seconds
    }, 500);

    return () => clearTimeout(id); // Cleanup timeout on unmount
  }, []);
  return (
    <>
      {loading ? (
        // Show loading animation while `loading` is true
        <CustomLoadingAnimation />
      ) : (
        <Tab.Navigator
          initialRouteName="AdminReport"
          tabBar={(props) => <CustomTabbar {...props} />}
        >
          <Tab.Screen
            name="AdminMap"
            component={AdminMap}
            options={{ headerShown: false, tabBarLabel: "Map" }}
          />
          <Tab.Screen
            name="AdminReport"
            component={AdminReportStack}
            options={{ headerShown: false, tabBarLabel: "Reports" }}
          />
          <Tab.Screen
            name="AdminProfile"
            component={AdminProfile}
            options={{ headerShown: false, tabBarLabel: "Profile" }}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

export default AdminDashboard;
