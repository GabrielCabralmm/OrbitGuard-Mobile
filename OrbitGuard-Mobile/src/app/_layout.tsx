import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#030712",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "800",
          },
          contentStyle: {
            backgroundColor: "#030712",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "OrbitGuard" }} />
        <Stack.Screen name="painel" options={{ title: "Painel" }} />
        <Stack.Screen name="usuarios" options={{ title: "Área Técnica" }} />
        <Stack.Screen name="novo-usuario" options={{ title: "Novo Usuário" }} />
        <Stack.Screen name="editar-usuario" options={{ title: "Editar Usuário" }} />
        <Stack.Screen name="regioes" options={{ title: "Regiões Monitoradas" }} />
        <Stack.Screen name="alertas" options={{ title: "Alertas" }} />
        <Stack.Screen name="sobre" options={{ title: "Orientações" }} />
        <Stack.Screen name="abrigos" options={{ title: "Abrigos" }} />
      </Stack>
    </>
  );
}