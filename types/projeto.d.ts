import type { IDemanda } from "./demanda/demanda";

export interface IProjeto {
  id: string;
  nome: string;
  demandas_a_fazer: number;
  demandas_em_andamento: number;
  demandas_concluidas: number;
  total_demandas: number;
  demandas?: IDemanda[];
}
