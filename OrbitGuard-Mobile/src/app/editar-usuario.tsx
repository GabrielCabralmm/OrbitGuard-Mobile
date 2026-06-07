import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { api } from "../services/api";
import { Usuario } from "../types/usuario";

const perfis = ["CIDADÃO", "DEFESA CIVIL", "OPERADOR", "ADMIN"];

const perfilApi: Record<string, string> = {
  "CIDADÃO": "CIDADAO",
  "DEFESA CIVIL": "GESTOR",
  OPERADOR: "OPERADOR",
  ADMIN: "ADMIN",
};

function converterPerfilParaTela(perfil?: string) {
  if (perfil === "CIDADAO") return "CIDADÃO";
  if (perfil === "GESTOR") return "DEFESA CIVIL";
  if (perfil === "OPERADOR") return "OPERADOR";
  if (perfil === "ADMIN") return "ADMIN";
  return "CIDADÃO";
}

export default function EditarUsuarioScreen() {
  const params = useLocalSearchParams();

  const idUsuario = Number(params.idUsuario);
  const [nome, setNome] = useState(String(params.nome ?? ""));
  const [email, setEmail] = useState(String(params.email ?? ""));
  const [perfil, setPerfil] = useState(
    converterPerfilParaTela(String(params.perfil ?? "CIDADAO"))
  );
  const [telefone, setTelefone] = useState(String(params.telefone ?? ""));
  const [ativo, setAtivo] = useState(String(params.ativo ?? "S"));
  const [loading, setLoading] = useState(false);

  async function atualizarUsuario() {
    if (!idUsuario || !nome.trim() || !email.trim()) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const usuarioAtualizado: Usuario = {
        idUsuario,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        perfil: perfilApi[perfil],
        telefone: telefone.trim(),
        ativo: ativo.trim().toUpperCase(),
      };

      await api.put(`/Usuario/${idUsuario}`, usuarioAtualizado);

      Alert.alert("Sucesso", "Usuário atualizado com sucesso.");
      router.push("/usuarios");
    } catch (error: any) {
      const mensagem =
        error?.response?.data ||
        "Não foi possível atualizar o usuário. Tente novamente.";

      Alert.alert("Erro", String(mensagem));
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.eyebrow}>ATUALIZAÇÃO DE ACESSO</Text>
        <Text style={styles.title}>Editar Usuário</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome"
          placeholderTextColor="#64748B"
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o e-mail"
          placeholderTextColor="#64748B"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Perfil</Text>
        <View style={styles.profileGrid}>
          {perfis.map((item) => (
            <Pressable
              key={item}
              style={[
                styles.profileButton,
                perfil === item && styles.profileButtonActive,
              ]}
              onPress={() => setPerfil(item)}
            >
              <Text
                style={[
                  styles.profileText,
                  perfil === item && styles.profileTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="11999999999"
          placeholderTextColor="#64748B"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.profileGrid}>
          {["S", "N"].map((item) => (
            <Pressable
              key={item}
              style={[
                styles.profileButton,
                ativo === item && styles.profileButtonActive,
              ]}
              onPress={() => setAtivo(item)}
            >
              <Text
                style={[
                  styles.profileText,
                  ativo === item && styles.profileTextActive,
                ]}
              >
                {item === "S" ? "ATIVO" : "INATIVO"}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={atualizarUsuario}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#020617" />
          ) : (
            <Text style={styles.buttonText}>Salvar alterações</Text>
          )}
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: "#050816",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  eyebrow: {
    color: "#7DD3FC",
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
  },

  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#FFFFFF",
    marginBottom: 24,
  },

  label: {
    color: "#BFDBFE",
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#111827",
    color: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#312E81",
  },

  profileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 16,
  },

  profileButton: {
    backgroundColor: "#111827",
    borderColor: "#312E81",
    borderWidth: 1,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },

  profileButtonActive: {
    backgroundColor: "#38BDF8",
    borderColor: "#38BDF8",
  },

  profileText: {
    color: "#CBD5E1",
    fontWeight: "800",
    fontSize: 12,
  },

  profileTextActive: {
    color: "#020617",
  },

  button: {
    backgroundColor: "#38BDF8",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#020617",
    fontSize: 16,
    fontWeight: "900",
  },
});