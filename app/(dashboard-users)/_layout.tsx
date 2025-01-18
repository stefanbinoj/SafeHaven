import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMap from "./Usermap"; // Example screen
import UserReport from "./Userreport";
import UserAchievement from "./Userachievement";
import { createStackNavigator } from "@react-navigation/stack";
import ProfileNavigation from "../(common)/_layout";
import CustomTabbar from "@/components/CustomTabbar";
import React, { useEffect, useState } from "react";
import CustomLoadingAnimation from "@/animation/default";

const Tab = createBottomTabNavigator();

const UserTabNavigation = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setLoading(false); // Hide loading animation after 2 seconds
    }, 2500);

    return () => clearTimeout(id); // Cleanup timeout on unmount
  }, []);
  return (
    <>
      {loading ? (
        // Show loading animation while `loading` is true
        <CustomLoadingAnimation />
      ) : (
        <Tab.Navigator
          initialRouteName="UserReport"
          tabBar={(props) => <CustomTabbar {...props} />}
        >
          <Tab.Screen
            name="UserMap"
            component={UserMap}
            options={{ headerShown: false, tabBarLabel: "Map" }}
          />
          <Tab.Screen
            name="UserReport"
            component={UserReport}
            options={{ headerShown: false, tabBarLabel: "Report" }}
          />
          <Tab.Screen
            name="UserAchievement"
            component={UserAchievement}
            options={{ headerShown: false, tabBarLabel: "Rewards" }}
          />
        </Tab.Navigator>
      )}
    </>
  );
};

export type RootStackParamList = {
  dashboard: undefined;
  profile: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const UserDashboard = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="dashboard"
        component={UserTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={ProfileNavigation}
        options={{ headerShown: false }}
      />
      {/* Add more Stack screens if needed */}
    </Stack.Navigator>
  );
};

export default UserDashboard;
