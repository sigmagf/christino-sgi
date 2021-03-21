import { IPagination, IWork } from '@christino-sgi/common';
import React, { useState, useEffect, useContext } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Layout } from '~/components/Layout';
import { Button } from '~/components/UI/Button';
import { Card } from '~/components/UI/Card';
import { Paginator } from '~/components/UI/Paginator';
import { WorksDataTable } from '~/components/Works/DataTable';
import { WorksDetailsModal } from '~/components/Works/DetailsModal';
import { WorksFiltersCard } from '~/components/Works/FiltersCard';
import { UserPermissionsContext } from '~/contexts/UserPermissions';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks';
import { IWorksRequestFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { qsConverter } from '~/utils/qsConverter';

import { worksPrintScreen } from './printScreen';

export const WorksPage: React.FC = () => {
  document.title = 'Ordem de Serviço | Christino';

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const { workPermission } = useContext(UserPermissionsContext);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const [filters, setFilters] = useState<IWorksRequestFilters>({ page: 1, limit: 10, status: ['1', '2', '3'] });
  const { data: works, revalidate, isValidating: inLoading, error: getWorkError } = useSWR<IPagination<IWork>>(`/works${qsConverter(filters)}`);
  const [workIdToDetails, setWorkIdToDetails] = useState<string>();
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoadingPrint, setInLoadingPrint] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE DETAILS MODAL - */
  const onDetailsModalClose = () => { setDetailsModal(false); revalidate(); };
  const onCreateClick = () => { setWorkIdToDetails(undefined); setDetailsModal(true); };
  const onDetailsClick = (id: string) => { setWorkIdToDetails(id); setDetailsModal(true); };
  /* END HANDLE DETAILS MODAL */

  /* - HANDLE PRINT CLICK - */
  const onPrintClick = async () => {
    setInLoadingPrint(true);

    try {
      const response = await api.get<IWork[]>(`/works?noPagination=true&${qsConverter(filters)}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      // eslint-disable-next-line
      const win = window.open('', 'popup', `width=${screen.width},height=${screen.height}`);

      if(win) {
        win.document.body.innerHTML = worksPrintScreen(response.data);
        win.print();
        win.close();
      } else {
        toast.error('Ative o popup em seu navegador.');
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }

    setInLoadingPrint(false);
  };
  /* END HANDLE PRINT CLICK */

  useEffect(() => {
    if(getWorkError) {
      handleHTTPRequestError(getWorkError);
    }
  }, [getWorkError]);

  if(workPermission === 0) {
    alert('Usuário não tem acesso ao módulo de ordem de serviço!');
    return <Navigate to="/" replace />;
  }

  const printButton = (
    <Button variant="info" disabled={inLoadingPrint} onClick={onPrintClick}>
      <FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR
    </Button>
  );

  return (
    <>
      <Layout>
        <WorksFiltersCard
          onCreateClick={onCreateClick}
          onFiltersApplyClick={(data) => setFilters({ ...filters, ...data, page: 1 })}
        />

        <WorksDataTable
          inLoading={inLoading}
          works={works?.data}
          onDetailsClick={onDetailsClick}
        />

        <Card style={{ marginTop: 15 }}>
          <Paginator
            totalPages={works?.page.total || 1}
            currentPage={works?.page.current || 1}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            leftContent={printButton}
          />
        </Card>
      </Layout>

      {detailsModal && (
        <WorksDetailsModal
          isOpen={detailsModal}
          onClose={onDetailsModalClose}
          work={works?.data.find((el) => el.id === workIdToDetails)}
        />
      )}
    </>
  );
};
