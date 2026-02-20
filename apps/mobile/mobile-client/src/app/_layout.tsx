import { useEffect } from "react";
import { useAuthStore } from "@/lib/store";
import { router } from "expo-router";
import { View, Text } from "react-native";

export default function RootLayout() {
  const { user, hydrate } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      await hydrate();
    };
    init();
  }, []);

  useEffect(() => {
    if (user === null && typeof window !== "undefined") {
      router.replace("/login");
    }
  }, [user]);

  if (user === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <RootLayoutNav />;
}

import { Stack } from "expo-router";

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
