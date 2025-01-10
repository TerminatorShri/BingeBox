import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

type Movie = {
  show: {
    id: number;
    name: string;
    image?: { medium: string };
  };
};

export default function SearchScreen() {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);
  const router = useRouter();

  const searchMovies = (text: string) => {
    setQuery(text);
    fetch(`https://api.tvmaze.com/search/shows?q=${text}`)
      .then((res) => res.json())
      .then((data) => setResults(data));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies..."
        value={query}
        onChangeText={searchMovies}
      />
      <FlatList
        data={results}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`./details/${item.show.id}`)}
          >
            <View style={styles.movieItem}>
              <Image
                source={{ uri: item.show.image?.medium }}
                style={styles.thumbnail}
              />
              <Text style={styles.title}>{item.show.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  movieItem: { flexDirection: "row", marginBottom: 10 },
  thumbnail: { width: 100, height: 150, marginRight: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
});
