import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { useSWR } from '~/hooks/useSWR';
import { IPagination, IWork } from '~/interfaces';

import { WorksDataTable } from './DataTable';
import { WorksDetailsModal } from './DetailsModal';

export const WorksPage: React.FC = () => {
  document.title = 'Ordem de Serviço | Christino';

  const [workPermission, setWorkPermission] = useState(-1);

  const [workIdToDetails, setWorkIdToDetails] = useState<string>();
  const { data: works, revalidate, isValidating: inLoading } = useSWR<IPagination<IWork>>('/works');

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

  if(workPermission === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Layout setPermissions={(perms) => setWorkPermission(perms.work_permission)}>
        <Card style={{ marginBottom: 15 }}>
          <Button onClick={onCreateVehicleClick}>
            ADICIONAR O.S.
          </Button>
        </Card>
        <WorksDataTable
          inLoading={inLoading}
          works={works?.data || []}
          onDetailsClick={onDetailsWorkClick}
        />
      </Layout>
      <WorksDetailsModal
        isOpen={detailsModalOpen}
        onClose={onModalsClose}
        workPermission={workPermission}
        onChangeSuccess={() => console.log('onChangeSuccess()')}
        work={works && works.data.filter((el) => el.id === workIdToDetails)[0]}
      />
    </>
  );
};
