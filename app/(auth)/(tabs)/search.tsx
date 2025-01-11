import React, { useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SearchBar } from "@rneui/themed";
import { useRouter } from "expo-router";
import AppData from "../../../assets/AppData.json"; // Import the JSON file
import { SvgUri } from "react-native-svg"; // Import SvgUri

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
    if (text) {
      fetch(`https://api.tvmaze.com/search/shows?q=${text}`)
        .then((res) => res.json())
        .then((data) => setResults(data));
    } else {
      setResults([]);
    }
  };

  // Get a random SVG image from the searchBarIcons array
  const randomIcon =
    AppData.searchBarIcons[
      Math.floor(Math.random() * AppData.searchBarIcons.length)
    ];

  // Group the results into rows of three
  const groupResults = (results: Movie[]) => {
    const grouped = [];
    for (let i = 0; i < results.length; i += 3) {
      grouped.push(results.slice(i, i + 3));
    }
    return grouped;
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search Movies..."
        value={query}
        onChangeText={(text: string) => searchMovies(text)}
        lightTheme
        round
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.inputContainer}
      />
      {query ? (
        <FlatList
          data={groupResults(results)} // Grouped results
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={styles.row}>
              {item.map((movie) => (
                <TouchableOpacity
                  key={movie.show.id}
                  onPress={() => router.push(`/(details)/${movie.show.id}`)}
                >
                  <View style={styles.movieItem}>
                    <Image
                      source={{ uri: movie.show.image?.medium }}
                      style={styles.thumbnail}
                    />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      ) : (
        <View style={styles.iconContainer}>
          <SvgUri
            uri={randomIcon} // Using the SVG image URL
            width={200}
            height={200}
          />
          <Text style={styles.defaultText}>
            Explore your favorite TV shows, movies, web series, and much more
            all in one place!
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#393E46" },
  searchBarContainer: {
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  inputContainer: {
    backgroundColor: "#fff",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  movieItem: { flexDirection: "row", marginBottom: 10 },
  thumbnail: {
    width: (Dimensions.get("window").width - 40) / 3, // Adjust image width
    height: 200,
    marginRight: 8,
    resizeMode: "cover", // Ensure image covers the container
    borderRadius: 8, // Adding border radius
  },
  title: { fontSize: 16, fontWeight: "bold" },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
  },
  defaultText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
