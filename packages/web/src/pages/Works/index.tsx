import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Layout } from '~/components/Layout';
import { WorksDataTable } from '~/components/WorksDataTable';
import { WorksDetailsModal } from '~/components/WorksDetailsModal';
import { WorksFiltersCard } from '~/components/WorksFiltersCard';
import { usePersistedState } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { Card } from '~/interface/Card';
import { Paginator } from '~/interface/Paginator';
import { IPagination, IWork } from '~/interfaces';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { qsConverter } from '~/utils/qsConverter';

export const WorksPage: React.FC = () => {
  document.title = 'Ordem de Serviço | Christino';

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const [workPermission, setWorkPermission] = useState(-1);
  const [cliePermission, setCliePermission] = useState(-1);
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const { value: filters, setValue: setFilters } = usePersistedState('worksFilters', { page: 1, limit: 10 });
  const { data: works, revalidate, isValidating: inLoading, error: getWorkError } = useSWR<IPagination<IWork>>(`/works${qsConverter(filters)}`);
  const [workIdToDetails, setWorkIdToDetails] = useState<string>();
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [detailsModal, setDetailsModal] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE DETAILS MODAL - */
  const onDetailsModalClose = () => { setDetailsModal(false); revalidate(); };
  const onCreateClick = () => { setDetailsModal(true); setWorkIdToDetails(undefined); };
  const onDetailsClick = (id: string) => { setDetailsModal(true); setWorkIdToDetails(id); };
  /* END HANDLE DETAILS MODAL */

  useEffect(() => {
    if(getWorkError) {
      handleHTTPRequestError(getWorkError);
    }
  }, [getWorkError]);

  if(workPermission === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Layout setPermissions={(perms) => { setWorkPermission(perms.workPermission); setCliePermission(perms.cliePermission); }}>
        <WorksFiltersCard
          filters={filters}
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
