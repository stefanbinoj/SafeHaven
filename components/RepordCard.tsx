import AntDesign from "@expo/vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const RepordCard = ({ route, navigation }: { route: any; navigation: any }) => {
  const { id } = route.params; // Access the item from route.params
  const [reportData, setReportData] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {};
    fetchReportData();
  }, [id]);

  if (!reportData) {
    return (
      <>
        <TouchableOpacity
          style={styles.backArrow}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="back" size={30} color="black" />
        </TouchableOpacity>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            fontSize: 32,
          }}
        >
          {id}
        </Text>
      </>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="back" size={30} color="black" />
      </TouchableOpacity>
      <Text>{reportData?.title}</Text>
      <Text>{reportData?.content}</Text>
    </View>
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
});
