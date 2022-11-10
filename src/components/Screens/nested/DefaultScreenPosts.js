import { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, Image, Button, TouchableOpacity } from "react-native";

export const DefaultScreenPosts = ({ route, navigation }) => {
  // const {title} = route.params;

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
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
              <Text style={styles.title}>Title</Text>
              <View style={styles.nested}>
                <TouchableOpacity onPress={() => navigation.navigate('Comments')}>
                  <Image
                    source={require("../../../../assets/images/comments.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
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

    fontFamily: 'RMed',
    fontSize: 16,
  }
});
