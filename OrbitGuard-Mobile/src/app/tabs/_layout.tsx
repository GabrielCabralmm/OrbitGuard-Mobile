import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#030712",
          borderTopColor: "#1E293B",
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },

        tabBarActiveTintColor: "#38BDF8",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
        }}
      />

      <Tabs.Screen
        name="alertas"
        options={{
          title: "Alertas",
        }}
      />

      <Tabs.Screen
        name="regioes"
        options={{
          title: "Regiões",
        }}
      />

      <Tabs.Screen
        name="abrigos"
        options={{
          title: "Abrigos",
        }}
      />

      <Tabs.Screen
        name="sobre"
        options={{
          title: "Orientações",
        }}
      />
    </Tabs>
  );
}