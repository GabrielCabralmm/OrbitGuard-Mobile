import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0F172A",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "700",
          },
          contentStyle: {
            backgroundColor: "#0F172A",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "OrbitGuard",
          }}
        />

        <Stack.Screen
          name="usuarios"
          options={{
            title: "Usuários",
          }}
        />
      </Stack>
    </>
  );
}