import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }: { color: string; size: number }) => {
          let iconName: string = "";

          // Define tab icons for Home and Search
          if (route.name === "index") iconName = "home"; // Home tab
          else if (route.name === "search") iconName = "search"; // Search tab

          // Return appropriate icon
          return <Ionicons name={iconName as keyof typeof Ionicons.glyphMap} size={size} color={color} />;
        },
        tabBarShowLabel: false, // Hide labels in the tab bar
      })}
    >
      <Tabs.Screen
        name="index" // This is the Home screen, set as the default tab
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
        }}
      />
    </Tabs>
  );
}
