export interface Noticias {
  id: string;
  rewardProgramName: string;
  rewardProgramKey: string;
  rewardProgramDescription: string;
  currency: string;
  hasRewardProgramMinimalValue: boolean;
  rewardProgramMinimalValueAmount: null | string;
  hasRewardProgramMaximumValue: boolean;
  rewardProgramMaximumValueAmount: null | string;
  hasRewardProgramInstructions: boolean;
  rewardProgramInstructions: string;
  residueQuotationMachineResourceList: { residueQuotation: residueQuotation }[];
}

export interface Solucao {
  id: number;
  code: string; // Also, ensure the code is a string since you're using strings in your data
  name: string;
  volumeMl: number;
  value: string;
  currency: string;
}

export interface Prolema {
  workhours: Workhours;
}

export interface Edital {
  id: string;
  appkey: string;
  addressTittle: string;
  addressLabel: string;
  addressMaps: string;
  addressWaze: string;
  latitude: number;
  longitude: number;
  shortLink: string;
  ativa: boolean;
  workingdays: WorkingDay[];
}

export interface Ranking {
  id: number;
  appkey: string;
  urlImage: string;
  title: string;
  description: string;
  cardColor: string;
  value: number;
}

export type Empresa = {
  url: number,
  titulo: string,
  descricao: string
};

export type User = {
  id: number,
  login: string,
  name: string,
  email: string,
  verified: boolean,
  tipo: string,
  senha:string,
  descricao: string
  documentacao: string[]
};


export type Logado = {
  isLogado: boolean
  id: number|null,
};

export interface Equipe {
  startHour: number;
  startMinute: number;
  endHour: number;
  endMinute: number;
  day: string;
}