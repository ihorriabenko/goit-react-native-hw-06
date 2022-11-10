import { AuthScreen } from "./components/Screens/auth/AuthScreen";
import { HomeScreen } from "./components/Screens/main/HomeScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return <AuthScreen/>
  }
  return <HomeScreen />
};
