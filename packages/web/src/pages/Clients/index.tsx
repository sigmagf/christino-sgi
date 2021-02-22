import React, { useEffect, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { ClientsDataTable } from '~/components/ClientsDataTable';
import { ClientsDetailsModal } from '~/components/ClientsDetailsModal';
import { Layout } from '~/components/Layout';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
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

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const [cliePermission, setCliePermission] = useState(-1);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const [filters, setFilters] = useState<IClientsFilters>({ page: 1, limit: 10 });
  const { data: clients, isValidating: inLoading, error: getClientsError, mutate, revalidate } = useSWR<IPagination<IClient>>(`/clients${qsConverter(filters)}`);
  const [clientIdToDetails, setClientIdToDetails] = useState<string>();
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoadingPrint] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE DETAILS MODAL - */
  const onDetailsModalClose = () => { setDetailsModal(false); revalidate(); };
  // const onCreateClick = () => { setDetailsModal(true); setClientIdToDetails(undefined); };
  const onDetailsClick = (id: string) => { setDetailsModal(true); setClientIdToDetails(id); };
  /* END HANDLE DETAILS MODAL */

  const onClientChange = (data: IClient) => {
    mutate((e) => e && ({ page: e.page, data: [...e.data.filter((el) => el.id !== data.id), data] }), true);
    setClientIdToDetails(data.id);
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
      } else {
        toast.error('Ative o popup em seu navegador.');
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }
  };

  useEffect(() => {
    if(getClientsError) {
      handleHTTPRequestError(getClientsError);
    }
  }, [getClientsError]);

  if(cliePermission === 0) {
    return <Navigate to="/" replace />;
  }

  const printButton = (
    <Button variant="info" disabled={inLoadingPrint} style={{ cursor: inLoadingPrint ? 'progress' : 'pointer' }} onClick={onPrintClick}>
      <FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR
    </Button>
  );

  return (
    <>
      <Layout setPermissions={(perms) => setCliePermission(perms.cliePermission)}>
        <ClientsDataTable inLoading={inLoading} clients={clients?.data} onDetailsClick={onDetailsClick} />

        <Card style={{ margin: '15px 0' }}>
          <Paginator
            currentPage={clients?.page.current || 1}
            totalPages={clients?.page.total || 1}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            leftContent={printButton}
          />
        </Card>
      </Layout>
      <ClientsDetailsModal
        isOpen={detailsModal}
        onClose={onDetailsModalClose}
        client={clients?.data.find((el) => el.id === clientIdToDetails)}
        onChange={onClientChange}
        cliePermission={cliePermission}
      />
    </>
  );
};
