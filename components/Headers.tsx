import { StyleSheet, SafeAreaView, Image } from "react-native";
import React from "react";
import images from "@/assets/images/images.config";

const Headers = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image height={50} resizeMode="contain" source={images.safeHaven} />
    </SafeAreaView>
  );
};

export default Headers;

const styles = StyleSheet.create({
  container: {
    top: 0,
    flexDirection: "row",
    justifyContent: "center",
    padding: 15,
    height: 50,
    alignItems: "center",
    backgroundColor: "white",
  },
});
