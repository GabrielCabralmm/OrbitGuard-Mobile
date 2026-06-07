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

      <View style={styles.actions}>
        <Link href="/usuarios" style={styles.primaryButton}>
          Usuários
        </Link>

        <Link href="/regioes" style={styles.secondaryButton}>
          Regiões
        </Link>
      </View>
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

  actions: {
    width: "100%",
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#38BDF8",
    color: "#0F172A",
    paddingVertical: 14,
    borderRadius: 12,
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    overflow: "hidden",
  },

  secondaryButton: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#334155",
  },
});