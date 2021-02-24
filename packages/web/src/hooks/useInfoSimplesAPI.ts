import { AxiosResponse } from 'axios';

import { IBaseResponse } from '~/interfaces';
import { infosimples } from '~/utils/infosimples.api';

interface ISefazSPDebitosVeiculoResponse {
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

interface ISServices {
  debitoVeiculoSP: {
    parameters: {
      plate: string;
      renavam: string;
    };
    responseType: IBaseResponse & {
      data: ISefazSPDebitosVeiculoResponse;
    };
  };
}

export function useISAPI() {
  const debitoVeiculoSP = async (param: ISServices['debitoVeiculoSP']['parameters']): Promise<AxiosResponse<ISServices['debitoVeiculoSP']['responseType']>> => {
    return infosimples.get<ISServices['debitoVeiculoSP']['responseType']>(`/sefaz/sp/debitos-veiculo.json?token=${process.env.REACT_APP_INFOSIMPLES_TOKEN}&timeout=600&placa=${param.plate}&renavam=${param.renavam}`);
  };

  return { debitoVeiculoSP };
}
