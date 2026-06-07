import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
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
      setLoading(true);

      const response = await api.get("/Usuario");

      if (Array.isArray(response.data)) {
        setUsuarios(response.data);
      } else {
        setUsuarios([]);
      }
    } catch {
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  }

  function editarUsuario(usuario: Usuario) {
    router.push({
      pathname: "/editar-usuario",
      params: {
        idUsuario: String(usuario.idUsuario),
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        telefone: usuario.telefone,
        ativo: usuario.ativo,
      },
    });
  }

  function confirmarExclusao(usuario: Usuario) {
    Alert.alert(
      "Excluir usuário",
      `Deseja realmente excluir ${usuario.nome}?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => excluirUsuario(usuario.idUsuario),
        },
      ]
    );
  }

  async function excluirUsuario(idUsuario?: number) {
    if (!idUsuario) {
      Alert.alert("Erro", "Usuário inválido.");
      return;
    }

    try {
      await api.delete(`/Usuario/${idUsuario}`);
      Alert.alert("Sucesso", "Usuário excluído com sucesso.");
      carregarUsuarios();
    } catch (error: any) {
      const mensagem =
        error?.response?.data ||
        "Não foi possível excluir o usuário. Tente novamente.";

      Alert.alert("Erro", String(mensagem));
    }
  }

  useFocusEffect(
    useCallback(() => {
      carregarUsuarios();
    }, [])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Usuários</Text>

        <Link href="/novo-usuario" asChild>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>Novo</Text>
          </Pressable>
        </Link>
      </View>

      {usuarios.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum usuário encontrado</Text>
          <Text style={styles.emptyText}>
            Cadastre um novo usuário para iniciar os testes do aplicativo.
          </Text>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.idUsuario?.toString() ?? item.email}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.info}>Email: {item.email}</Text>
              <Text style={styles.info}>Perfil: {item.perfil}</Text>
              <Text style={styles.info}>Telefone: {item.telefone}</Text>
              <Text style={styles.status}>
                Status: {item.ativo === "S" ? "Ativo" : "Inativo"}
              </Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => editarUsuario(item)}
                >
                  <Text style={styles.actionText}>Editar</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => confirmarExclusao(item)}
                >
                  <Text style={styles.deleteText}>Excluir</Text>
                </Pressable>
              </View>
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

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  addButton: {
    backgroundColor: "#38BDF8",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },

  addButtonText: {
    color: "#0F172A",
    fontWeight: "700",
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
    marginBottom: 6,
  },

  info: {
    color: "#CBD5E1",
    marginBottom: 2,
  },

  status: {
    color: "#38BDF8",
    fontWeight: "700",
    marginTop: 8,
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  editButton: {
    flex: 1,
    backgroundColor: "#38BDF8",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#7F1D1D",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "#0F172A",
    fontWeight: "700",
  },

  deleteText: {
    color: "#FFFFFF",
    fontWeight: "700",
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