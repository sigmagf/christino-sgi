import React, { useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useSWR } from '~/hooks/useSWR';
import { IPagination, IWork } from '~/interfaces';

import { WorksDataTable } from './DataTable';
import { WorkDetailsModal } from './DetailsModal';

export const WorksPage: React.FC = () => {
  document.title = 'Ordens de Serviço | Christino';
  const [workPermission, setWorkPermission] = useState(-1);

  const { data: works, isValidating: inLoading, revalidate: getWorks } = useSWR<IPagination<IWork>>('/works');
  const [workToDetails, setWorkToDetails] = useState<IWork>();

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const onDetailsClick = (workId: string) => {
    if(works) {
      setWorkToDetails(works.data.filter((el) => el.id === workId)[0]);
      setDetailsModalOpen(true);
    }
  };

  if(workPermission === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Layout setPermissions={(perms) => setWorkPermission(perms.work_permission)}>
        <WorksDataTable inLoading={inLoading} data={works?.data || []} onDetailsClick={onDetailsClick} />

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={works?.page.current || 1}
            totalPages={works?.page.total || 1}
            inLoading={inLoading}
            onNumberClick={(page) => console.log(`onNumberClick(${page})`)}
            leftContent={<Button variant="info" onClick={() => console.log('onPrin()')}><FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR</Button>}
          />
        </Card>
      </Layout>
      <WorkDetailsModal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} work={workToDetails} workPermission={workPermission} />
    </>
  );
};
