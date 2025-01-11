import React from "react";
import { View, StyleSheet, Animated } from "react-native";
import Svg, {
  Polygon as SvgPolygon,
  Defs,
  LinearGradient,
  Stop,
  Polygon,
} from "react-native-svg";

const AnimatedPolygon = Animated.createAnimatedComponent(SvgPolygon);

const Loader = () => {
  // Animations for bouncing and particle effects
  const bounceAnim = new Animated.Value(0);
  const particleAnim = new Animated.Value(0);

  React.useEffect(() => {
    // Bounce animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Particle animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(particleAnim, {
          toValue: -10,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(particleAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Svg height="200" width="200" viewBox="0 0 200 200">
        <Defs>
          <LinearGradient id="gradiente" x1="0%" y1="0%" x2="10%" y2="100%">
            <Stop offset="20%" stopColor="#1e2026" stopOpacity="1" />
            <Stop offset="60%" stopColor="#414750" stopOpacity="1" />
          </LinearGradient>
          <LinearGradient id="gradiente2" x1="10%" y1="-17%" x2="0%" y2="100%">
            <Stop offset="20%" stopColor="#d3a51000" stopOpacity="1" />
            <Stop offset="100%" stopColor="#d3a51054" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        {/* Outer Bouncing Polygons */}
        <AnimatedPolygon
          transform={`translate(0, ${bounceAnim.interpolate({
            inputRange: [0, 10],
            outputRange: [36, 46],
          })})`}
          points="70,70 148,50 130,130 50,150"
          fill="none"
          stroke="#d3a410"
          strokeWidth="1"
        />
        <AnimatedPolygon
          transform={`translate(0, ${bounceAnim.interpolate({
            inputRange: [0, 10],
            outputRange: [46, 56],
          })})`}
          points="70,70 148,50 130,130 50,150"
          fill="none"
          stroke="#d3a410"
          strokeWidth="1"
        />

        {/* Main Polygons */}
        <Polygon points="70,70 150,50 130,130 50,150" fill="#414750" />
        <Polygon
          points="100,70 150,100 100,130 50,100"
          fill="url(#gradiente)"
        />
        <Polygon
          transform="translate(20, 31)"
          points="80,50 80,75 80,99 40,75"
          fill="#b7870f"
        />
        <Polygon
          transform="translate(20, 31)"
          points="40,-40 80,-40 80,99 40,75"
          fill="url(#gradiente2)"
        />

        {/* Small Particles */}
        <AnimatedPolygon
          transform={`translate(80, ${particleAnim.interpolate({
            inputRange: [0, -10],
            outputRange: [95, 85],
          })})`}
          points="5,0 5,5 0,5 0,0"
          fill="#ffe4a1"
        />
        <AnimatedPolygon
          transform={`translate(80, ${particleAnim.interpolate({
            inputRange: [0, -10],
            outputRange: [55, 45],
          })})`}
          points="6,0 6,6 0,6 0,0"
          fill="#ccb069"
        />
        <AnimatedPolygon
          transform={`translate(70, ${particleAnim.interpolate({
            inputRange: [0, -10],
            outputRange: [80, 70],
          })})`}
          points="2,0 2,2 0,2 0,0"
          fill="#fff"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#414141",
  },
});

export default Loader;
