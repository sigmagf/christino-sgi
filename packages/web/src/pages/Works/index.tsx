import React, { useState, useEffect, useContext } from 'react';
import { Navigate } from 'react-router-dom';

import { Layout, UserPermissionsContext } from '~/components/Layout';
import { WorksDataTable } from '~/components/WorksDataTable';
import { WorksDetailsModal } from '~/components/WorksDetailsModal';
import { WorksFiltersCard } from '~/components/WorksFiltersCard';
import { useSWR } from '~/hooks/useSWR';
import { Card } from '~/interface/Card';
import { Paginator } from '~/interface/Paginator';
import { IPagination, IWork, IWorksFilters } from '~/interfaces';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { qsConverter } from '~/utils/qsConverter';

export const WorksPage: React.FC = () => {
  document.title = 'Ordem de Serviço | Christino';

  const { workPermission } = useContext(UserPermissionsContext);
  const [filters, setFilters] = useState<IWorksFilters>({ page: 1, limit: 10 });

  const [workIdToDetails, setWorkIdToDetails] = useState<string>();
  const { data: works, revalidate, isValidating: inLoading, error: getWorkError } = useSWR<IPagination<IWork>>(`/works${qsConverter(filters)}`);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const onCreateVehicleClick = () => {
    setWorkIdToDetails(undefined);
    setDetailsModalOpen(true);
  };

  const onDetailsWorkClick = (id: string) => {
    if(works) {
      setWorkIdToDetails(id);
      setDetailsModalOpen(true);
    }
  };

  const onModalsClose = () => {
    setDetailsModalOpen(false);
    setWorkIdToDetails(undefined);
    revalidate();
  };

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
      <Layout>
        <WorksFiltersCard
          onCreateClick={onCreateVehicleClick}
          onFiltersApplyClick={(data) => setFilters({ ...filters, ...data, page: 1 })}
        />

        <WorksDataTable
          inLoading={inLoading}
          works={works?.data || []}
          onDetailsClick={onDetailsWorkClick}
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
        isOpen={detailsModalOpen}
        onClose={onModalsClose}
        work={works?.data.filter((el) => el.id === workIdToDetails)[0]}
      />
    </>
  );
};
