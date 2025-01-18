import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import Headers from "./Headers";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { LinearGradient as LinearGradientExpo } from "expo-linear-gradient";
import images from "@/assets/images/images.config";
import FullMap from "./FullMap";

const RepordCard = ({ route, navigation }: { route: any; navigation: any }) => {
  const { id } = route.params; // Access the item from route.params
  const [reportData, setReportData] = useState(null);
  const [loading, setLoadingg] = useState<boolean>(false);
  const fetchReportData = async () => {};
  useEffect(() => {
    setLoadingg(true);
    fetchReportData();
    setLoadingg(false);
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <Headers />
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="back" size={30} color="black" />
      </TouchableOpacity>
      <ScrollView style={styles.customContainer}>
        <Svg height={90}>
          <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#0DBEFF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#C70DFF" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <SvgText
            fill="url(#grad1)" // Apply the gradient to the text
            fontSize="34"
            fontWeight="bold"
            x="20"
            y="60"
          >
            Report History
          </SvgText>
        </Svg>
        <Text>Report id: {}</Text>
        <Text style={[]}>Report status: {}</Text>
        <View style={styles.lineBreakElementContainer}>
          <LinearGradientExpo
            colors={["transparent", "#000", "transparent"]} // Fading effect with black color in the middle
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.line}
          />
        </View>
        <Text>
          Attachments <AntDesign name="edit" size={30} color="black" />
        </Text>
        <View style={styles.photoContainer}>
          <Image source={images.play_video} />
        </View>
        <View style={styles.lineBreakElementContainer}>
          <LinearGradientExpo
            colors={["transparent", "#000", "transparent"]} // Fading effect with black color in the middle
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.line}
          />
        </View>
        <Text>
          Explanations <AntDesign name="edit" size={30} color="black" />
        </Text>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum....Read more.
        </Text>
        <Text>
          Location <AntDesign name="edit" size={30} color="black" />
        </Text>
        <View style={styles.photoContainer}>
          <FullMap
            width={200}
            height={300}
            showHeatMapProp={false}
            showMarkerProp={true}
            locationFromReport={undefined}
            enableAskingUserLocation={false}
          />
        </View>
      </ScrollView>
    </>
  );
};
export default RepordCard;

const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  customContainer: {
    height: "90%",
    marginHorizontal: 10,
    marginVertical: 20,
    borderRadius: 30,
  },
  lineBreakElementContainer: {
    flexDirection: "row", // You can change to 'column' depending on where you want the line (horizontal or vertical)
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    width: "70%", // Adjust line width
    height: 2, // This is the thickness of the line
    borderRadius: 1, // Optional: to make edges smooth
  },
  photoContainer: {
    width: "85%",
    margin: 20,
    backgroundColor: "#D9D9D9",
    height: "30%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
