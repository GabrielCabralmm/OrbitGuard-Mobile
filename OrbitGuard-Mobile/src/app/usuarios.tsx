import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { api } from "../services/api";
import { Usuario } from "../types/usuario";

export default function UsuariosScreen() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);

  async function carregarUsuarios() {
    try {
      const response = await api.get("/Usuario");
      setUsuarios(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarUsuarios();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Usuários</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.idUsuario?.toString() ?? Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>

            <Text style={styles.info}>
              Email: {item.email}
            </Text>

            <Text style={styles.info}>
              Perfil: {item.perfil}
            </Text>

            <Text style={styles.info}>
              Telefone: {item.telefone}
            </Text>
          </View>
        )}
      />
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

  card: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },

  info: {
    color: "#CBD5E1",
    marginBottom: 2,
  },
});