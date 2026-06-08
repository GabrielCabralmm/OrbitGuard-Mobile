import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.orbitOne} />
      <View style={styles.orbitTwo} />

      <Text style={styles.eyebrow}>ORBITGUARD</Text>

      <Text style={styles.title}>Sua região está segura?</Text>

      <Text style={styles.subtitle}>
        Acompanhe alertas ambientais, regiões monitoradas, abrigos disponíveis
        e orientações de proteção.
      </Text>

      <View style={styles.alertCard}>
        <Text style={styles.alertLabel}>MONITORAMENTO CIDADÃO</Text>
        <Text style={styles.alertTitle}>Proteção em tempo real</Text>
        <Text style={styles.alertText}>
          Consulte informações importantes para agir com segurança em situações
          de risco ambiental.
        </Text>
      </View>

      <View style={styles.grid}>
        <Link href="/painel" style={styles.primaryButton}>
          Abrir Painel
        </Link>

        <Link href="/alertas" style={styles.secondaryButton}>
          Alertas
        </Link>

        <Link href="/regioes" style={styles.secondaryButton}>
          Regiões
        </Link>

        <Link href="/abrigos" style={styles.secondaryButton}>
          Abrigos
        </Link>

        <Link href="/sobre" style={styles.secondaryButton}>
          Orientações
        </Link>

        <Link href="/usuarios" style={styles.secondaryButton}>
          Cadastro
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
    justifyContent: "center",
    padding: 24,
    overflow: "hidden",
  },

  orbitOne: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1E40AF",
    top: -70,
    right: -120,
    opacity: 0.8,
  },

  orbitTwo: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#312E81",
    bottom: -160,
    left: -180,
    opacity: 0.7,
  },

  eyebrow: {
    color: "#38BDF8",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 3,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 44,
    marginBottom: 12,
  },

  subtitle: {
    color: "#A5B4FC",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 26,
  },

  alertCard: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    marginBottom: 22,
  },

  alertLabel: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 8,
  },

  alertTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8,
  },

  alertText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
  },

  grid: {
    gap: 12,
  },

  primaryButton: {
    backgroundColor: "#38BDF8",
    color: "#020617",
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 16,
    fontWeight: "900",
    fontSize: 16,
    overflow: "hidden",
  },

  secondaryButton: {
    backgroundColor: "#111827",
    color: "#E0F2FE",
    textAlign: "center",
    paddingVertical: 15,
    borderRadius: 16,
    fontWeight: "800",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#312E81",
    overflow: "hidden",
  },
});