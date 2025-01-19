import { Link } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";

const ReportList = ({ admin = false }) => {
  const navigation = useNavigation(); // Explicitly type navigation

  const [reports, setReports] = useState([
    {
      report_id: "1",
      issue_data: "Some issue data 1",
      response_date: "2025-01-01",
      response_status: "Resolved",
    },
    {
      report_id: "2",
      issue_data: "Some issue data 2",
      response_date: "2025-01-02",
      response_status: "Pending",
    },
    {
      report_id: "3",
      issue_data: "Some issue data 3",
      response_date: "2025-01-03",
      response_status: "In Progress",
    },
    {
      report_id: "4",
      issue_data: "Some issue data 3",
      response_date: "2025-01-03",
      response_status: "In Progress",
    },
    {
      report_id: "5",
      issue_data: "Some issue data 3",
      response_date: "2025-01-03",
      response_status: "In Progress",
    },
    {
      report_id: "6",
      issue_data: "Some issue data 3",
      response_date: "2025-01-03",
      response_status: "In Progress",
    },
  ]);
  //   useEffect(() => {
  //     fetch('https://api.example.com/reports')
  //       .then((response) => response.json())
  //       .then((data) => setReports(data))
  //       .catch((error) => console.error(error));
  //   }, []);
  const [modal, setModal] = useState(false);
  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.itemContainer}>
      {admin && modal && (
        <Modal
          visible={modal}
          animationType="slide"
          transparent={true}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>This is a modal!</Text>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.buttonText}>Close Modal</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <Text style={styles.reportId}>Report ID: {item.report_id}</Text>
      {admin && (
        <Entypo
          name="dots-three-vertical"
          size={24}
          color="black"
          style={{ alignSelf: "flex-end" }}
        />
      )}
      <Text style={styles.issueData}>Issue: {item.issue_data}</Text>
      <Text style={styles.responseDate}>Date: {item.response_date}</Text>
      <Text style={styles.responseStatus}>Status: {item.response_status}</Text>
      <Text
        style={styles.hrefText}
        onPress={() => {
          navigation.push("IndividualReport", {
            id: item.report_id,
            admin: true,
          });
        }}
      >
        Details -&gt;
      </Text>
      <View style={styles.lineBreakElementContainer}>
        <LinearGradient
          colors={["#000", "#000"]} // Fading effect with black color in the middle
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.line}
        />
      </View>
    </View>
  );

  return (
    <FlatList
      //   style={{ flex: 1 }}
      data={reports}
      renderItem={renderItem}
      keyExtractor={(item) => item.report_id}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    //backgroundColor: "lightyellow",
    padding: 15,
    marginVertical: -15,
    borderRadius: 8,
    margin: 15,
  },
  reportId: {
    fontWeight: "bold",
    fontSize: 22,
    color: "#696969",
  },
  issueData: {
    fontSize: 14,
    marginVertical: 5,
  },
  responseDate: {
    fontSize: 12,
    color: "gray",
  },
  responseStatus: {
    fontSize: 14,
    color: "green",
  },
  hrefText: {
    fontSize: 14,
    color: "blue",
    alignSelf: "flex-end",
    cursor: "pointer",
  },
  lineBreakElementContainer: {
    flexDirection: "row", // You can change to 'column' depending on where you want the line (horizontal or vertical)
    justifyContent: "center",
    marginVertical: 20,
  },
  line: {
    width: "90%", // Adjust line width
    height: 2, // This is the thickness of the line
    borderRadius: 1, // Optional: to make edges smooth
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dim background
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ReportList;
