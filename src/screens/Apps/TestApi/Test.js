import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import axios from "axios";

// URL for fetching data
const movieURL = "https://reactnative.dev/movies.json";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(movieURL);
      setData(response.data.movies);
      setTitle(response.data.title);
      setDescription(response.data.description);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={{ borderBottomWidth: 1, marginBottom: 12 }}></View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.movieText}>
                  {item.id}. {item.title}, {item.releaseYear}
                </Text>
              </View>
            )}
          />
          <Text style={styles.description}>{description}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 48,
  },
  movieText: {
    fontSize: 26,
    fontWeight: "200",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    marginBottom: 18,
    fontWeight: "200",
    color: "green",
  },
});

export default App;