import React, { useState, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Layout } from '~/components/Layout';
import { WorksDataTable } from '~/components/WorksDataTable';
import { WorksDetailsModal } from '~/components/WorksDetailsModal';
import { WorksFiltersCard } from '~/components/WorksFiltersCard';
import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Card } from '~/interface/Card';
import { Paginator } from '~/interface/Paginator';
import { IPagination, IWork } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { qsConverter } from '~/utils/qsConverter';

import { worksPrintScreen } from './printScreen';

export const WorksPage: React.FC = () => {
  document.title = 'Ordem de Serviço | Christino';

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const [workPermission, setWorkPermission] = useState(-1);
  const [cliePermission, setCliePermission] = useState(-1);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const { data: works, revalidate, isValidating: inLoading, error: getWorkError } = useSWR<IPagination<IWork>>(`/works${qsConverter(filters)}`);
  const [workIdToDetails, setWorkIdToDetails] = useState<string>();
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [detailsModal, setDetailsModal] = useState(false);
  const [inLoadingPrint, setInLoadingPrint] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE DETAILS MODAL - */
  const onDetailsModalClose = () => { setDetailsModal(false); revalidate(); };
  const onCreateClick = () => { setDetailsModal(true); setWorkIdToDetails(undefined); };
  const onDetailsClick = (id: string) => { setDetailsModal(true); setWorkIdToDetails(id); };
  /* END HANDLE DETAILS MODAL */

  /* - HANDLE PRINT CLICK - */
  const onPrintClick = async () => {
    setInLoadingPrint(true);

    try {
      const response = await api.get<IWork[]>(`/works?noPagination=true&${qsConverter(filters)}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      // eslint-disable-next-line
      const win = window.open('', 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=${screen.width},height=${screen.height}`);

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
    return <Navigate to="/" replace />;
  }

  const printButton = (
    <Button variant="info" disabled={inLoadingPrint} style={{ cursor: inLoadingPrint ? 'progress' : 'pointer' }} onClick={onPrintClick}>
      <FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR
    </Button>
  );

  return (
    <>
      <Layout setPermissions={(perms) => { setWorkPermission(perms.workPermission); setCliePermission(perms.cliePermission); }}>
        <WorksFiltersCard
          onCreateClick={onCreateClick}
          workPermission={workPermission}
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

      <WorksDetailsModal
        isOpen={detailsModal}
        onClose={onDetailsModalClose}
        work={works?.data.find((el) => el.id === workIdToDetails)}
        workPermission={workPermission}
        cliePermission={cliePermission}
      />
    </>
  );
};
