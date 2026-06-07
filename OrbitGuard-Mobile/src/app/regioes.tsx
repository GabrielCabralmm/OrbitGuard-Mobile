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
import { Regiao } from "../types/regiao";

export default function RegioesScreen() {
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarRegioes() {
    try {
      setLoading(true);

      const response = await api.get("/Regiao");

      if (Array.isArray(response.data)) {
        setRegioes(response.data);
      } else {
        setRegioes([]);
      }
    } catch {
      setRegioes([]);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarRegioes();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Carregando regiões...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regiões Monitoradas</Text>

      {regioes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhuma região encontrada</Text>
          <Text style={styles.emptyText}>
            Cadastre regiões pela API para visualizá-las no aplicativo.
          </Text>
        </View>
      ) : (
        <FlatList
          data={regioes}
          keyExtractor={(item) => item.idRegiao?.toString() ?? item.nome}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>

              <Text style={styles.info}>
                Cidade: {item.cidade} - {item.uf}
              </Text>

              <Text style={styles.info}>
                Risco base: {item.tipoRiscoBase}
              </Text>

              <Text style={styles.info}>
                População estimada: {item.populacaoEstimada}
              </Text>

              <Text style={styles.coordinates}>
                Lat: {item.latitude} | Long: {item.longitude}
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
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
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 20,
  },

  listContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  info: {
    color: "#CBD5E1",
    marginBottom: 3,
  },

  coordinates: {
    color: "#38BDF8",
    marginTop: 8,
    fontWeight: "600",
  },

  emptyContainer: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#334155",
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  emptyText: {
    color: "#CBD5E1",
    lineHeight: 20,
  },
});