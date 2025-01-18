import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/assets/images/images.config";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../(dashboard-users)/_layout"; // Import your stack param list

type Navigation = NavigationProp<RootStackParamList, "dashboard">;

const NavBar = () => {
  const navigation = useNavigation<Navigation>(); // Explicitly type navigation

  return (
    <SafeAreaView style={styles.container}>
      <Image height={50} resizeMode="contain" source={images.safeHaven} />
      <TouchableOpacity
        onPress={() => {
          navigation.push("profile");
        }}
      >
        <Image
          height={50}
          width={50}
          resizeMode="contain"
          source={images["profile-active"]}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    //position: "absolute",
    top: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    height: 50,
    alignItems: "center",
    backgroundColor: "white",
  },
});
