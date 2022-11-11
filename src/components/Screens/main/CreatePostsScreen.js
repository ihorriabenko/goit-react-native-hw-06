import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  Pressable,
  Button,
} from "react-native";
import { Camera } from "expo-camera";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";
import db from "../../../../firebase/config";

export const CreatePostsScreen = ({ navigation }) => {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = () => {
    uploadPhotoToServer();
    navigation.navigate("DefaultScreen", { photo, location });
    console.log("location", location);
  };

  const handleInputFocus = () => {
    setIsKeyboardShow(true);
    console.log("isKeyboardShow", isKeyboardShow);
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();

    const uniquePostId = Date.now().toString();

    const data = await db.storage().ref(`postImage/${uniquePostId}`).put(file);
    
    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    console.log("processedPhoto", processedPhoto);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image source={{ uri: photo }} style={{ height: 50, width: 50 }} />
          </View>
        )}
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <View style={styles.takePhotoOut}>
            <View style={styles.takePhotoInner}></View>
          </View>
        </TouchableOpacity>
      </Camera>
      <TextInput
        style={styles.input}
        placeholder="Title"
        onFocus={handleInputFocus}
      ></TextInput>
      <TextInput
        style={{ ...styles.input, marginBottom: 32 }}
        placeholder="Location"
        onFocus={handleInputFocus}
      ></TextInput>
      <TouchableOpacity style={styles.buttonSend} onPress={sendPhoto}>
        <Text style={styles.buttonSendText}>Publish</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pressContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  // camera
  camera: {
    alignItems: "center",
    justifyContent: "flex-end",

    marginTop: 32,
    marginBottom: 32,

    height: 343,
    borderRadius: 8,
  },
  snap: {
    color: "#fff",
  },
  takePhotoContainer: {
    position: "absolute",
    bottom: 30,
    left: 50,

    borderWidth: 1,

    borderColor: "#fff",
  },
  button: {
    alignSelf: "center",
    marginBottom: 15,
  },
  takePhotoOut: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    borderWidth: 2,
    height: 50,
    width: 50,
    borderRadius: 50,

    borderColor: "white",
  },
  takePhotoInner: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderRadius: 50,

    borderColor: "white",
    backgroundColor: "white",
  },
  // form
  input: {
    marginBottom: 16,

    height: 50,
    borderBottomWidth: 1,

    borderBottomColor: "#E8E8E8",
  },
  buttonSend: {
    alignItems: "center",
    justifyContent: "center",

    marginLeft: "auto",
    marginRight: "auto",

    height: 51,
    width: "100%",
    borderRadius: 100,

    backgroundColor: "#FF6C00",
  },
  buttonSendText: {
    fontFamily: "RReg",
    fontSize: 16,

    color: "#fff",
  },
});
