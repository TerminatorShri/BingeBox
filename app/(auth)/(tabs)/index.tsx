import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SvgUri } from "react-native-svg";

SplashScreen.preventAutoHideAsync();

type Movie = {
  show: {
    id: number;
    name: string;
    genres: string[];
    image?: { medium: string };
  };
};

export default function HomeScreen() {
  const [moviesByGenre, setMoviesByGenre] = useState<
    { genre: string; movies: Movie[] }[]
  >([]);
  const router = useRouter();

  useEffect(() => {
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => {
        const filteredMovies = data.filter(
          (item: Movie) => item.show.id !== 65759
        ); // Removed movie with ID 65759 because image was not visible
        groupMoviesByGenre(filteredMovies);
        SplashScreen.hideAsync();
      });
  }, []);

  const shuffleArray = (array: Movie[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const groupMoviesByGenre = (data: Movie[]) => {
    const genreMap: { [key: string]: Movie[] } = {};

    data.forEach((item) => {
      item.show.genres.forEach((genre) => {
        if (!genreMap[genre]) {
          genreMap[genre] = [];
        }
        genreMap[genre].push(item);
      });
    });

    const groupedGenres = Object.keys(genreMap).map((genre) => {
      const movies = genreMap[genre];
      shuffleArray(movies);
      return { genre, movies };
    });

    setMoviesByGenre(groupedGenres);
  };

  const renderMovieImage = ({ item }: { item: Movie }) => (
    <TouchableOpacity onPress={() => router.push(`/(details)/${item.show.id}`)}>
      <View style={styles.movieImageContainer}>
        <Image
          source={{ uri: item.show.image?.medium }}
          style={styles.movieImage}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="movie-creation" size={36} color="white" />
          <Text style={styles.headerTitle}>BingeBox</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Feather name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.svgDescContainer}>
          <SvgUri
            uri="https://res.cloudinary.com/daismmmjt/image/upload/v1736534924/aenntrkxmqt82ijubno7.svg"
            width={150}
            height={150}
            style={styles.svgStyle}
          />
          <Text style={styles.descriptionText}>
            Get exclusive information about various movies, TV shows, and more,
            and choose the best options for your ultimate entertainment
            experience!
          </Text>
        </View>
        {moviesByGenre.map((genreGroup) => (
          <View key={genreGroup.genre} style={styles.genreSection}>
            <Text style={styles.genreTitle}>{genreGroup.genre}</Text>
            <FlatList
              data={genreGroup.movies}
              renderItem={renderMovieImage}
              keyExtractor={(item) => item.show.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#393E46",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // Ensures spacing between left and right elements
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row", // Group icon and title together
    alignItems: "center",
  },
  headerTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 10,
  },
  profileButton: {
    padding: 8, // Adds touchable area for the profile icon
  },
  genreSection: {
    marginBottom: 20,
  },
  genreTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  movieImageContainer: {
    marginRight: 10,
  },
  movieImage: {
    width: 120,
    height: 180,
    borderRadius: 10,
    resizeMode: "cover",
  },
  svgDescContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#222831",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  svgStyle: {
    marginRight: 15,
  },
  descriptionText: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    flex: 1,
  },
});
