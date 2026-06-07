import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>ORBITAL SAFETY SYSTEM</Text>

      <Text style={styles.logo}>OrbitGuard</Text>

      <Text style={styles.title}>
        Proteção inteligente para regiões em risco
      </Text>

      <Text style={styles.subtitle}>
        Acompanhe regiões monitoradas, alertas ambientais e usuários envolvidos
        em ações preventivas.
      </Text>

      <View style={styles.planet} />

      <View style={styles.actions}>
        <Link href="/painel" style={styles.primaryButton}>
          Abrir Painel
        </Link>

        <Link href="/usuarios" style={styles.secondaryButton}>
          Usuários
        </Link>

        <Link href="/regioes" style={styles.secondaryButton}>
          Regiões
        </Link>

        <Link href="/alertas" style={styles.secondaryButton}>
          Alertas
        </Link>

        <Link href="/sobre" style={styles.secondaryButton}>
          Sobre o Projeto
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  eyebrow: {
    color: "#7DD3FC",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 10,
  },

  logo: {
    fontSize: 42,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 12,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#E0F2FE",
    textAlign: "center",
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 16,
    color: "#A5B4FC",
    textAlign: "center",
    marginBottom: 26,
    lineHeight: 23,
  },

  planet: {
    width: 110,
    height: 110,
    borderRadius: 999,
    backgroundColor: "#1D4ED8",
    borderWidth: 10,
    borderColor: "#38BDF8",
    marginBottom: 26,
    opacity: 0.9,
  },

  actions: {
    width: "100%",
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#38BDF8",
    color: "#020617",
    paddingVertical: 14,
    borderRadius: 14,
    fontWeight: "900",
    fontSize: 16,
    textAlign: "center",
    overflow: "hidden",
  },

  secondaryButton: {
    backgroundColor: "#111827",
    color: "#E0F2FE",
    paddingVertical: 14,
    borderRadius: 14,
    fontWeight: "800",
    fontSize: 16,
    textAlign: "center",
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#312E81",
  },
});