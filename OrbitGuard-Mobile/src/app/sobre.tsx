import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function SobreScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.logo}>OrbitGuard</Text>

      <Text style={styles.title}>Sobre a Solução</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Proposta</Text>
        <Text style={styles.cardText}>
          O OrbitGuard é uma solução voltada ao monitoramento de riscos
          ambientais, conectando dados, regiões monitoradas, usuários, sensores
          e alertas para apoiar ações preventivas.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Relação com a Global Solution</Text>
        <Text style={styles.cardText}>
          A proposta se conecta ao tema da economia espacial ao utilizar dados
          e infraestrutura tecnológica para apoiar decisões relacionadas ao
          clima, prevenção de desastres e cidades mais resilientes.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Integração com API</Text>
        <Text style={styles.cardText}>
          O aplicativo consome uma API REST desenvolvida em .NET, publicada em
          ambiente externo e integrada a um banco de dados Oracle.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Tecnologias Utilizadas</Text>

        <Text style={styles.item}>• React Native</Text>
        <Text style={styles.item}>• Expo Router</Text>
        <Text style={styles.item}>• TypeScript</Text>
        <Text style={styles.item}>• Axios</Text>
        <Text style={styles.item}>• API REST .NET</Text>
        <Text style={styles.item}>• Oracle Database</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Integrantes</Text>

        <Text style={styles.item}>• Enzo Monteiro Maciel</Text>
        <Text style={styles.item}>• Gabriel Cabral Mendes Mariano</Text>
        <Text style={styles.item}>• Matheus de Almeida Sousa</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  logo: {
    fontSize: 34,
    fontWeight: "800",
    color: "#38BDF8",
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1E293B",
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 14,
  },

  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },

  cardText: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 22,
  },

  item: {
    color: "#CBD5E1",
    fontSize: 15,
    lineHeight: 24,
  },
});