import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import images from "@/assets/images/images.config";
import InputText from "@/components/InputText";
import { useState } from "react";
import CustomLoginButton from "@/components/LoginButton";
import { useAuth } from "@/providers/authProvider";
export default function LoginPage({ navigation }: { navigation: any }) {
  const { login } = useAuth();
  const [phn, setPhn] = useState("");
  const handlePressUser = () => {
    navigation.navigate("OTP", { phoneNumber: phn, user: "user" });
  };
  const handlePressAdmin = () => {
    navigation.navigate("OTP", { phoneNumber: phn, user: "admin" });
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={["#0DBEFF", "#C70DFF"]} // Gradient colors
        start={{ x: 0, y: 0 }} // top-left
        end={{ x: 1, y: 1 }} // bottom-right
        style={styles.gradientContainer}
      >
        <Image
          source={images["whistle-big"]}
          style={styles.bigImage}
          resizeMode="contain"
        />
        <Text style={styles.mainHeading}>Welcome to SafeHaven!</Text>
        <Text style={styles.subHeading}>
          Sign in using your aadhar number or phone number linked to your
          aadhar.
        </Text>
        <InputText
          label="Email"
          value={phn} // Pass the state value
          onChangeText={setPhn} // Pass the state setter
          placeholder="Phone Number"
        />
        <View style={styles.LoginButton}>
          <CustomLoginButton
            disabled={phn.length == 10 ? false : true}
            label="Login as user"
            onPress={handlePressUser}
          />
          <CustomLoginButton
            disabled={phn.length == 10 ? false : true}
            label="Login as Admin"
            onPress={handlePressAdmin}
          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  safeArea: {
    flex: 1,
  },
  bigImage: {
    alignSelf: "center",
    width: 150,
    height: 208,
  },
  mainHeading: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
  },
  subHeading: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  LoginButton: {
    marginTop: 20,
  },
});
