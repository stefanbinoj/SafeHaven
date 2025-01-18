import { Dimensions, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Svg, {
  Text as SvgText,
  Defs,
  LinearGradient,
  Stop,
} from "react-native-svg";
import ReportList from "./ReportList";
const { height } = Dimensions.get("window");

const UserDetails = ({}) => {
  return (
    <SafeAreaView style={{ height: height }}>
      <View style={[styles.container]}>
        <Svg height={80} style={styles.svgContainer}>
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
            User details
          </SvgText>
        </Svg>
        <Text style={styles.text}>User id: buddha</Text>
        <Text style={styles.text}>Mobile no: +91 9322342789</Text>
        <View style={styles.subContainer}>
          <View style={styles.smallContainer}>
            <Text style={styles.subText}>Reports Submitted: 2</Text>
            <Text style={styles.subText}>Reports Rewarded: 2</Text>
          </View>
          <View style={styles.smallContainer}>
            <Text style={styles.subText}>Strikes: 0</Text>
            <Text style={styles.subText}>
              *Obtaining 3 strikes will result in a permanent ban
            </Text>
          </View>
        </View>
      </View>
      <View style={[styles.container]}>
        <Svg height={90} style={[styles.svgContainer]}>
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
        <View style={styles.container2}>
          <ReportList />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
  },
  container2: {
    maxHeight: 450,
  },
  svgContainer: {},
  text: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
    marginLeft: 20,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  subText: {
    width: 160,
  },
  smallContainer: {
    marginTop: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
