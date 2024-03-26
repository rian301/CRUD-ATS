export interface Job {
    id: string;
    nome: string;
    empresa: string;
    descricao: string;
    requisitos: string;
    requisitosArray?: string[];
}
