import React, { useState, useCallback, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

import { ClientsDataTable } from '~/components/ClientsDataTable';
import { Layout } from '~/components/Layout';
import { useLocalStorage } from '~/hooks';
import { Button } from '~/interface/Button';
import { Card } from '~/interface/Card';
import { Paginator } from '~/interface/Paginator';
import { IClient, IClientsFilters, IPagination } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { qsConverter } from '~/utils/qsConverter';

import { ClientsPrintScreen } from './printScreen';

export const ClientsPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  const storage = useLocalStorage();
  const permissions = storage.getItem('permissions');

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
      handleHTTPRequestError(err);

      setClients({ page: { total: 1, current: 1, limit: 10 }, data: [] });
    }

    setInLoading(false);
  }, [filters, storage]);

  const onPrintClick = async () => {
    try {
      const response = await api.get<IClient[]>(`/clients?noPagination=true&${qsConverter(filters)}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
      });

      // eslint-disable-next-line
      const win = window.open('', 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${screen.width},height=${screen.height}`);

      if(win) {
        win.document.body.innerHTML = ClientsPrintScreen(response.data);
        win.print();
        win.close();
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }
  };

  useEffect(() => { getData(); }, []); // eslint-disable-line
  useEffect(() => { getData(); }, [filters]); // eslint-disable-line

  if(!permissions || permissions.cliePermission === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <ClientsDataTable inLoading={inLoading} data={clients.data} onDetailsClick={() => console.log('bla')} />

      <Card style={{ margin: '15px 0' }}>
        <Paginator
          currentPage={clients.page.current}
          totalPages={clients.page.total}
          inLoading={inLoading}
          onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
          leftContent={<Button variant="info" onClick={onPrintClick}><FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR</Button>}
        />
      </Card>
    </Layout>
  );
};
