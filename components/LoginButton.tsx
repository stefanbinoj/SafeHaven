import React from "react";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";

// Props for the custom login button
interface CustomLoginButtonProps {
  label: string; // Label of the button
  onPress: () => void; // Function to be called when the button is pressed
  disabled: boolean;
}

const CustomLoginButton = ({
  label,
  onPress,
  disabled = true,
}: CustomLoginButtonProps) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? "#d3d3d3" : "white" },
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 330,
    height: 60,
    borderWidth: 2,
    borderColor: "white",
    paddingVertical: 9, // Vertical padding
    paddingHorizontal: 30, // Horizontal padding
    borderRadius: 15, // Rounded corners
    justifyContent: "center", // Center the content inside the button
    alignItems: "center", // Align items center
    marginVertical: 10, // Vertical spacing between multiple buttons
  },
  buttonText: {
    color: "black", // Text color
    fontSize: 22, // Font size
    fontWeight: "bold", // Make the text bold
  },
});

export default CustomLoginButton;
