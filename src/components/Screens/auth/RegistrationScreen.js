import {
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Pressable,
} from "react-native";
import { useState } from "react";

const userInitData = {
  username: "",
  email: "",
  password: "",
};

export const RegistrationScreen = ({ navigation }) => {
  const [isKeyboardShow, setIsKeyboardShow] = useState(false);
  const [userData, setUserData] = useState(userInitData);

  const handleInputFocus = () => {
    setIsKeyboardShow(true);
  };

  const handleOutKeyboardClick = () => {
    setIsKeyboardShow(false);
    Keyboard.dismiss();
  };

  return (
    <Pressable style={styles.pressContainer} onPress={handleOutKeyboardClick}>
      <ImageBackground
        style={styles.image}
        source={require("../../../../assets/images/PhotoBG.png")}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View
            style={{
              ...styles.wrapper,
              marginBottom: isKeyboardShow ? -165 : 0,
            }}
          >
            <View style={styles.form}>
              <Text style={styles.title}>Sign Up</Text>
              <TextInput
                style={styles.input}
                placeholder={"Username"}
                placeholderTextColor={"#BDBDBD"}
                value={userData.username}
                onFocus={handleInputFocus}
                onChangeText={(value) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    username: value,
                  }))
                }
              />
              <TextInput
                style={styles.input}
                placeholder={"Email"}
                placeholderTextColor={"#BDBDBD"}
                value={userData.email}
                onFocus={handleInputFocus}
                onChangeText={(value) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    email: value,
                  }))
                }
              />
              <TextInput
                style={{ ...styles.input, marginBottom: 43 }}
                placeholder={"Password"}
                placeholderTextColor={"#BDBDBD"}
                value={userData.password}
                secureTextEntry={true}
                onFocus={handleInputFocus}
                onChangeText={(value) =>
                  setUserData((prevState) => ({
                    ...prevState,
                    password: value,
                  }))
                }
              />
              <TouchableOpacity
                style={styles.btn}
                activeOpacity={0.7}
                onPress={() => {
                  console.log(userData);
                  setUserData(userInitData);
                }}
              >
                <Text style={styles.btnTitle}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("LogIn")}>
                <Text style={styles.text}>Sign in instead</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pressContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  wrapper: {
    height: 549,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,

    backgroundColor: "#fff",
  },
  form: {
    marginHorizontal: 16,
  },
  title: {
    marginTop: 92,
    marginBottom: 33,

    textAlign: "center",

    fontFamily: "RMed",
    fontSize: 30,
  },
  input: {
    padding: 16,
    marginBottom: 16,

    height: 50,
    borderWidth: 1,
    borderRadius: 8,

    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",

    fontSize: 16,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,

    height: 51,

    backgroundColor: "#FF6C00",
    borderRadius: 100,
  },
  btnTitle: {
    fontFamily: "RReg",
    fontSize: 16,
    lineHeight: 19,

    color: "#fff",
  },
  text: {
    textAlign: "center",

    fontFamily: "RReg",
    fontSize: 16,

    color: "#3b5998",
  },
});
