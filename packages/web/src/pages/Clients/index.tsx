import React, { useState, useCallback, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useLocalStorage } from '~/hooks';
import { IClient, IClientsFilters, IPagination } from '~/interfaces';
import { api } from '~/utils/api';
import { qsConverter } from '~/utils/queryStringConverter';

import { ClientsDataTable } from './DataTable';

export const ClientsPage: React.FC = () => {
  document.title = 'Veiculos | Christino';
  const storage = useLocalStorage();

  const [clients, setClients] = useState<IPagination<IClient>>({ page: { total: 1, current: 1, limit: 10 }, data: [] });
  const [filters, setFilters] = useState<IClientsFilters>({ page: 1, limit: 10 });
  const [inLoading, setInLoading] = useState(false);

  const getData = useCallback(async () => {
    setInLoading(true);

    try {
      const response = await api.get<IPagination<IClient>>(`/clients${qsConverter(filters)}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
      });

      if(response.data.page.total < filters.page) {
        setFilters((old) => ({ ...old, page: response.data.page.total }));
      }

      setClients(response.data);
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }

      setClients({ page: { total: 1, current: 1, limit: 10 }, data: [] });
    }

    setInLoading(false);
  }, [filters, storage]);

  const onDetailsClick = (clientId: string) => {
    console.log(clients.data.filter((el) => el.id === clientId)[0]);
  };

  const onPrintClick = async () => {
    try {
      const response = await api.get<IClient[]>(`/clients?noPagination=true&${qsConverter(filters)}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
      });

      // eslint-disable-next-line
      const win = window.open('', 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${screen.width},height=${screen.height}`);

      if(win) {
        win.document.body.innerHTML = `
          <style>
            @page { size: portrait; -webkit-print-color-adjust: exact; }
            * { font-family: 'Roboto Mono', monospace; font-size: 10px; }
            html, body { margin: 0; padding: 0; }
            table { width: 100%; border-radius: 5px; overflow: hidden; border-collapse: collapse; }
            td, th { padding: 8px; }
            thead > tr > th{ font-weight: 800; }
            tbody > tr:nth-child(even) { background: white; }
            tbody > tr:nth-child(odd) { background: lightgray; }
          </style>

          <table>
            <thead>
              <tr>
                <th style="text-align: left">Nome</th>
                <th>DOCUMENTO</th>
                <th>GRUPO</th>
                <th>EMAIL</th>
                <th>TELEFONES</th>
              </tr>
            </thead>
            <tbody>
            ${response.data.map((v) => `
              <tr>
                <td>${v.name}</td>
                <td style="text-align: center">${v.document}</td>
                <td style="text-align: center">${v.group || ''}</td>
                <td style="text-align: center">${v.email || ''}</td>
                <td style="text-align: center">${v.phone2 && v.phone1 ? `${v.phone1}\n${v.phone2}` : `${v.phone1 || ''}${v.phone2 || ''}`}</td>
              </tr>
            `).join('')}
            </tbody>
          </table>
        `;

        win.print();
        win.close();
      }
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }
  };

  useEffect(() => { getData(); }, []); // eslint-disable-line
  useEffect(() => { getData(); }, [filters]); // eslint-disable-line

  return (
    <Layout>
      <ClientsDataTable inLoading={inLoading} data={clients.data} onDetailsClick={onDetailsClick} />

      <Card style={{ margin: '15px 0' }}>
        <Pagination
          currentPage={clients.page.current}
          totalPages={clients.page.total}
          inLoading={inLoading}
          onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
          onMaxResultsChange={() => console.log('onMaxResultsChange')}
          overrideMaxResultsBy={<Button variant="info" onClick={onPrintClick}><FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR</Button>}
        />
      </Card>
    </Layout>
  );
};
