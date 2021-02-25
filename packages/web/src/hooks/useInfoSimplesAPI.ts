import axios, { AxiosResponse } from 'axios';

import { ISServices } from '~/interfaces';

export function useISAPI() {
  const token = process.env.REACT_APP_INFOSIMPLES_TOKEN;
  const api = axios.create({
    baseURL: 'https://api.infosimples.com/api/v1',
  });

  const debitoVeiculoSP = async <T extends ISServices['debitoVeiculoSP']>({ plate, renavam }: T['params']): Promise<AxiosResponse<T['response']>> => {
    return api.get<ISServices['debitoVeiculoSP']['response']>(`/sefaz/sp/debitos-veiculo.json?token=${token}&placa=${plate}&renavam=${renavam}`);
  };

  const consultaCNPJ = async <T extends ISServices['consultaCNPJ']>({ cnpj }: T['params']): Promise<AxiosResponse<T['response']>> => {
    return api.get<ISServices['consultaCNPJ']['response']>(`/receita-federal/cnpj.json?token=${token}&cnpj=${cnpj}&origem=web`);
  };

  return { debitoVeiculoSP, consultaCNPJ };
}
