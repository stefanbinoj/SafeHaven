import images from "@/assets/images/images.config";
import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Animated } from "react-native";

const CustomLoadingAnimation = () => {
  const size = new Animated.Value(1);
  const position = new Animated.Value(0);
  const [backgroundColor, setBackgroundColor] = useState("transparent"); // State for background color

  useEffect(() => {
    // Start the animation when the component mounts
    Animated.timing(size, {
      toValue: 0.3,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(position, {
      toValue: 550, // Move the image downward (you can adjust the value depending on your screen size)
      duration: 500, // Same duration for position movement
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          {
            backgroundColor,
            transform: [
              { translateY: position }, // Animate vertical movement
              { scale: size }, // Animate size reduction
            ],
          },
        ]}
      >
        <Image source={images.whistle_big_active} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: "40%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f0f0f0", // Set background color
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  //   image: {
  //     width: 100, // Original size of the image (can be dynamic as needed)
  //     height: 100, // Original size of the image
  //   },
});

export default CustomLoadingAnimation;
