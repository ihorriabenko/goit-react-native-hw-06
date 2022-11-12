import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import db from "../../../../firebase/config";

export const DefaultScreenPosts = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, indx) => indx.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              marginBottom: 10,
            }}
          >
            <Image source={{ uri: item.photo }} style={styles.img} />
            <View>
              <Text style={styles.title}>{item.comment}</Text>
              <View style={styles.nested}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Comments", {postId: item.id})}
                >
                  <Image
                    source={require("../../../../assets/images/comments.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Map", { location: item.location })}>
                  <Image
                    source={require("../../../../assets/images/location.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
  img: {
    marginBottom: 8,

    height: 240,
    borderRadius: 8,
  },
  // nested
  nested: {
    flexDirection: "row",
    justifyContent: "space-between",

    marginBottom: 35,
  },
  title: {
    marginBottom: 8,

    fontFamily: "RMed",
    fontSize: 16,
  },
});
