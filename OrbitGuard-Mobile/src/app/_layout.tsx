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
        <Stack.Screen name="index" options={{ title: "OrbitGuard" }} />
        <Stack.Screen name="usuarios" options={{ title: "Usuários" }} />
        <Stack.Screen name="novo-usuario" options={{ title: "Novo Usuário" }} />
        <Stack.Screen name="editar-usuario" options={{ title: "Editar Usuário" }} />
        <Stack.Screen name="regioes" options={{ title: "Regiões" }} />
      </Stack>
    </>
  );
}