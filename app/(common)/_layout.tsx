import { createStackNavigator } from "@react-navigation/stack";
import Profile from "./profile";
import NavBar from "./navbar";

import RepordCard from "@/components/RepordCard";
const Stack = createStackNavigator();

const ViewReport = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileCard"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IndividualReport"
        component={RepordCard}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default function ProfileNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="Profile"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Navbar"
        component={NavBar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Profile"
        component={ViewReport}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
