import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

type Movie = {
  show: {
    id: number;
    name: string;
    image?: { medium: string };
    summary?: string;
  };
};

export default function HomeScreen() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/(tabs)")}>
        <Text>Go to Temp.tsx</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.searchBar}
        placeholder="Search Movies..."
        onFocus={() => router.push("/search")}
      />
      <FlatList
        data={movies}
        keyExtractor={(item) => item.show.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`./${item.show.id}`)}>
            <View style={styles.movieItem}>
              <Image
                source={{ uri: item.show.image?.medium }}
                style={styles.thumbnail}
              />
              <View>
                <Text style={styles.title}>{item.show.name}</Text>
                <Text numberOfLines={3} style={styles.summary}>
                  {item.show.summary?.replace(/<[^>]+>/g, "")}
                </Text>
              </View>
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
  title: { fontWeight: "bold", fontSize: 16 },
  summary: { color: "gray", fontSize: 14 },
});
