import {
    Animated,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from "react-native";
  import { LinearGradient } from "expo-linear-gradient";
  import images from "@/assets/images/images.config";
  import AntDesign from "@expo/vector-icons/AntDesign";
  import React, { useEffect, useLayoutEffect, useState } from "react";
  import CustomLoginButton from "@/components/LoginButton";
  import { useAuth } from "@/providers/authProvider";
  export default function LoginPage({
    route,
    navigation,
  }: {
    route: any;
    navigation: any;
  }) {
    const {} = useAuth();
    const { phoneNumber, user } = route.params; // Access the passed parameter
    const [otp, setOtp] = useState<string>("");
  
    // Function to handle input change for each TextInput
    const handleInputChange = (text: string, index: number) => {
      let otpArray = otp.split("");
      otpArray[index] = text;
      setOtp(otpArray.join(""));
    };
  
    // Function to handle focus on the next field
    const handleNextInput = (index: number) => {
      if (index < 3) {
        // Move focus to the next input field
        const nextInput = inputs[index + 1];
        nextInput.focus();
      }
    };
  
    const inputs: any[] = [];
  
    const [timeRemaining, setTimeRemaining] = useState(60);
    const [timerActive, setTimerActive] = useState(false); // Whether the timer is active or paused
  
    // Timer interval reference
    const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  
    // Start or reset the timer
    const startTimer = () => {
      setTimerActive(true);
      // Reset time to 60 seconds
      setTimeRemaining(60);
  
      // Clear any existing interval to prevent multiple intervals
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
  
      // Set a new interval to decrease the time every second
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 1) {
            clearInterval(intervalRef.current!); // Stop timer when it reaches 0
            setTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    };
  
    // Stop the timer manually when the component unmounts
    useEffect(() => {
      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current); // Clear interval when component unmounts
        }
      };
    }, []);
  
    const formatTime = (time: number): string => {
      // Format the time in mm:ss format
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };
    const handleProceed = () => {
      if (user == "user") {
        navigation.popToTop(); // This takes you back to the parent stack (LoginScreen)
  
        navigation.replace("(dashboard-users)");
      } else {
        navigation.popToTop(); // This takes you back to the parent stack (LoginScreen)
        navigation.replace("(dashboard-admins)");
      }
    };
  
    return (
      <SafeAreaView style={styles.safeArea}>
        <LinearGradient
          colors={["#0DBEFF", "#C70DFF"]} // Gradient colors
          start={{ x: 0, y: 0 }} // top-left
          end={{ x: 1, y: 1 }} // bottom-right
          style={styles.gradientContainer}
        >
          <TouchableOpacity
            style={styles.backArrow}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="back" size={40} color="white" />
          </TouchableOpacity>
          <Image
            source={images["whistle-big"]}
            style={styles.bigImage}
            resizeMode="contain"
          />
          <Text style={styles.mainHeading}>Welcome to SafeHaven!</Text>
          <Text style={styles.subHeading}>
            Sign in using your aadhar number or phone number linked to your aadhar
            {phoneNumber}.
          </Text>
          <View style={styles.otpContainer}>
            {/* Render 4 input blocks */}
            {Array(4)
              .fill("")
              .map((_, index) => (
                <TextInput
                  key={index}
                  ref={(input) => (inputs[index] = input)} // Store references to inputs for focus handling
                  style={styles.otpInput}
                  keyboardType="numeric"
                  maxLength={1}
                  value={otp[index] || ""}
                  onChangeText={(text) => {
                    handleInputChange(text, index);
                    if (text) {
                      handleNextInput(index); // Move to next input after entering a digit
                    }
                  }}
                  onKeyPress={({ nativeEvent }) => {
                    // Move to the previous input when backspace is pressed
                    if (nativeEvent.key === "Backspace" && otp[index] === "") {
                      const prevInput = inputs[index - 1];
                      if (prevInput) prevInput.focus();
                    }
                  }}
                />
              ))}
          </View>
          <View style={styles.LoginButton}>
            <CustomLoginButton
              disabled={otp.length == 4 ? false : true}
              label="Proceed"
              onPress={handleProceed}
            />
            <CustomLoginButton
              label={timerActive ? `${formatTime(timeRemaining)}` : "Reset"}
              onPress={startTimer}
              disabled={timerActive}
            />
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
  
  const styles = StyleSheet.create({
    backArrow: {
      position: "absolute",
      top: 0,
      left: 0,
      margin: 20,
      color: "white",
    },
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
    otpContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "80%",
      marginBottom: 20,
      marginTop: 20,
    },
    otpInput: {
      width: 50,
      height: 55,
      textAlign: "center",
      fontSize: 24,
      borderWidth: 2,
      borderRadius: 8,
      borderColor: "black",
      paddingTop: 4,
      borderBottomWidth: 4,
      backgroundColor: "#ffffff",
    },
    logo: {
      width: 100, // Logo size
      height: 100, // Logo size
      marginBottom: 30,
    },
  });
  