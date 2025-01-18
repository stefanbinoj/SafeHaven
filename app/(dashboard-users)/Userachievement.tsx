import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import images from "@/assets/images/images.config";
import NavBar from "../(common)/navbar";
const UserAchievement = ({ navigation }: { navigation: any }) => {
  return (
    <View>
      <NavBar />
      <View style={styles.container}>
        <Image source={images.reward} style={styles.image} />
        <Text style={styles.boldText}>Your available balance : </Text>
        <Text style={styles.money}>$2,231.23</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text}>REEDEM REWARDS</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.push("profile");
          }}
        >
          <Text style={styles.text}>VIEW REPORT HISTORY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("UserReport");
          }}
        >
          <Text style={styles.text}>EARN MORE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserAchievement;

const styles = StyleSheet.create({
  container: {
    height: "91%",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
    borderRadius: 20,
    margin: 10,
  },
  image: {
    marginTop: 30,
    marginBottom: 30,
  },
  boldText: {
    fontSize: 28,
    fontWeight: "bold",
  },
  money: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#0DBEFF",
    margin: 10,
    width: "80%",
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 12,
    borderBottomWidth: 2,
    borderRightWidth: 1,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
