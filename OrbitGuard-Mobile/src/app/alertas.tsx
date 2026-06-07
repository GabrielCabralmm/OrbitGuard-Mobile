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
import { Alerta } from "../types/alerta";

export default function AlertasScreen() {
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarAlertas() {
    try {
      setLoading(true);

      const response = await api.get("/Alerta");

      if (Array.isArray(response.data)) {
        setAlertas(response.data);
      } else {
        setAlertas([]);
      }
    } catch {
      setAlertas([]);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarAlertas();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Carregando alertas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alertas de Risco</Text>

      {alertas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum alerta encontrado</Text>
          <Text style={styles.emptyText}>
            Os alertas cadastrados na API serão exibidos aqui.
          </Text>
        </View>
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.idAlerta?.toString() ?? item.titulo}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.nome}>{item.titulo}</Text>
                <Text style={styles.badge}>{item.nivelRisco}</Text>
              </View>

              <Text style={styles.info}>{item.mensagem}</Text>

              <Text style={styles.meta}>Região: {item.idRegiao}</Text>
              <Text style={styles.meta}>Status: {item.statusAlerta}</Text>

              {item.dataAlerta && (
                <Text style={styles.date}>
                  Data: {new Date(item.dataAlerta).toLocaleString("pt-BR")}
                </Text>
              )}
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

  cardHeader: {
    gap: 8,
    marginBottom: 10,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#38BDF8",
    color: "#0F172A",
    fontWeight: "800",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: "hidden",
  },

  info: {
    color: "#CBD5E1",
    lineHeight: 20,
    marginBottom: 10,
  },

  meta: {
    color: "#94A3B8",
    marginBottom: 2,
  },

  date: {
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