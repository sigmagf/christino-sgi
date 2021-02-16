import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Layout } from '~/components/Layout';
import { WorksDataTable } from '~/components/WorksDataTable';
import { WorksDetailsModal } from '~/components/WorksDetailsModal';
import { WorksFiltersCard } from '~/components/WorksFiltersCard';
import { useSWR } from '~/hooks/useSWR';
import { Card } from '~/interface/Card';
import { Pagination } from '~/interface/Pagination';
import { IPagination, IWork, IWorksFilters } from '~/interfaces';
import { qsConverter } from '~/utils/queryStringConverter';

export const WorksPage: React.FC = () => {
  document.title = 'Ordem de Serviço | Christino';

  const [workPermission, setWorkPermission] = useState(-1);
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
      if(getWorkError.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(getWorkError.response && getWorkError.response.data && getWorkError.response.data.message) {
        toast.error(getWorkError.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }
  }, [getWorkError]);

  if(workPermission === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Layout setPermissions={(perms) => setWorkPermission(perms.workPermission)}>
        <WorksFiltersCard
          onCreateClick={onCreateVehicleClick}
          onFiltersApplyClick={(data) => setFilters({ ...filters, ...data, page: 1 })}
          workPermission={workPermission}
        />

        <WorksDataTable
          inLoading={inLoading}
          works={works?.data || []}
          onDetailsClick={onDetailsWorkClick}
        />
        <Card style={{ marginTop: 15 }}>
          <Pagination
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
        workPermission={workPermission}
        work={works?.data.filter((el) => el.id === workIdToDetails)[0]}
      />
    </>
  );
};
