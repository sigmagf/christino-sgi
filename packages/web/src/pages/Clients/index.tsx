import React, { useState, useCallback, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ClientsDataTable } from '~/components/ClientsDataTable';
import { Layout } from '~/components/Layout';
import { useLocalStorage } from '~/hooks';
import { Button } from '~/interface/Button';
import { Card } from '~/interface/Card';
import { Paginator } from '~/interface/Paginator';
import { IClient, IClientsFilters, IPagination } from '~/interfaces';
import { api } from '~/utils/api';
import { qsConverter } from '~/utils/qsConverter';

import { ClientsPrintScreen } from './printScreen';

export const ClientsPage: React.FC = () => {
  document.title = 'Veiculos | Christino';
  const storage = useLocalStorage();

  const [cliePermission, setCliePermission] = useState(-1);

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
      } else if(err.response && err.response.data && err.response.data.message) {
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
        win.document.body.innerHTML = ClientsPrintScreen(response.data);
        win.print();
        win.close();
      }
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }
  };

  useEffect(() => { getData(); }, []); // eslint-disable-line
  useEffect(() => { getData(); }, [filters]); // eslint-disable-line

  if(cliePermission === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout setPermissions={(perms) => setCliePermission(perms.cliePermission)}>
      <ClientsDataTable inLoading={inLoading} data={clients.data} onDetailsClick={onDetailsClick} />

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
