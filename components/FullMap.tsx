import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text, Alert } from "react-native";
import MapView, { Heatmap, Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useFocusEffect } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

type locationCood = {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
};
export type locationCoodMarker = {
  latitude: number;
  longitude: number;
};
type heatMapType = {
  latitude: number;
  longitude: number;
  weight?: number;
};
type fullMapType = {
  width: number;
  height: number;
  showHeatMapProp: boolean;
  showMarkerProp: boolean;
  locationFromReport?: locationCoodMarker | undefined;
  setLocationFromReport?: (xxx: locationCoodMarker) => void;
  reportProp?: boolean;
  enableAskingUserLocation?: boolean;
};
const FullMap = ({
  width,
  height,
  showHeatMapProp,
  showMarkerProp,
  locationFromReport,
  setLocationFromReport,
  enableAskingUserLocation = true,
  reportProp,
}: fullMapType) => {
  const [region, setRegion] = useState<locationCood | undefined>();
  const [isMarkerShow, setIsMarkerShown] = useState<boolean>(false);
  const [markerLocation, setMarkerLocation] = useState<
    locationCoodMarker | undefined
  >();

  const [heatMap, setHeatMap] = useState<Array<heatMapType>>([
    { latitude: 10.0555919, longitude: 76.619372, weight: 5 }, // Strong intensity at your
    { latitude: 10.0855919, longitude: 76.629372, weight: 3 }, // Nearby
    { latitude: 10.0755919, longitude: 76.519372, weight: 2 }, // Nearby
    { latitude: 10.0655919, longitude: 76.719372, weight: 1 }, // Nearby
    { latitude: 10.0875919, longitude: 76.609372 }, // Nearby
  ]);

  // Function to request location permission
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "We need location permission to access your location."
      );
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      longitudeDelta: 0.00522,
      latitudeDelta: 0.00521,
    });
  };

  useEffect(() => {
    if (enableAskingUserLocation) {
      requestLocationPermission();
    }
    if (locationFromReport !== undefined) {
      console.log("Setting map cood", locationFromReport);
      setMarkerLocation(locationFromReport);
    }
  }, []);

  const handleMapPress = (e: any) => {
    setIsMarkerShown(true);
    const { coordinate } = e.nativeEvent;

    setMarkerLocation({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
    if (setLocationFromReport !== undefined) {
      setLocationFromReport({
        latitude: coordinate.latitude,
        longitude: coordinate.longitude,
      });
      console.log("Setted POsition is : ", locationFromReport);
    }
  };

  if (enableAskingUserLocation && !region) {
    return (
      <View style={[styles.container, { width, height }]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <MapView
      style={{ width, height }}
      region={region}
      showsUserLocation={true}
      showsScale={true}
      showsCompass={true}
      showsBuildings={true}
      onPress={handleMapPress}

      // onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Update region on movement
    >
      {showMarkerProp && isMarkerShow && (
        <Marker
          coordinate={{
            latitude: markerLocation?.latitude as number,
            longitude: markerLocation?.longitude as number,
          }}
        />
      )}
      {showHeatMapProp && (
        <Heatmap
          points={heatMap} // Pass the array of WeightedLatLng points
          opacity={0.7} // Optional: Control the opacity of the heatmap
          radius={30} // Optional: Control the radius of each heatpoint
          gradient={{
            colors: ["#00F", "#FF0", "#F00"], // Blue -> Yellow -> Red
            startPoints: [0.01, 0.2, 0.7],
            colorMapSize: 256,
          }}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default FullMap;
