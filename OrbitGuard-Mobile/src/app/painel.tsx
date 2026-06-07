import { useFocusEffect } from "expo-router";
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
  const [usuarios, setUsuarios] = useState(0);
  const [regioes, setRegioes] = useState(0);
  const [alertas, setAlertas] = useState(0);
  const [loading, setLoading] = useState(true);
  const [apiOnline, setApiOnline] = useState(false);

  async function carregarResumo() {
    try {
      setLoading(true);

      const [usuariosResponse, regioesResponse, alertasResponse] =
        await Promise.allSettled([
          api.get("/Usuario"),
          api.get("/Regiao"),
          api.get("/Alerta"),
        ]);

      if (
        usuariosResponse.status === "fulfilled" &&
        Array.isArray(usuariosResponse.value.data)
      ) {
        setUsuarios(usuariosResponse.value.data.length);
      } else {
        setUsuarios(0);
      }

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

      setApiOnline(
        usuariosResponse.status === "fulfilled" ||
          regioesResponse.status === "fulfilled" ||
          alertasResponse.status === "fulfilled"
      );
    } catch {
      setApiOnline(false);
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
        <Text style={styles.loadingText}>Carregando painel...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Painel OrbitGuard</Text>

      <View style={styles.statusCard}>
        <Text style={styles.statusLabel}>Status da API</Text>
        <Text style={apiOnline ? styles.statusOnline : styles.statusOffline}>
          {apiOnline ? "Online" : "Indisponível"}
        </Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.number}>{usuarios}</Text>
          <Text style={styles.cardText}>Usuários</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{regioes}</Text>
          <Text style={styles.cardText}>Regiões</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{alertas}</Text>
          <Text style={styles.cardText}>Alertas</Text>
        </View>
      </View>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Resumo da solução</Text>
        <Text style={styles.infoText}>
          O aplicativo consome dados da API OrbitGuard publicada em ambiente
          externo, permitindo acompanhar informações essenciais para o
          monitoramento de riscos ambientais.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={carregarResumo}>
        <Text style={styles.buttonText}>Atualizar painel</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    color: "#CBD5E1",
    marginTop: 12,
  },

  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    padding: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 20,
  },

  statusCard: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 16,
  },

  statusLabel: {
    color: "#CBD5E1",
    fontSize: 14,
    marginBottom: 6,
  },

  statusOnline: {
    color: "#22C55E",
    fontSize: 22,
    fontWeight: "800",
  },

  statusOffline: {
    color: "#EF4444",
    fontSize: 22,
    fontWeight: "800",
  },

  grid: {
    gap: 12,
    marginBottom: 16,
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: "#334155",
  },

  number: {
    color: "#38BDF8",
    fontSize: 34,
    fontWeight: "900",
    marginBottom: 4,
  },

  cardText: {
    color: "#CBD5E1",
    fontSize: 16,
    fontWeight: "600",
  },

  infoCard: {
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 18,
  },

  infoTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  infoText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#38BDF8",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
  },

  buttonText: {
    color: "#0F172A",
    fontWeight: "800",
    fontSize: 16,
  },
});