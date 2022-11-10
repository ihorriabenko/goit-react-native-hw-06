import { Image } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { DefaultScreenPosts } from "../nested/DefaultScreenPosts";
import { CommentsScreen } from "../nested/CommentsScreen";
import { MapScreen } from "../nested/MapScreen";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{
          headerRight: () => (
            <Image
              source={require("../../../../assets/images/logOut.png")}
              style={{
                marginRight: 10,
              }}
            />
          ),
        }}
      />
      <NestedScreen.Screen name="Comments" component={CommentsScreen} />
      <NestedScreen.Screen name="Map" component={MapScreen} />
    </NestedScreen.Navigator>
  );
};
