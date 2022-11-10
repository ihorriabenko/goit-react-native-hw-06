import { createStackNavigator } from "@react-navigation/stack";

import { RegistrationScreen } from "./RegistrationScreen";
import { LogInScreen } from "./LogInScreen";

const Stack = createStackNavigator();

export const AuthScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Registration"
        options={{ headerShown: false }}
        component={RegistrationScreen}
      />
      <Stack.Screen
        name="LogIn"
        options={{ headerShown: false }}
        component={LogInScreen}
      />
    </Stack.Navigator>
  );
};
