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

          contentStyle: {
            backgroundColor: "#030712",
          },
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="painel"
          options={{
            title: "Painel",
          }}
        />

        <Stack.Screen
          name="usuarios"
          options={{
            title: "Cadastro",
          }}
        />

        <Stack.Screen
          name="novo-usuario"
          options={{
            title: "Criar Cadastro",
          }}
        />

        <Stack.Screen
          name="editar-usuario"
          options={{
            title: "Atualizar Cadastro",
          }}
        />
      </Stack>
    </>
  );
}