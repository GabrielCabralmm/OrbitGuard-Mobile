export interface Regiao {
  idRegiao?: number;
  nome: string;
  cidade: string;
  uf: string;
  latitude: number;
  longitude: number;
  tipoRiscoBase: string;
  populacaoEstimada: number;
}