import { Link, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

function HeaderNavigation() {
  const { width } = useWindowDimensions();
  const showDesktopMenu = Platform.OS === "web" || width >= 768;

  if (!showDesktopMenu) {
    return null;
  }

  return (
    <View style={styles.nav}>
      <Link href="/" style={styles.navLink}>Início</Link>
      <Link href="/alertas" style={styles.navLink}>Alertas</Link>
      <Link href="/regioes" style={styles.navLink}>Regiões</Link>
      <Link href="/abrigos" style={styles.navLink}>Abrigos</Link>
      <Link href="/sobre" style={styles.navLink}>Orientações</Link>
      <Link href="/usuarios" style={styles.navLink}>Cadastro</Link>
    </View>
  );
}

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
            fontWeight: "900",
          },
          headerRight: () => <HeaderNavigation />,
          contentStyle: {
            backgroundColor: "#030712",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "OrbitGuard" }} />
        <Stack.Screen name="painel" options={{ title: "Painel" }} />
        <Stack.Screen name="usuarios" options={{ title: "Cadastro" }} />
        <Stack.Screen name="novo-usuario" options={{ title: "Criar Cadastro" }} />
        <Stack.Screen name="editar-usuario" options={{ title: "Atualizar Cadastro" }} />
        <Stack.Screen name="regioes" options={{ title: "Regiões Monitoradas" }} />
        <Stack.Screen name="alertas" options={{ title: "Alertas" }} />
        <Stack.Screen name="sobre" options={{ title: "Orientações" }} />
        <Stack.Screen name="abrigos" options={{ title: "Abrigos" }} />
      </Stack>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginRight: 12,
  },

  navLink: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "800",
  },
});