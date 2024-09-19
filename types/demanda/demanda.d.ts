import type { IComentarioDemanda } from "./comentario-demanda";

export interface IDemanda {
  id: string;
  titulo: string;
  data: string;
  urgencia: string;
  projeto_id: string;
  descricao?: string;
  jira_id?: string;
  comentarios?: IComentarioDemanda[];
}
