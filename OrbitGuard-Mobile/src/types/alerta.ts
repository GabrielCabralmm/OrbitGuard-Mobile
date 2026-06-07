export interface Alerta {
  idAlerta?: number;
  idRegiao: number;
  idHistorico?: number | null;
  titulo: string;
  mensagem: string;
  nivelRisco: string;
  statusAlerta: string;
  dataAlerta?: string;
}