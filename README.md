# OrbitGuard Mobile

## Integrantes

- Gabriel Cabral Mendes Mariano
- Enzo Monteiro Maciel
- Matheus de Almeida Sousa

---

## Repositório GitHub

[INSERIR LINK DO GITHUB CLASSROOM]

---

## Vídeo Demonstrativo

[INSERIR LINK DO YOUTUBE]

---

# Descrição da Solução

O OrbitGuard Mobile é um aplicativo desenvolvido em React Native com Expo para auxiliar cidadãos no acompanhamento de riscos ambientais e situações de emergência.

A aplicação centraliza informações sobre alertas ambientais, regiões monitoradas, abrigos disponíveis e orientações de segurança, permitindo acesso rápido a informações importantes em momentos de risco.

O projeto foi desenvolvido com foco na conscientização, prevenção e acesso facilitado a informações relacionadas a eventos ambientais.

---

# Problema Escolhido

Eventos climáticos extremos, enchentes, queimadas e outras ocorrências ambientais afetam milhares de pessoas todos os anos.

Em muitas situações, a população possui dificuldade para acessar rapidamente informações sobre riscos, alertas ativos, regiões monitoradas e locais de apoio.

O OrbitGuard foi desenvolvido para disponibilizar essas informações de forma simples, organizada e acessível através de dispositivos móveis.

---

# Público-Alvo

- População em geral;
- Moradores de áreas de risco;
- Comunidades sujeitas a enchentes e queimadas;
- Usuários interessados em acompanhar informações ambientais da sua região.

---

# Objetivos

- Divulgar alertas ambientais;
- Facilitar o acesso a informações preventivas;
- Apresentar regiões monitoradas;
- Informar locais de abrigo;
- Disponibilizar orientações de segurança;
- Promover conscientização sobre riscos ambientais.

---

# Tecnologias Utilizadas

- React Native
- Expo
- Expo Router
- TypeScript
- Axios
- ASP.NET Core 8
- Oracle Database
- Git
- GitHub

---

# Funcionalidades

## Tela Inicial

Apresenta uma visão geral da plataforma e permite acesso rápido às principais funcionalidades.

## Alertas

Consulta de alertas ambientais cadastrados na plataforma.

## Regiões

Visualização das regiões monitoradas.

## Abrigos

Consulta dos abrigos disponíveis para atendimento da população.

## Orientações

Disponibiliza recomendações de segurança para diferentes cenários de risco.

## Painel

Apresenta indicadores gerais e informações consolidadas do sistema.

---

# Navegação

A aplicação utiliza Expo Router para gerenciamento das rotas.

O usuário pode navegar entre:

- Início
- Alertas
- Regiões
- Abrigos
- Orientações
- Painel

A navegação foi desenvolvida seguindo boas práticas de usabilidade e acessibilidade.

---

# Como Executar o Projeto

## 1. Clonar o Repositório

```bash
git clone URL_DO_REPOSITORIO
```

## 2. Acessar a Pasta do Projeto

```bash
cd OrbitGuard-Mobile
```

## 3. Instalar Dependências

```bash
npm install
```

## 4. Executar o Projeto

```bash
npx expo start
```

## 5. Executar na Web

```bash
npx expo start --web
```

## 6. Executar no Android

```bash
npx expo start --android
```

## 7. Limpar Cache do Expo

```bash
npx expo start -c
```

---

# Integração com API

A aplicação consome dados através da API OrbitGuard utilizando Axios.

Arquivo de configuração:

```text
src/services/api.ts
```

Exemplo:

```ts
import axios from "axios";

export const api = axios.create({
  baseURL: "URL_DA_API"
});
```

---

# Estrutura do Projeto

```text
OrbitGuard-Mobile
│
├── assets
│
├── src
│   │
│   ├── app
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── alertas.tsx
│   │   ├── regioes.tsx
│   │   ├── abrigos.tsx
│   │   ├── sobre.tsx
│   │   └── painel.tsx
│   │
│   ├── components
│   │
│   ├── services
│   │   └── api.ts
│   │
│   ├── constants
│   │
│   ├── hooks
│   │
│   └── types
│
├── package.json
├── app.json
└── README.md
```

---

# Considerações Finais

O OrbitGuard Mobile foi desenvolvido para fornecer acesso rápido e intuitivo a informações ambientais relevantes para a população.

A solução combina uma interface moderna, navegação fluida, integração com API REST e identidade visual própria para auxiliar cidadãos na consulta de alertas, regiões monitoradas, abrigos disponíveis e orientações de segurança.
