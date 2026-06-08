import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import {
  Image,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";

export default function HomeScreen() {
  const { width } = useWindowDimensions();

  const isDesktop = Platform.OS === "web" && width >= 900;
  const logoSize = isDesktop ? 600 : 380;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.orbitOne} />
      <View style={styles.orbitTwo} />

      <View style={styles.container}>
        <Image
          source={require("../../assets/images/Logo-OrbitGuard.png")}
          style={[
            styles.logoImage,
            {
              width: logoSize,
              height: logoSize,
            },
          ]}
          resizeMode="contain"
        />

        <Text style={styles.eyebrow}>ORBITGUARD</Text>

        <Text style={[styles.title, isDesktop && styles.titleDesktop]}>
          Sua região está segura?
        </Text>

        <Text style={[styles.subtitle, isDesktop && styles.subtitleDesktop]}>
          Acompanhe alertas ambientais, regiões monitoradas, abrigos disponíveis
          e orientações de proteção.
        </Text>

        <View style={styles.alertCard}>
          <View style={styles.alertIconBox}>
            <Ionicons
              name="shield-checkmark-outline"
              size={38}
              color="#38BDF8"
            />
          </View>

          <View style={styles.alertContent}>
            <Text style={styles.alertLabel}>MONITORAMENTO CIDADÃO</Text>
            <Text style={styles.alertTitle}>Proteção em tempo real</Text>
            <Text style={styles.alertText}>
              Consulte informações importantes para agir com segurança em
              situações de risco ambiental.
            </Text>
          </View>
        </View>

        <View style={styles.grid}>
          <Link href="/painel" asChild>
            <Pressable style={styles.primaryButton}>
              <Ionicons name="bar-chart-outline" size={22} color="#020617" />
              <Text style={styles.primaryButtonText}>Abrir Painel</Text>
            </Pressable>
          </Link>

          <Link href="/alertas" asChild>
            <Pressable style={styles.secondaryButton}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#38BDF8"
              />
              <Text style={styles.secondaryButtonText}>Alertas</Text>
            </Pressable>
          </Link>

          <Link href="/regioes" asChild>
            <Pressable style={styles.secondaryButton}>
              <Ionicons name="earth-outline" size={22} color="#38BDF8" />
              <Text style={styles.secondaryButtonText}>Regiões</Text>
            </Pressable>
          </Link>

          <Link href="/abrigos" asChild>
            <Pressable style={styles.secondaryButton}>
              <Ionicons name="home-outline" size={22} color="#38BDF8" />
              <Text style={styles.secondaryButtonText}>Abrigos</Text>
            </Pressable>
          </Link>

          <Link href="/sobre" asChild>
            <Pressable style={styles.secondaryButton}>
              <Ionicons name="book-outline" size={22} color="#38BDF8" />
              <Text style={styles.secondaryButtonText}>Orientações</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#030712",
  },

  content: {
    flexGrow: 1,
    paddingBottom: 110,
    overflow: "hidden",
  },

  container: {
    width: "100%",
    maxWidth: 1200,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 34,
    paddingBottom: 36,
  },

  orbitOne: {
    position: "absolute",
    width: 320,
    height: 320,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1E40AF",
    top: 20,
    right: -130,
    opacity: 0.75,
  },

  orbitTwo: {
    position: "absolute",
    width: 440,
    height: 440,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#312E81",
    bottom: -180,
    left: -190,
    opacity: 0.65,
  },

  logoImage: {
    alignSelf: "center",
    marginBottom: 10,
  },

  eyebrow: {
    color: "#38BDF8",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 4,
    marginBottom: 12,
  },

  title: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "900",
    lineHeight: 40,
    marginBottom: 12,
  },

  titleDesktop: {
    fontSize: 46,
    lineHeight: 54,
  },

  subtitle: {
    color: "#BFDBFE",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
    maxWidth: 760,
  },

  subtitleDesktop: {
    fontSize: 18,
    lineHeight: 28,
  },

  alertCard: {
    backgroundColor: "#0F172A",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  alertIconBox: {
    width: 76,
    height: 76,
    borderRadius: 999,
    backgroundColor: "#020617",
    borderWidth: 1,
    borderColor: "#1D4ED8",
    alignItems: "center",
    justifyContent: "center",
  },

  alertContent: {
    flex: 1,
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
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  primaryButtonText: {
    color: "#020617",
    fontWeight: "900",
    fontSize: 16,
  },

  secondaryButton: {
    backgroundColor: "#111827",
    borderRadius: 16,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    borderWidth: 1,
    borderColor: "#312E81",
  },

  secondaryButtonText: {
    color: "#E0F2FE",
    fontWeight: "900",
    fontSize: 16,
  },
});