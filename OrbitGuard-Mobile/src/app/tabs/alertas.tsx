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
import { Alerta } from "../../types/alerta";

function getRiskColor(nivel: string) {
  const risco = nivel.toUpperCase();

  if (risco.includes("CRITICO")) return "#EF4444";
  if (risco.includes("ALTO")) return "#F97316";
  if (risco.includes("MEDIO")) return "#EAB308";
  if (risco.includes("ATENCAO")) return "#38BDF8";

  return "#22C55E";
}

function getRiskLabel(nivel: string) {
  const risco = nivel.toUpperCase();

  if (risco.includes("CRITICO")) return "RISCO CRÍTICO";
  if (risco.includes("ALTO")) return "RISCO ALTO";
  if (risco.includes("MEDIO")) return "RISCO MÉDIO";
  if (risco.includes("ATENCAO")) return "ATENÇÃO";

  return nivel;
}

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
        <Text style={styles.loadingText}>Verificando alertas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.orbit} />

      <Text style={styles.eyebrow}>MONITORAMENTO ATIVO</Text>
      <Text style={styles.title}>Alertas Ambientais</Text>

      <Text style={styles.subtitle}>
        Acompanhe avisos importantes sobre riscos em regiões monitoradas.
      </Text>

      {alertas.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum alerta ativo</Text>
          <Text style={styles.emptyText}>
            No momento não há alertas registrados. Continue acompanhando esta
            área para novas atualizações.
          </Text>
        </View>
      ) : (
        <FlatList
          data={alertas}
          keyExtractor={(item) => item.idAlerta?.toString() ?? item.titulo}
          renderItem={({ item }) => {
            const riskColor = getRiskColor(item.nivelRisco);

            return (
              <View style={[styles.card, { borderColor: riskColor }]}>
                <View style={styles.cardHeader}>
                  <Text
                    style={[
                      styles.badge,
                      {
                        backgroundColor: riskColor,
                      },
                    ]}
                  >
                    {getRiskLabel(item.nivelRisco)}
                  </Text>

                  <Text style={styles.status}>{item.statusAlerta}</Text>
                </View>

                <Text style={styles.nome}>{item.titulo}</Text>

                <Text style={styles.info}>{item.mensagem}</Text>

                <View style={styles.metaBox}>
                  <Text style={styles.meta}>Região monitorada #{item.idRegiao}</Text>

                  {item.dataAlerta && (
                    <Text style={styles.meta}>
                      Atualizado em{" "}
                      {new Date(item.dataAlerta).toLocaleString("pt-BR")}
                    </Text>
                  )}
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
    width: 320,
    height: 320,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#1D4ED8",
    top: -130,
    right: -150,
    opacity: 0.7,
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
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    marginBottom: 12,
  },

  badge: {
    color: "#020617",
    fontWeight: "900",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
  },

  status: {
    color: "#CBD5E1",
    fontSize: 12,
    fontWeight: "800",
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
    marginBottom: 8,
  },

  info: {
    color: "#CBD5E1",
    lineHeight: 21,
    marginBottom: 14,
  },

  metaBox: {
    backgroundColor: "#020617",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#1E293B",
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