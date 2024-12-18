export interface Noticias {
}

export interface Solucao {
  id: number;
  titulo: string;
  descricao: string;
  equipeID: number | null; // Altere para permitir null
  pitchLink: string;
  inova: boolean;
  status: boolean;
  aprovado:boolean
}

export interface Prolema {
  id: number;
  titulo: string;
  descricao: string;
  proponenteID: number | null; // Altere para permitir null
  categoria: string;
  publicAlvo: string;
  area: string;
  inova: boolean;
  status: boolean;
  aprovado:boolean
}


export interface Edital {
}

export interface Ranking {
}

export type Empresa = {
  id: number
  nome:string,
  cnpj:string,
  telefone:string,
  email:string,
};

export type User = {
  id: number,
  login: string,
  nome: string,
  email: string,
  verified: boolean,
  tipo: string,
  senha:string,
  descricao: string
  documentacao: string[]
  empresaVinculo:string
};


export type Logado = {
  isLogado: boolean
  id: number|null,
};

export interface Equipe {
  id:number,
  nome:string
}