import { GluestackUIProvider } from "@gluestack-ui/themed";
import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <GluestackUIProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      />
    </GluestackUIProvider>
  );
}
