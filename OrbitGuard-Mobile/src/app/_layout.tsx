import { Ionicons } from "@expo/vector-icons";
import { Link, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, StyleSheet, useWindowDimensions, View } from "react-native";

function HeaderNavigation() {
  const { width } = useWindowDimensions();

  const showHeaderMenu = Platform.OS === "web" && width >= 900;

  if (!showHeaderMenu) {
    return null;
  }

  return (
    <View style={styles.nav}>
      <Link href="/" style={styles.navLink}>
        Início
      </Link>

      <Link href="/alertas" style={styles.navLink}>
        Alertas
      </Link>

      <Link href="/regioes" style={styles.navLink}>
        Regiões
      </Link>

      <Link href="/abrigos" style={styles.navLink}>
        Abrigos
      </Link>

      <Link href="/sobre" style={styles.navLink}>
        Orientações
      </Link>
    </View>
  );
}

export default function RootLayout() {
  const { width } = useWindowDimensions();

  const isDesktopWeb = Platform.OS === "web" && width >= 900;

  return (
    <>
      <StatusBar style="light" />

      <Tabs
        screenOptions={{
          headerStyle: {
            backgroundColor: "#030712",
          },

          headerTintColor: "#FFFFFF",

          headerTitleStyle: {
            fontWeight: "900",
          },

          headerRight: () => <HeaderNavigation />,

          tabBarStyle: isDesktopWeb
            ? { display: "none" }
            : {
                backgroundColor: "#030712",
                borderTopColor: "#1E293B",
                borderTopWidth: 1,
                height: 78,
                paddingTop: 8,
                paddingBottom: 8,
              },

          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
          },

          tabBarActiveTintColor: "#38BDF8",
          tabBarInactiveTintColor: "#64748B",

          sceneStyle: {
            backgroundColor: "#030712",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Início",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="alertas"
          options={{
            title: "Alertas",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="warning" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="regioes"
          options={{
            title: "Regiões",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="earth" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="abrigos"
          options={{
            title: "Abrigos",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="business" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="sobre"
          options={{
            title: "Orientações",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="shield-checkmark"
                size={size}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="painel"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
    marginRight: 18,
  },

  navLink: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "800",
  },
});