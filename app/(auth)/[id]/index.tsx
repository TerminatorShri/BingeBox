import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

type MovieDetails = {
  id: number;
  name: string;
  image?: { original: string };
  summary?: string;
};

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: movie.image?.original }} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>
        {movie.summary?.replace(/<[^>]+>/g, "")}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  image: { width: "100%", height: 300, marginBottom: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  summary: { fontSize: 16, color: "gray" },
});
