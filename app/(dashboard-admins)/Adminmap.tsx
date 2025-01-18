import { View, Text, Dimensions } from "react-native";
import React from "react";
import FullMap from "@/components/FullMap";

const { width, height } = Dimensions.get("window");

const AdminMap = () => {
  return (
    <View style={{ flex: 1 }}>
      <FullMap
        width={width}
        height={height}
        showHeatMapProp={true}
        showMarkerProp={false}
      />
    </View>
  );
};

export default AdminMap;
