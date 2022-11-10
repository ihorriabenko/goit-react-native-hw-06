import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { useRoute } from "./router";

const fontsLoading = async () => {
  try {
    await Font.loadAsync({
      RReg: require("../assets/fonts/Roboto-Regular.ttf"),
      RMed: require("../assets/fonts/Roboto-Medium.ttf"),
      RBold: require("../assets/fonts/Roboto-Bold.ttf"),
    });
  } catch (error) {
    console.error(error.message);
  }
};

export default function App() {
  const [fontState, setFontState] = useState(false);

  const routing = useRoute(true);

  if (!fontState) {
    return (
      <AppLoading
        startAsync={fontsLoading}
        onFinish={() => setFontState(true)}
        onError={console.warn}
      />
    );
  }

  return <NavigationContainer>{routing}</NavigationContainer>;
}
