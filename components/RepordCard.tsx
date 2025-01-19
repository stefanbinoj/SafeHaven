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
  const { id, admin } = route.params; // Access the item from route.params
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
        <Svg height={80}>
          <Defs>
            <LinearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#0DBEFF" stopOpacity="1" />
              <Stop offset="100%" stopColor="#C70DFF" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          <SvgText
            fill="url(#grad1)" // Apply the gradient to the text
            fontSize="38"
            fontWeight="bold"
            x="12"
            y="60"
          >
            Report Details
          </SvgText>
        </Svg>
        <Text style={styles.secondText}>Report id: {}</Text>
        <Text style={[styles.secondText]}>Report status: {}</Text>
        <View style={styles.lineBreakElementContainer}>
          <LinearGradientExpo
            colors={["#000", "#000", "#000"]} // Fading effect with black color in the middle
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.line}
          />
        </View>
        <Text style={styles.mainText}>
          Attachments <AntDesign name="edit" size={30} color="black" />
        </Text>
        <View style={styles.photoContainer}>
          <Image source={images.play_video} />
        </View>
        <View style={styles.lineBreakElementContainer}>
          <LinearGradientExpo
            colors={["#000", "#000", "#000"]} // Fading effect with black color in the middle
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.line}
          />
        </View>
        <Text style={[styles.mainText]}>
          Explanations <AntDesign name="edit" size={30} color="black" />
        </Text>
        <Text style={styles.smallText}>Report submission date : 19-01-25</Text>
        <Text style={styles.smallText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum....Read more.
        </Text>
        <Text style={[styles.mainText, { marginTop: 10 }]}>
          Location <AntDesign name="edit" size={30} color="black" />
        </Text>
        <View style={styles.photoContainer2}>
          <FullMap
            width={300}
            height={150}
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
    marginVertical: 0,
    borderRadius: 30,
    backgroundColor: "white",
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  lineBreakElementContainer: {
    flexDirection: "row", // You can change to 'column' depending on where you want the line (horizontal or vertical)
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    width: "75%", // Adjust line width
    height: 1, // This is the thickness of the line
    borderRadius: 1, // Optional: to make edges smooth
  },
  photoContainer: {
    width: "90%",
    margin: 20,
    backgroundColor: "#D9D9D9",
    height: "20%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  photoContainer2: {
    width: 300,
    margin: 20,
    backgroundColor: "#D9D9D9",
    height: 150,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  secondText: {
    fontSize: 26,
    marginTop: -10,
    fontWeight: "bold",
    marginLeft: 15,
    marginBottom: 5,
  },
  mainText: {
    fontSize: 28,
    marginTop: -10,
    fontWeight: "bold",
    marginLeft: 15,
  },
  smallText: {
    marginLeft: 15,
  },
});
