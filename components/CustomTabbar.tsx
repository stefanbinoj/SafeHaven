import {
  View,
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import images from "@/assets/images/images.config";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface WrapperProps {
  children: any;
  routeName: string;
  isFocused: boolean;
}
const CustomWrapper: React.FC<WrapperProps> = ({
  children,
  routeName,
  isFocused,
}) => {
  if (!isFocused) return <>{children}</>;
  else {
    switch (routeName) {
      case "Map":
        return (
          <LinearGradient
            colors={["#0DBEFF", "#4B83FF"]} // Gradient colors
            start={{ x: 0, y: 0 }} // top-left
            end={{ x: 1, y: 1 }} // bottom-right
            style={styles.tabItem}
          >
            {children}
          </LinearGradient>
        );

      case "Report":
      case "Reports":
        return (
          <LinearGradient
            colors={["#4B83FF", "#8948FF"]} // Gradient colors
            start={{ x: 0, y: 0 }} // top-left
            end={{ x: 1, y: 1 }} // bottom-right
            style={styles.tabItem}
          >
            {children}
          </LinearGradient>
        );
      case "Rewards":
      case "Profile":
        return (
          <LinearGradient
            colors={["#8948FF", "#C70DFF"]} // Gradient colors
            start={{ x: 0, y: 0 }} // top-left
            end={{ x: 1, y: 1 }} // bottom-right
            style={styles.tabItem}
          >
            {children}
          </LinearGradient>
        );
    }
  }
};

const CustomTabbar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
          ``;
        };

        return (
          <CustomWrapper
            routeName={options.tabBarLabel as string}
            isFocused={isFocused}
            key={route.key}
          >
            <AnimatedTouchableOpacity
              layout={LinearTransition.duration(1000).springify()}
              key={route.key}
              onPress={onPress}
              style={[styles.tabItem]}
            >
              {getIcons(options.tabBarLabel as string, "white", isFocused)}
              {isFocused && (
                <Animated.Text
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(200)}
                  style={styles.text}
                >
                  {label as string}
                </Animated.Text>
              )}
            </AnimatedTouchableOpacity>
          </CustomWrapper>
        );
      })}
    </View>
  );

  function getIcons(routeName: string, color: string, isFocused: boolean) {
    switch (routeName) {
      case "Map":
        if (!isFocused) return <Image source={images["map-active"]} />;
        return <Image source={images["map-white"]} />;
      case "Report":
      case "Reports":
        if (!isFocused) return <Image source={images["whistle-active"]} />;
        return <Image source={images["whistle-white"]} />;
      case "Rewards":
        if (!isFocused) return <Image source={images["rewards-active"]} />;
        return <Image source={images["rewards-white"]} />;
      case "Profile":
        if (!isFocused) return <Image source={images["profile-active"]} />;
        return <Image source={images["profile-white"]} />;
    }
  }
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
    //width: "80%",
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 20,
    borderRadius: 40,
    paddingHorizontal: 5,
    paddingVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    paddingHorizontal: 19,
    paddingVertical: 7,
  },
  text: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
export default CustomTabbar;
