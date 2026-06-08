import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.orbit} />

      <Text style={styles.eyebrow}>GUIA DE PROTEÇÃO</Text>
      <Text style={styles.title}>Orientações de Segurança</Text>

      <Text style={styles.subtitle}>
        Consulte recomendações rápidas para agir com segurança em situações de
        risco ambiental.
      </Text>

      <View style={styles.alertCard}>
        <Text style={styles.alertTitle}>Em caso de emergência</Text>
        <Text style={styles.alertText}>
          Procure um local seguro, acompanhe os alertas oficiais e evite áreas
          de risco até a situação ser normalizada.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>🌧️</Text>
        <Text style={styles.cardTitle}>Enchentes e alagamentos</Text>
        <Text style={styles.cardText}>
          Evite atravessar ruas alagadas, não entre em correntezas e desligue a
          energia elétrica caso a água alcance a residência.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>⛰️</Text>
        <Text style={styles.cardTitle}>Deslizamentos</Text>
        <Text style={styles.cardText}>
          Afaste-se de encostas, muros inclinados, rachaduras no solo e locais
          com sinais de movimentação de terra.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>🌩️</Text>
        <Text style={styles.cardTitle}>Tempestades</Text>
        <Text style={styles.cardText}>
          Evite áreas abertas, árvores, postes e estruturas metálicas. Durante
          raios, permaneça em local coberto e seguro.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>☀️</Text>
        <Text style={styles.cardTitle}>Calor extremo</Text>
        <Text style={styles.cardText}>
          Beba água com frequência, evite exposição prolongada ao sol e dê
          atenção especial a crianças, idosos e animais.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.icon}>🏠</Text>
        <Text style={styles.cardTitle}>Abrigos</Text>
        <Text style={styles.cardText}>
          Em situações de risco, procure abrigos disponíveis e siga as
          orientações das equipes de apoio e defesa civil.
        </Text>
      </View>

      <View style={styles.footerCard}>
        <Text style={styles.footerTitle}>OrbitGuard</Text>
        <Text style={styles.footerText}>
          Tecnologia para prevenção, monitoramento e proteção de comunidades em
          áreas de risco.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#030712",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  orbit: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    top: -160,
    right: -160,
    opacity: 0.6,
  },

  eyebrow: {
    color: "#38BDF8",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 8,
  },

  subtitle: {
    color: "#A5B4FC",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },

  alertCard: {
    backgroundColor: "#172554",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#38BDF8",
    marginBottom: 14,
  },

  alertTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },

  alertText: {
    color: "#E0F2FE",
    fontSize: 15,
    lineHeight: 22,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#312E81",
    marginBottom: 14,
  },

  icon: {
    fontSize: 30,
    marginBottom: 8,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },

  cardText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
  },

  footerCard: {
    backgroundColor: "#020617",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#1E40AF",
    marginTop: 4,
  },

  footerTitle: {
    color: "#38BDF8",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 6,
  },

  footerText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
  },
});