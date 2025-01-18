// CustomInput.tsx with Validation
import React from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

interface CustomInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  errorMessage?: string; // Optional error message prop
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  value,
  onChangeText,
  placeholder = "",
  secureTextEntry = false,
  errorMessage,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, errorMessage && styles.errorInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={"white"}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },

  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 2,
    paddingHorizontal: 10,
    borderRadius: 15,
    minWidth: 350,
    color: "white",
    fontSize: 18,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default CustomInput;
