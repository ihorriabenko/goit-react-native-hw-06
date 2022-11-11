import { useState } from "react";
import { Provider } from "react-redux";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

import { useRoute } from "./router";
import { store } from "./redux/store";
import { Main } from "./components/Main";

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

  if (!fontState) {
    return (
      <AppLoading
        startAsync={fontsLoading}
        onFinish={() => setFontState(true)}
        onError={console.warn}
      />
    );
  }
  
  return (
    <Provider store={store}>
      <Main/>
    </Provider>
  );
}
