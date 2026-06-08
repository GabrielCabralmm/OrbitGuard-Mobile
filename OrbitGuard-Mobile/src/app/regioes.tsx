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

function getRiskColor(tipoRisco: string) {
  const risco = tipoRisco.toUpperCase();

  if (risco.includes("ENCHENTE")) return "#38BDF8";
  if (risco.includes("DESLIZAMENTO")) return "#F97316";
  if (risco.includes("CALOR")) return "#EF4444";
  if (risco.includes("SECA")) return "#EAB308";
  if (risco.includes("TEMPESTADE")) return "#8B5CF6";

  return "#22C55E";
}

function getRiskDescription(tipoRisco: string) {
  const risco = tipoRisco.toUpperCase();

  if (risco.includes("ENCHENTE")) {
    return "Atenção para áreas com possibilidade de alagamento.";
  }

  if (risco.includes("DESLIZAMENTO")) {
    return "Evite encostas, áreas instáveis e locais com solo encharcado.";
  }

  if (risco.includes("CALOR")) {
    return "Mantenha hidratação e evite exposição prolongada ao sol.";
  }

  if (risco.includes("SECA")) {
    return "Use água de forma consciente e acompanhe orientações locais.";
  }

  if (risco.includes("TEMPESTADE")) {
    return "Evite áreas abertas, árvores e estruturas metálicas.";
  }

  return "Região acompanhada pelo sistema de monitoramento.";
}

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
        <Text style={styles.loadingText}>Carregando regiões monitoradas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.orbit} />

      <Text style={styles.eyebrow}>MAPA DE RISCO</Text>
      <Text style={styles.title}>Regiões Monitoradas</Text>

      <Text style={styles.subtitle}>
        Consulte áreas acompanhadas e veja recomendações rápidas de segurança.
      </Text>

      {regioes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhuma região cadastrada</Text>
          <Text style={styles.emptyText}>
            As regiões monitoradas aparecerão aqui quando estiverem disponíveis.
          </Text>
        </View>
      ) : (
        <FlatList
          data={regioes}
          keyExtractor={(item) => item.idRegiao?.toString() ?? item.nome}
          renderItem={({ item }) => {
            const riskColor = getRiskColor(item.tipoRiscoBase);

            return (
              <View style={[styles.card, { borderColor: riskColor }]}>
                <View style={styles.cardHeader}>
                  <View>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.location}>
                      {item.cidade} - {item.uf}
                    </Text>
                  </View>

                  <View style={[styles.dot, { backgroundColor: riskColor }]} />
                </View>

                <View style={styles.riskBox}>
                  <Text style={styles.riskLabel}>RISCO PRINCIPAL</Text>
                  <Text style={[styles.riskValue, { color: riskColor }]}>
                    {item.tipoRiscoBase}
                  </Text>
                </View>

                <Text style={styles.description}>
                  {getRiskDescription(item.tipoRiscoBase)}
                </Text>

                <View style={styles.metaBox}>
                  <Text style={styles.meta}>
                    População estimada: {item.populacaoEstimada}
                  </Text>

                  <Text style={styles.meta}>
                    Coordenadas: {item.latitude}, {item.longitude}
                  </Text>
                </View>
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
    overflow: "hidden",
  },

  orbit: {
    position: "absolute",
    width: 360,
    height: 360,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#312E81",
    bottom: -150,
    left: -160,
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

  listContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#111827",
    padding: 18,
    borderRadius: 18,
    marginBottom: 14,
    borderWidth: 1.5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 3,
  },

  location: {
    color: "#CBD5E1",
    fontSize: 14,
  },

  dot: {
    width: 18,
    height: 18,
    borderRadius: 999,
  },

  riskBox: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
    marginBottom: 12,
  },

  riskLabel: {
    color: "#94A3B8",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.4,
    marginBottom: 4,
  },

  riskValue: {
    fontSize: 20,
    fontWeight: "900",
  },

  description: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 21,
    marginBottom: 12,
  },

  metaBox: {
    borderTopWidth: 1,
    borderTopColor: "#1E293B",
    paddingTop: 12,
  },

  meta: {
    color: "#94A3B8",
    fontSize: 13,
    marginBottom: 3,
  },

  emptyContainer: {
    backgroundColor: "#111827",
    padding: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#312E81",
  },

  emptyTitle: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 8,
  },

  emptyText: {
    color: "#CBD5E1",
    lineHeight: 22,
  },
});