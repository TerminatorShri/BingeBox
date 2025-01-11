import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import { Wander } from "react-native-animated-spinkit";
import { FontAwesome } from "@expo/vector-icons"; // For the star icon
import { MaterialCommunityIcons } from "@expo/vector-icons"; // For the calendar and clock icons

type MovieDetails = {
  id: number;
  name: string;
  image?: { original: string };
  summary?: string;
  language?: string;
  genres?: string[];
  rating?: { average: number };
  premiered?: string;
  runtime?: number;
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie)
    return (
      <View style={styles.loaderContainer}>
        <Wander size={48} color="white" />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.headerLeft}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <Feather name="user" size={30} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.movieInfoContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: movie.image?.original }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{movie.name}</Text>

            {/* Two Columns layout: Column 1 with Language and Rating, Column 2 with Runtime and Premiered */}
            <View style={styles.rowContainer}>
              <View style={styles.columnContainer}>
                {/* Language */}
                <View style={styles.languageContainer}>
                  <Ionicons
                    name="language"
                    size={16}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.text}>{movie.language}</Text>
                </View>
                {/* Rating */}
                <View style={styles.ratingContainer}>
                  <FontAwesome
                    name="star"
                    size={18}
                    color="gold"
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {movie.rating?.average || "N/A"}
                  </Text>
                </View>
              </View>

              <View style={styles.columnContainer}>
                {/* Premiered */}
                <View style={styles.premieredContainer}>
                  <MaterialCommunityIcons
                    name="calendar"
                    size={18}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.text}>{movie.premiered}</Text>
                </View>
                {/* Runtime */}
                <View style={styles.runtimeContainer}>
                  <MaterialCommunityIcons
                    name="clock"
                    size={18}
                    color="white"
                    style={styles.icon}
                  />
                  <Text style={styles.text}>
                    {movie.runtime ? `${movie.runtime} min` : "N/A"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Custom Genre Chips */}
            <View style={styles.chipContainer}>
              {movie.genres?.map((genre, index) => (
                <View key={index} style={styles.customChip}>
                  <Text style={styles.chipText}>{genre}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
        <Text style={styles.summary}>
          {movie.summary?.replace(/<[^>]+>/g, "")}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#393E46" },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#393E46",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "lightgray",
  },
  headerLeft: { flexDirection: "row", alignItems: "center" },
  profileButton: { padding: 8 },
  movieInfoContainer: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#2F353B", // Added background color to make it stand out
    elevation: 5, // Add shadow for elevation effect
  },
  imageContainer: {
    width: "33%", // Image container takes up 1/3 of the width
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: "100%", height: 180 },
  infoContainer: {
    width: "67%", // Info container takes up 2/3 of the width
    paddingLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginBottom: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  columnContainer: {
    flex: 1,
  },
  languageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  premieredContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  runtimeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  chipContainer: { flexDirection: "row", flexWrap: "wrap" },
  customChip: {
    backgroundColor: "#222831",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginRight: 5,
    marginTop: 5,
  },
  chipText: { color: "white", fontSize: 14 },
  text: { fontSize: 16, color: "lightgray", marginBottom: 5 },
  summary: {
    fontSize: 16,
    color: "#E1E1E1", // Light white color for the description
    marginBottom: 20,
    paddingHorizontal: 15, // Added padding
    paddingTop: 10, // Optional: Add padding top for spacing
  },
  icon: { marginRight: 10, marginTop: -2 }, // Adjusted marginTop for alignment
});
