import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>OrbitGuard</Text>

      <Text style={styles.title}>
        Monitoramento Inteligente de Riscos Ambientais
      </Text>

      <Text style={styles.subtitle}>
        Aplicativo mobile integrado à API OrbitGuard para acompanhar dados,
        usuários e regiões monitoradas.
      </Text>

      <Link href="/usuarios" style={styles.button}>
        Acessar usuários
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  logo: {
    fontSize: 36,
    fontWeight: "700",
    color: "#38BDF8",
    marginBottom: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#CBD5E1",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#38BDF8",
    color: "#0F172A",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    fontWeight: "700",
    fontSize: 16,
    overflow: "hidden",
  },
});