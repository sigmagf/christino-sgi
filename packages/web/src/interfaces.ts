/* - STORAGE - */
export interface IUseLocalStorage {
  getItem: <T extends keyof IStorage>(path: T) => IStorage[T] | null;
  setItem: <T extends keyof IStorage>(path: T, value: IStorage[T] | null) => void;
  clear: () => void;
}

export interface IStorage {
  token: string;
  userName: string;
  vehiclesFilters: IVehiclesFilters;
  worksFilters: IWorksFilters;
  appBarExpanded: boolean;
}
/* END STIRAGE */

/* - INFOSIMPLES API - */
export interface IISBaseResponse {
  'code': number;
  'code_message': string;
  'header': {
    'api_version': string;
    'service': string;
    'parameters': any;
    'client': string;
    'client_name': string;
    'token': string;
    'token_name': string;
    'billable': boolean;
    'credits': number;
    'has_limit': boolean;
    'limit': number;
    'used': number;
    'cache_hit': boolean;
    'cached_at': Date|null;
    'requested_at': Date;
    'elapsed_time_in_milliseconds': number;
  };
  'data_count': number;
  'errors': any;
  'receipt': {
    'url': string;
    'id': string;
    'key': string;
    'sites_urls': string[];
  };
}

export interface ISServices {
  debitoVeiculoSP: {
    params: { plate: string; renavam: string };
    response: IISBaseResponse & { data: IISDebitoVeiculoSPResponse };
  };
  consultaCNPJ: {
    params: { cnpj: string };
    response: IISBaseResponse & { data: IISConsultaCNPJResponse };
  };
}

export interface IISConsultaCNPJResponse {
  'abertura_data': string;
  'atividade_economica': string;
  'atividade_economica_secundaria': string;
  'atividade_economica_secundaria_lista': string[];
  'capital_social': string;
  'cnpj': string;
  'consulta_datahora': string;
  'efr': string;
  'email': string;
  'endereco_bairro': string;
  'endereco_cep': string;
  'endereco_complemento': string;
  'endereco_logradouro': string;
  'endereco_municipio': string;
  'endereco_numero': string;
  'endereco_uf': string;
  'licenciamento_dispensado': any[];
  'matriz_filial': string;
  'natureza_juridica': string;
  'nome_fantasia': string;
  'normalizado_abertura_data': string;
  'normalizado_capital_social': number;
  'normalizado_cnpj': string;
  'normalizado_consulta_datahora': string;
  'normalizado_endereco_cep': string;
  'normalizado_situacao_cadastral_data': string;
  'normalizado_situacao_especial_data': string;
  'origem': string;
  'porte': string;
  'qsa': any[];
  'razao_social': string;
  'situacao_cadastral': string;
  'situacao_cadastral_data': string;
  'situacao_cadastral_observacoes': string;
  'situacao_especial': string;
  'situacao_especial_data': string;
  'telefone': string;
}

export interface IISDebitoVeiculoSPResponse {
  'ano_fabricacao': string;
  'carroceria': string;
  'categoria': string;
  'combustivel': string;
  'dpvats': any[];
  'especie': string;
  'faixa_ipva': string;
  'ipva': {
    'competencia': string;
    'base_calculo': string;
    'aliquota': string;
    'apurado': string;
    'credito_nfp': string;
    'devido': string;
    'pagamento_efetuado': string;
    'descontos': string;
    'saldo_devido': string;
    'acrescimos': string;
    'valor': string;
    'normalizado_base_calculo': number;
    'normalizado_aliquota': number;
    'normalizado_apurado': number;
    'normalizado_credito_nfp': number;
    'normalizado_devido': number;
    'normalizado_pagamento_efetuado': number;
    'normalizado_descontos': number;
    'normalizado_saldo_devido': number;
    'normalizado_acrescimos': number;
    'normalizado_valor': number;
    'pagamento_debitos': any[];
    'boleto': string;
  };
  'ipva_divida_ativa': boolean;
  'ipva_nao_inscritos': any[];
  'licenciamentos': any[];
  'marca': string;
  'multas': {
    'valor': string;
    'normalizado_valor': number;
    'lista': any[];
  };
  'municipio': string;
  'passageiros': string;
  'placa': string;
  'renavam': string;
  'tipo': string;
  'ultimo_lancamento': string;
}
/* END INFOSIMPLES API */

/* - BACKEND - */
export interface IVehiclesFilters extends Partial<Pick<IVehicle, 'clientId'|'plate'|'renavam'|'crv'|'brandModel'>> {
  page: number;
  limit: number;

  group?: string;
  plateEnd?: string;
  status: number|number[];
  includeTruck?: boolean;
}

export interface IClientsFilters extends Partial<Pick<IClient, 'name'|'document'|'group'>> {
  page: number;
  limit: number;
}

export interface IWorksFilters extends Partial<Pick<IWork, 'clientId'|'serviceId'|'identifier'>> {
  page: number;
  limit: number;

  value?: string;
  status?: string | string[];
  group?: string;
  sectorId?: string;
}

export interface IPagination<T> {
  page: {
    total: number;
    current: number;
    limit: number;
  };
  data: Array<T>;
}

export interface ISector {
  id: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IService {
  id: string;
  sectorId: string;
  sector: ISector;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWorkHistory {
  id: string;
  workId: string;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IWork {
  id: string;
  clientId: string;
  client: IClient;
  serviceId: string;
  service: IService;
  identifier?: string;
  value: number;
  details?: string;
  status: number;
  histories: IWorkHistory[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IClient {
  id: string;
  name: string;
  document: string;
  group: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  despPermission: number;
  seguPermission: number;
  cliePermission: number;
  userPermission: number;
  workPermission: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IVehicle {
  id: string;
  clientId: string;
  client: IClient;
  plate: string;
  renavam: string;
  crv: string;
  brandModel: string;
  type: string;
  details: string;
  status: number;
  crlveIncluded: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserAuth {
  user: IUser;
  token: string;
}

export type IUserPermissions = Omit<IUser, 'id'|'name'|'email'|'password'|'createdAt'|'updatedAt'>;
/* END BACKEND */
