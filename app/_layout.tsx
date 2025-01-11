import { Stack } from "expo-router";
import { AppContextProvider } from "@/contexts/AppContext";

export default function RootLayout() {
  return (
    <AppContextProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </AppContextProvider>
  );
}
