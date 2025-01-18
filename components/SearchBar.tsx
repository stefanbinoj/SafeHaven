import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";

const SearchBar = ({
  placeholder = "Search here",
}: {
  placeholder?: string;
  onSearch?: (text: string) => void;
}) => {
  const [query, setQuery] = useState<string>("");

  const handleTextChange = (text: string) => {
    setQuery(text);
  };

  const [modalShown, setModalShown] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={query}
        onChangeText={handleTextChange}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <View style={{ flexDirection: "row", gap: 10 }}>
        <Ionicons name="filter-sharp" size={30} color="black" />
        <AntDesign name="search1" size={30} color="black" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white", // Light grey background
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    margin: 10,
    shadowColor: "#000",
    boxShadow: "#000",
    borderBottomWidth: 4,
    borderRightWidth: 4,
    // shadowOffset: { width: 0, height: 5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 5,
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    fontSize: 16,
    color: "#333",
  },
  icon: {
    marginRight: 10,
  },
});

export default SearchBar;
