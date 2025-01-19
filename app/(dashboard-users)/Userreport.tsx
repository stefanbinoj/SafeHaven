import {
  Alert,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import images from "@/assets/images/images.config";
import NavBar from "../(common)/navbar";
import FullMap, { locationCoodMarker } from "@/components/FullMap";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

import * as ImagePicker from "expo-image-picker";

const UserReport = ({ navigation }: { navigation: any }) => {
  const [text, setText] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [inputHeight, setInputHeight] = useState(40);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isShowMapModal, setIsShownMapModal] = useState<boolean>(false);
  const [locationFromReport, setLocationFromReport] = useState<
    locationCoodMarker | undefined
  >();
  const [items, setItems] = useState<number>(0);
  const [uriItems, seturiItems] = useState<string[] | []>([]);

  const getPermissionAsync = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission required",
        "Permission to access media library is required!"
      );
      return false; // Don't proceed if permission is not granted
    }
    return true;
  };

  const pickMedia = async () => {
    // First, request permission
    const hasPermission = await getPermissionAsync();
    if (!hasPermission) return;

    // Pick media (both images and videos)
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"], // Allows both images and videos
      allowsEditing: true, // Optional: Allows editing (e.g., cropping)
      quality: 1, // High quality
    });

    // Check if the user canceled the picker
    if (result?.canceled) {
      Alert.alert("Picker canceled", "You did not select any media.");
      return;
    }

    // Handle the selected media
    const asset = result.assets[0]; // We assume only one item is selected
    if (asset.type === "image") {
      Alert.alert("Image picked", "You selected an image!");
    } else if (asset.type === "video") {
      Alert.alert("Video picked", "You selected a video!");
    }
    console.log(asset.uri); // URI of the selected image/video
    setItems((items) => items + 1);
    handleInput(asset.uri);
  };
  const handleInput = (as: any) => {
    if (uriItems.length < 5) {
      seturiItems([...uriItems, as]);
    } else {
      alert("Max No.of attchments possible is 5.");
    }
  };
  const handleChangeText = (input: any) => {
    setText(input);
    setInputHeight(80);
  };
  const handleSubmit = () => {
    if (locationFromReport == undefined) {
      return alert("Please provide an location.");
    } else {
      console.log("The location u might have is : ", locationFromReport);
    }

    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 1500);
  };

  const closeModal = () => {
    setIsShownMapModal(false);
  };

  const openModal = () => {
    setIsShownMapModal(true);
  };
  return (
    <SafeAreaView>
      <NavBar />
      <View style={styles.container}>
        <LinearGradient
          colors={["#ABCFFF", "#CC2BFD"]} // Gradient colors
          start={{ x: 0, y: 0 }} // top-left
          end={{ x: 1, y: 1 }} // bottom-right
          style={styles.gradientContainer}
        >
          <Modal
            animationType="fade"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={() => setModalVisible(false)}
            style={styles.modal}
          >
            <View style={styles.modalOverlay}>
              <LinearGradient
                colors={["#32BB71", "#2A9D8F"]} // Gradient colors
                start={{ x: 0, y: 0 }} // top-left
                end={{ x: 1, y: 1 }} // bottom-right
                style={styles.modalLinear}
              >
                <View style={styles.modalContainer}>
                  <Text style={styles.modalText}>Report Submitted</Text>
                  <Text style={styles.modalSubText}>
                    Your report has been successfully submitted. Wait to hear
                    back from us regarding your reward.
                  </Text>
                </View>
              </LinearGradient>
            </View>
          </Modal>
          <Text style={styles.mainHeading}>You're secure!</Text>
          <Text style={styles.para}>
            Any info that is shared is anonymous. Falsification might result in
            permanent ban from using the application Reports leading to arrest
            are rewarded.
          </Text>
          {isShowMapModal && (
            <>
              <View style={styles.overlay}>
                <TouchableOpacity style={styles.backArrow} onPress={closeModal}>
                  <AntDesign name="back" size={40} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.tickArrow} onPress={closeModal}>
                  <AntDesign name="check" size={40} color="black" />
                </TouchableOpacity>
                <FullMap
                  width={width * 2}
                  height={height * 2}
                  showHeatMapProp={false}
                  showMarkerProp={true}
                  locationFromReport={locationFromReport}
                  setLocationFromReport={setLocationFromReport}
                  reportProp={true}
                />
              </View>
            </>
          )}
          <Text style={styles.subPara}>
            Write details regarding the report:
          </Text>
          <TextInput
            style={[styles.input, { height: inputHeight }]}
            placeholder="Enter Details of report"
            value={text}
            onChangeText={handleChangeText}
            multiline
            scrollEnabled
          />
          <Text style={styles.mapPara}>Choose location to report:</Text>
          <TouchableOpacity onPress={openModal}>
            <ImageBackground source={images.map} style={styles.mapImage}>
              <Image style={styles.mapIcon} source={images["map-white"]} />
            </ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 20,
              marginLeft: -60,
            }}
          >
            <Text style={{}}>Attach any other evidence: (Optional) </Text>
            <Text style={{ marginLeft: 20 }}>({items}/5)</Text>
          </View>
          <TouchableOpacity style={styles.submitContent} onPress={pickMedia}>
            <Image source={images.link} style={styles.linkIcon} />
            <Text style={styles.boldPara}>Attach photos/videos/etc.</Text>
          </TouchableOpacity>
          {uriItems.length > 0 && (
            <View
              style={{ flexDirection: "row", justifyContent: "center", gap: 2 }}
            >
              {uriItems.map((each, idx) => (
                <FontAwesome
                  id={each}
                  name="file-picture-o"
                  size={34}
                  color="black"
                  style={{ backgroundColor: "white", position: "relative" }}
                >
                  <Text
                    style={{
                      fontSize: 10,
                      position: "absolute",
                      top: 0,
                      right: 0,
                      color: "white",
                    }}
                    onPress={() => {
                      const updatedItems = uriItems.filter(
                        (item) => item !== each
                      ); // Remove 'each' from the array
                      seturiItems(updatedItems);
                    }}
                  >
                    X
                  </Text>
                </FontAwesome>
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.submit}>SUBMIT</Text>
          </TouchableOpacity>
          {selectedMedia && (
            <View style={styles.mediaContainer}>
              <Text>Selected Media:</Text>
              {/* <Text>{selectedMedia.fileName}</Text> */}
              <Image
                // source={{ uri: selectedMedia.uri }}
                style={styles.mediaPreview}
              />
            </View>
          )}
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};

export default UserReport;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 10,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 20,
  },
  mainHeading: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    marginTop: 10,
  },
  para: {
    textAlign: "center",
    paddingHorizontal: 20,
    marginTop: 15,
  },
  subPara: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
    marginTop: 35,
  },
  input: {
    borderColor: "black",
    borderWidth: 2,
    backgroundColor: "white",
    width: "90%",
    paddingLeft: 10,
    borderRadius: 5,

    textAlignVertical: "top", // Ensure text starts at the top for multiline
  },
  mapPara: {
    alignSelf: "flex-start",
    paddingHorizontal: 20,
  },
  mapImage: {
    minWidth: 295,
    alignSelf: "flex-start",
    marginHorizontal: 20,
    borderRadius: 20,
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  mapIcon: {
    height: 50,
    width: 50,
  },
  submitContent: {
    backgroundColor: "white",
    borderWidth: 2,
    width: "80%",
    alignSelf: "flex-start",
    height: 50,
    marginLeft: 20,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  linkIcon: {
    marginLeft: 20,
  },
  boldPara: {
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#0DBEFF",
    width: "80%",
    alignSelf: "flex-start",
    height: 50,
    marginLeft: 20,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  submit: {
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    fontSize: 19,
  },
  modalOverlay: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#43D590", // Semi-transparent background
    marginTop: 20,
    borderRadius: 60,
    margin: 12,
    borderWidth: 2,
  },
  modalContainer: {
    padding: 20,
    height: 130,
  },
  modalText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
  modalLinear: {
    width: "100%",
  },
  modal: {
    borderRadius: 30,
    margin: 10,
  },
  modalSubText: {
    fontSize: 14,
    fontWeight: "500",
    color: "white",
  },
  mediaContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  mediaPreview: {
    width: 150,
    height: 150,
    marginTop: 10,
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute", // Position overlay on top of everything
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark semi-transparent background
    zIndex: 1, // Ensures the overlay is on top
    justifyContent: "center",
    alignItems: "center",
  },
  modalMap: {
    width: width - 40, // Modal width (smaller than screen width)
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    zIndex: 2, // Ensures the modal content is on top of the overlay
  },
  modalMapText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: "#FF6347", // Red close button
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  backArrow: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: 20,
    color: "black",
    zIndex: 2, // Ensures the overlay is on top
  },
  tickArrow: {
    position: "absolute",
    top: 0,
    right: 0,
    margin: 20,
    color: "black",
    zIndex: 2, // Ensures the overlay is on top
  },
});
