import { Link, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api } from "../services/api";

export default function PainelScreen() {
  const [regioes, setRegioes] = useState(0);
  const [alertas, setAlertas] = useState(0);
  const [abrigos, setAbrigos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [monitoramentoAtivo, setMonitoramentoAtivo] = useState(false);

  async function carregarResumo() {
    try {
      setLoading(true);

      const [regioesResponse, alertasResponse, abrigosResponse] =
        await Promise.allSettled([
          api.get("/Regiao"),
          api.get("/Alerta"),
          api.get("/Abrigo"),
        ]);

      if (
        regioesResponse.status === "fulfilled" &&
        Array.isArray(regioesResponse.value.data)
      ) {
        setRegioes(regioesResponse.value.data.length);
      } else {
        setRegioes(0);
      }

      if (
        alertasResponse.status === "fulfilled" &&
        Array.isArray(alertasResponse.value.data)
      ) {
        setAlertas(alertasResponse.value.data.length);
      } else {
        setAlertas(0);
      }

      if (
        abrigosResponse.status === "fulfilled" &&
        Array.isArray(abrigosResponse.value.data)
      ) {
        setAbrigos(abrigosResponse.value.data.length);
      } else {
        setAbrigos(0);
      }

      setMonitoramentoAtivo(
        regioesResponse.status === "fulfilled" ||
          alertasResponse.status === "fulfilled" ||
          abrigosResponse.status === "fulfilled"
      );
    } catch {
      setMonitoramentoAtivo(false);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarResumo();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Atualizando informações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.orbitOne} />
      <View style={styles.orbitTwo} />

      <Text style={styles.eyebrow}>CENTRAL DE PROTEÇÃO</Text>
      <Text style={styles.title}>Painel do Cidadão</Text>

      <Text style={styles.subtitle}>
        Consulte rapidamente a situação geral das regiões monitoradas e acesse
        orientações de proteção.
      </Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Monitoramento</Text>
        <Text
          style={
            monitoramentoAtivo ? styles.statusOnline : styles.statusOffline
          }
        >
          {monitoramentoAtivo ? "Ativo" : "Indisponível"}
        </Text>

        <Text style={styles.statusDescription}>
          {monitoramentoAtivo
            ? "As informações estão sendo acompanhadas pelo sistema."
            : "Não foi possível atualizar as informações no momento."}
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.number}>{alertas}</Text>
          <Text style={styles.cardText}>alertas registrados</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{regioes}</Text>
          <Text style={styles.cardText}>regiões monitoradas</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{abrigos}</Text>
          <Text style={styles.cardText}>abrigos cadastrados</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Link href="/alertas" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Ver alertas</Text>
          </Pressable>
        </Link>

        <Link href="/abrigos" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Encontrar abrigos</Text>
          </Pressable>
        </Link>

        <Pressable style={styles.outlineButton} onPress={carregarResumo}>
          <Text style={styles.outlineButtonText}>Atualizar informações</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#030712",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#CBD5E1",
    marginTop: 12,
  },

  container: {
    flex: 1,
    backgroundColor: "#030712",
    padding: 20,
    overflow: "hidden",
  },

  orbitOne: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    top: -130,
    right: -140,
    opacity: 0.7,
  },

  orbitTwo: {
    position: "absolute",
    width: 420,
    height: 420,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#312E81",
    bottom: -180,
    left: -180,
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
    marginBottom: 18,
  },

  statusCard: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#38BDF8",
    marginBottom: 16,
  },

  statusLabel: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "700",
  },

  statusOnline: {
    color: "#22C55E",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 6,
  },

  statusOffline: {
    color: "#EF4444",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 6,
  },

  statusDescription: {
    color: "#CBD5E1",
    fontSize: 14,
    lineHeight: 20,
  },

  grid: {
    gap: 12,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#312E81",
  },

  number: {
    color: "#38BDF8",
    fontSize: 36,
    fontWeight: "900",
    marginBottom: 4,
  },

  cardText: {
    color: "#CBD5E1",
    fontSize: 15,
    fontWeight: "700",
  },

  actions: {
    gap: 10,
  },

  primaryButton: {
    backgroundColor: "#38BDF8",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
  },

  primaryButtonText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "900",
  },

  secondaryButton: {
    backgroundColor: "#111827",
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#312E81",
  },

  secondaryButtonText: {
    color: "#E0F2FE",
    fontSize: 16,
    fontWeight: "800",
  },

  outlineButton: {
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#1E40AF",
  },

  outlineButtonText: {
    color: "#93C5FD",
    fontSize: 16,
    fontWeight: "800",
  },
});