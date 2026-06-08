import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api } from "../services/api";
import { Abrigo } from "../types/abrigo";

export default function AbrigosScreen() {
  const [abrigos, setAbrigos] = useState<Abrigo[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarAbrigos() {
    try {
      setLoading(true);

      const response = await api.get("/Abrigo");

      if (Array.isArray(response.data)) {
        setAbrigos(response.data);
      } else {
        setAbrigos([]);
      }
    } catch {
      setAbrigos([]);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarAbrigos();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Buscando abrigos disponíveis...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrigos Disponíveis</Text>

      <Text style={styles.subtitle}>
        Locais cadastrados para apoio em situações de emergência.
      </Text>

      {abrigos.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum abrigo encontrado</Text>
          <Text style={styles.emptyText}>
            Assim que houver abrigos cadastrados, eles aparecerão nesta área.
          </Text>
        </View>
      ) : (
        <FlatList
          data={abrigos}
          keyExtractor={(item) => item.idAbrigo?.toString() ?? item.nome}
          renderItem={({ item }) => {
            const vagas = item.capacidadeTotal - item.capacidadeOcupada;

            return (
              <View style={styles.card}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.info}>{item.endereco}</Text>

                <View style={styles.capacityBox}>
                  <Text style={styles.capacityNumber}>{vagas}</Text>
                  <Text style={styles.capacityText}>vagas estimadas</Text>
                </View>

                <Text style={styles.meta}>
                  Capacidade: {item.capacidadeOcupada}/{item.capacidadeTotal}
                </Text>

                <Text style={item.ativo === "S" ? styles.open : styles.closed}>
                  {item.ativo === "S" ? "Disponível" : "Indisponível"}
                </Text>
              </View>
            );
          }}
          contentContainerStyle={styles.listContent}
        />
      )}
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
  },

  title: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
    marginBottom: 6,
  },

  subtitle: {
    color: "#A5B4FC",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 20,
  },

  listContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#312E81",
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 6,
  },

  info: {
    color: "#CBD5E1",
    lineHeight: 20,
    marginBottom: 14,
  },

  capacityBox: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1D4ED8",
  },

  capacityNumber: {
    color: "#38BDF8",
    fontSize: 32,
    fontWeight: "900",
  },

  capacityText: {
    color: "#CBD5E1",
    fontWeight: "700",
  },

  meta: {
    color: "#94A3B8",
    marginBottom: 8,
  },

  open: {
    color: "#22C55E",
    fontWeight: "900",
  },

  closed: {
    color: "#EF4444",
    fontWeight: "900",
  },

  emptyContainer: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#312E81",
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },

  emptyText: {
    color: "#CBD5E1",
    lineHeight: 21,
  },
});