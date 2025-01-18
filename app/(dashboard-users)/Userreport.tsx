import {
    Alert,
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
  import { useState } from "react";
  import images from "@/assets/images/images.config";
  import { launchImageLibrary } from "react-native-image-picker"; // Import image picker methods
  import NavBar from "../(common)/navbar";
  
  const UserReport = ({ navigation }: { navigation: any }) => {
    const [text, setText] = useState("");
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputHeight, setInputHeight] = useState(40);
    const [selectedMedia, setSelectedMedia] = useState(null);
  
    const handleChangeText = (input: any) => {
      setText(input);
      setInputHeight(80);
    };
    const handleSubmit = () => {
      setModalVisible(true);
      setTimeout(() => setModalVisible(false), 1500);
    };
  
    const handleMediaSelect = () => {
      Alert.alert("Select Media", "Choose an option", [
        {
          text: "Pick ",
          onPress: () => selectMediaFromGallery(),
        },
        { text: "Cancel", style: "cancel" },
      ]);
    };
  
    const selectMediaFromGallery = () => {
      launchImageLibrary(
        {
          mediaType: "mixed", // You can choose "photo", "video", or "mixed" for both
          includeBase64: false, // Choose whether to include base64 data or not
          maxWidth: 600,
          maxHeight: 600,
        },
        (response) => {
          if (response.didCancel) {
            console.log("User cancelled media picker");
          } else if (response.errorCode) {
            console.log("ImagePicker Error: ", response.errorCode);
          } else {
            if (response?.assets?.[0]) {
              // Proceed with accessing the first asset
              // setSelectedMedia(response.assets[0]);
              console.log("Selected media: ", response.assets[0]);
            } else {
              console.log("No media selected or error occurred.");
            }
          }
        }
      );
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
            <ImageBackground source={images.map} style={styles.mapImage}>
              <Image style={styles.mapIcon} source={images["map-white"]} />
            </ImageBackground>
            <Text style={styles.mapPara}>
              Attach any other evidence: (Optional)
            </Text>
            <TouchableOpacity
              style={styles.submitContent}
              onPress={handleMediaSelect}
              onPressIn={handleMediaSelect}
            >
              <Image source={images.link} style={styles.linkIcon} />
              <Text style={styles.boldPara}>Attach photos/videos/etc.</Text>
            </TouchableOpacity>
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
  });
  