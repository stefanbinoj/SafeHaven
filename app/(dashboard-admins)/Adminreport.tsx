import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import { LinearGradient as LinearGradientExpo } from "expo-linear-gradient";
import ReportList from "@/components/ReportList";
import SearchBar from "@/components/SearchBar";
const AdminReport = () => {
  return (
    <SafeAreaView>
      <SearchBar />
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
          <LinearGradientExpo
            colors={["#77DAFF36", "#8948FF36"]} // Gradient colors
            start={{ x: 0, y: 0 }} // top-left
            end={{ x: 1, y: 1 }} // bottom-right
            style={styles.gradientContainer}
          >
            <ReportList admin={true} />
          </LinearGradientExpo>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AdminReport;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    margin: 10,
  },
  svgContainer: {},
  gradientContainer: {
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
  },
  container2: {
    height: "90%",
    marginHorizontal: 20,
  },
});
