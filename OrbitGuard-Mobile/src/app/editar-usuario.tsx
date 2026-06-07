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
} from "react-native";

import { api } from "../services/api";
import { Usuario } from "../types/usuario";

export default function EditarUsuarioScreen() {
  const params = useLocalSearchParams();

  const idUsuario = Number(params.idUsuario);
  const [nome, setNome] = useState(String(params.nome ?? ""));
  const [email, setEmail] = useState(String(params.email ?? ""));
  const [perfil, setPerfil] = useState(String(params.perfil ?? "ADMIN"));
  const [telefone, setTelefone] = useState(String(params.telefone ?? ""));
  const [ativo, setAtivo] = useState(String(params.ativo ?? "S"));
  const [loading, setLoading] = useState(false);

  async function atualizarUsuario() {
    if (!idUsuario || !nome.trim() || !email.trim() || !perfil.trim()) {
      Alert.alert("Atenção", "Preencha os campos obrigatórios.");
      return;
    }

    try {
      setLoading(true);

      const usuarioAtualizado: Usuario = {
        idUsuario,
        nome: nome.trim(),
        email: email.trim().toLowerCase(),
        perfil: perfil.trim().toUpperCase(),
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
        <TextInput
          style={styles.input}
          placeholder="ADMIN"
          placeholderTextColor="#64748B"
          value={perfil}
          onChangeText={setPerfil}
          autoCapitalize="characters"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          placeholder="11999999999"
          placeholderTextColor="#64748B"
          value={telefone}
          onChangeText={setTelefone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Ativo</Text>
        <TextInput
          style={styles.input}
          placeholder="S ou N"
          placeholderTextColor="#64748B"
          value={ativo}
          onChangeText={setAtivo}
          autoCapitalize="characters"
          maxLength={1}
        />

        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={atualizarUsuario}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#0F172A" />
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
    backgroundColor: "#0F172A",
  },

  container: {
    padding: 20,
    paddingBottom: 40,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 24,
  },

  label: {
    color: "#CBD5E1",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },

  input: {
    backgroundColor: "#1E293B",
    color: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },

  button: {
    backgroundColor: "#38BDF8",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.7,
  },

  buttonText: {
    color: "#0F172A",
    fontSize: 16,
    fontWeight: "700",
  },
});