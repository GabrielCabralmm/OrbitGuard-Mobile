import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api } from "../../services/api";
import { Abrigo } from "../../types/abrigo";

function calcularOcupacao(capacidadeTotal: number, capacidadeOcupada: number) {
  if (capacidadeTotal <= 0) return 0;
  return Math.round((capacidadeOcupada / capacidadeTotal) * 100);
}

function getOcupacaoColor(percentual: number) {
  if (percentual >= 90) return "#EF4444";
  if (percentual >= 70) return "#F97316";
  if (percentual >= 40) return "#EAB308";
  return "#22C55E";
}

function getStatusTexto(ativo: string, vagas: number) {
  if (ativo !== "S") return "Indisponível";
  if (vagas <= 0) return "Lotado";
  return "Disponível";
}

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
      <View style={styles.orbit} />

      <Text style={styles.eyebrow}>REDE DE APOIO</Text>
      <Text style={styles.title}>Abrigos Próximos</Text>

      <Text style={styles.subtitle}>
        Consulte locais de apoio cadastrados para situações de emergência e
        acompanhe a disponibilidade estimada.
      </Text>

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Antes de se deslocar</Text>
        <Text style={styles.noticeText}>
          Em situações de risco, siga as orientações oficiais e evite áreas
          alagadas, encostas e locais instáveis.
        </Text>
      </View>

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
            const vagas = Math.max(
              item.capacidadeTotal - item.capacidadeOcupada,
              0
            );

            const ocupacao = calcularOcupacao(
              item.capacidadeTotal,
              item.capacidadeOcupada
            );

            const corOcupacao = getOcupacaoColor(ocupacao);
            const status = getStatusTexto(item.ativo, vagas);

            return (
              <View style={[styles.card, { borderColor: corOcupacao }]}>
                <View style={styles.cardHeader}>
                  <View style={styles.cardTitleBox}>
                    <Text style={styles.nome}>{item.nome}</Text>
                    <Text style={styles.endereco}>{item.endereco}</Text>
                  </View>

                  <View
                    style={[
                      styles.statusDot,
                      {
                        backgroundColor:
                          status === "Disponível" ? "#22C55E" : "#EF4444",
                      },
                    ]}
                  />
                </View>

                <View style={styles.capacityBox}>
                  <Text style={styles.capacityNumber}>{vagas}</Text>
                  <Text style={styles.capacityText}>vagas estimadas</Text>
                </View>

                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <Text style={styles.progressLabel}>Ocupação</Text>
                    <Text style={[styles.progressValue, { color: corOcupacao }]}>
                      {ocupacao}%
                    </Text>
                  </View>

                  <View style={styles.progressTrack}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${Math.min(ocupacao, 100)}%`,
                          backgroundColor: corOcupacao,
                        },
                      ]}
                    />
                  </View>
                </View>

                <View style={styles.metaBox}>
                  <Text style={styles.meta}>
                    Capacidade total: {item.capacidadeTotal}
                  </Text>
                  <Text style={styles.meta}>
                    Pessoas acolhidas: {item.capacidadeOcupada}
                  </Text>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          status === "Disponível" ? "#22C55E" : "#EF4444",
                      },
                    ]}
                  >
                    {status}
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
    width: 340,
    height: 340,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    bottom: -140,
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
    color: "#FFFFFF",
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 8,
  },

  subtitle: {
    color: "#A5B4FC",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },

  noticeCard: {
    backgroundColor: "#172554",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#38BDF8",
    marginBottom: 18,
  },

  noticeTitle: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "900",
    marginBottom: 6,
  },

  noticeText: {
    color: "#E0F2FE",
    fontSize: 14,
    lineHeight: 20,
  },

  listContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1.5,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 14,
  },

  cardTitleBox: {
    flex: 1,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 19,
    fontWeight: "900",
    marginBottom: 6,
  },

  endereco: {
    color: "#CBD5E1",
    lineHeight: 20,
  },

  statusDot: {
    width: 15,
    height: 15,
    borderRadius: 999,
    marginTop: 4,
  },

  capacityBox: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#1E293B",
  },

  capacityNumber: {
    color: "#38BDF8",
    fontSize: 34,
    fontWeight: "900",
  },

  capacityText: {
    color: "#CBD5E1",
    fontWeight: "700",
  },

  progressContainer: {
    marginBottom: 14,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  progressLabel: {
    color: "#CBD5E1",
    fontWeight: "700",
  },

  progressValue: {
    fontWeight: "900",
  },

  progressTrack: {
    height: 10,
    backgroundColor: "#020617",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 999,
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

  statusText: {
    marginTop: 6,
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