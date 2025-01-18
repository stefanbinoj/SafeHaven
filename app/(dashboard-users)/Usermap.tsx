import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const UserMap = () => {
  const [region, setRegion] = useState({
    latitude: 9.9312,
    longitude: 76.2673,
    latitudeDelta: 0.022,
    longitudeDelta: 0.021,
  });

  const [location, setLocation] = useState({
    latitude: 9.9312,
    longitude: 76.2673,
  });

  useEffect(() => {
    // navigator.geolocation.watchPosition(
    //   (position) => {
    //     console.log(position);
    //     const { latitude, longitude } = position.coords;
    //     //setLocation({ latitude, longitude });
    //   },
    //   (error) => console.error(error),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    // );
  }, []);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width, height }}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)} // Update region on movement
      >
        {/* Marker to pin a location */}
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title="My Marker"
        />
      </MapView>
    </View>
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

export default UserMap;
