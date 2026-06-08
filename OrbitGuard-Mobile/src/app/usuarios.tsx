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
    Alert.alert("Remover cadastro", `Deseja remover o cadastro de ${usuario.nome}?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => excluirUsuario(usuario.idUsuario),
      },
    ]);
  }

  async function excluirUsuario(idUsuario?: number) {
    if (!idUsuario) {
      Alert.alert("Erro", "Cadastro inválido.");
      return;
    }

    try {
      await api.delete(`/Usuario/${idUsuario}`);
      Alert.alert("Sucesso", "Cadastro removido com sucesso.");
      carregarUsuarios();
    } catch (error: any) {
      const mensagem =
        error?.response?.data ||
        "Não foi possível remover o cadastro. Tente novamente.";

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
        <Text style={styles.loadingText}>Carregando cadastros...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.orbit} />

      <Text style={styles.eyebrow}>PARTICIPAÇÃO CIDADÃ</Text>
      <Text style={styles.title}>Cadastro OrbitGuard</Text>

      <Text style={styles.subtitle}>
        Cadastre-se para acompanhar informações importantes e participar da rede
        de proteção em regiões monitoradas.
      </Text>

      <View style={styles.noticeCard}>
        <Text style={styles.noticeTitle}>Por que se cadastrar?</Text>
        <Text style={styles.noticeText}>
          O cadastro ajuda a organizar usuários interessados em acompanhar
          alertas, regiões e orientações de segurança.
        </Text>
      </View>

      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Cadastros</Text>

        <Link href="/novo-usuario" asChild>
          <Pressable style={styles.addButton}>
            <Text style={styles.addButtonText}>Cadastrar</Text>
          </Pressable>
        </Link>
      </View>

      {usuarios.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum cadastro encontrado</Text>
          <Text style={styles.emptyText}>
            Faça o primeiro cadastro para validar a integração do aplicativo.
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

              <Text style={item.ativo === "S" ? styles.statusAtivo : styles.statusInativo}>
                {item.ativo === "S" ? "Cadastro ativo" : "Cadastro inativo"}
              </Text>

              <View style={styles.actions}>
                <Pressable
                  style={styles.editButton}
                  onPress={() => editarUsuario(item)}
                >
                  <Text style={styles.editButtonText}>Atualizar</Text>
                </Pressable>

                <Pressable
                  style={styles.deleteButton}
                  onPress={() => confirmarExclusao(item)}
                >
                  <Text style={styles.deleteButtonText}>Remover</Text>
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
    width: 330,
    height: 330,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#312E81",
    top: -140,
    right: -160,
    opacity: 0.55,
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
    lineHeight: 21,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  addButton: {
    backgroundColor: "#38BDF8",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 999,
  },

  addButtonText: {
    color: "#020617",
    fontWeight: "900",
  },

  listContent: {
    paddingBottom: 24,
  },

  card: {
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#312E81",
  },

  nome: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 6,
  },

  info: {
    color: "#CBD5E1",
    marginBottom: 2,
  },

  statusAtivo: {
    color: "#22C55E",
    fontWeight: "900",
    marginTop: 8,
  },

  statusInativo: {
    color: "#EF4444",
    fontWeight: "900",
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
    borderRadius: 12,
    alignItems: "center",
  },

  deleteButton: {
    flex: 1,
    backgroundColor: "#7F1D1D",
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: "center",
  },

  editButtonText: {
    color: "#020617",
    fontWeight: "900",
  },

  deleteButtonText: {
    color: "#FFFFFF",
    fontWeight: "900",
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
    fontSize: 18,
    fontWeight: "900",
    marginBottom: 8,
  },

  emptyText: {
    color: "#CBD5E1",
    lineHeight: 21,
  },
});