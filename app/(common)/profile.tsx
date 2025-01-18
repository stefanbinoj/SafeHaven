import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Headers from "@/components/Headers";
import UserDetails from "@/components/UserDetails";

const Profile = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <Headers />
      <TouchableOpacity
        style={styles.backArrow}
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="back" size={30} color="black" />
      </TouchableOpacity>
      <UserDetails />
    </View>
  );
};
const styles = StyleSheet.create({
  backArrow: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 10,
  },
});

export default Profile;
