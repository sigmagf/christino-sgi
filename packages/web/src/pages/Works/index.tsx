import React, { useEffect, useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useLocalStorage } from '~/hooks';
import { IPagination, IWork } from '~/interfaces';
import { api } from '~/utils/api';

import { WorksDataTable } from './DataTable';
import { WorkDetailsModal } from './DetailsModal';

export const WorksPage: React.FC = () => {
  document.title = 'Ordens de Serviço | Christino';
  const storage = useLocalStorage();
  const [workPermission, setWorkPermission] = useState(-1);

  const [data, setData] = useState<IPagination<IWork>>({ page: { total: 1, current: 1, limit: 10 }, data: [] });
  const [workToDetails, setWorkToDetails] = useState<IWork>();

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const request = await api.get('/works', { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

        setData(request.data);
      } catch(err) {
        if(err.message === 'Network Error') {
          toast.error('Verifique sua conexão com a internet.');
        } else if(err.response && err.response.data && err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Ocorreu um erro inesperado.');
        }

        setData({ page: { total: 1, current: 1, limit: 10 }, data: [] });
      }
    };

    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onDetailsClick = (workId: string) => {
    setWorkToDetails(data.data.filter((el) => el.id === workId)[0]);
    setDetailsModalOpen(true);
  };

  if(workPermission === 0) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Layout setPermissions={(perms) => setWorkPermission(perms.work_permission)}>
        <WorksDataTable inLoading={false} data={data.data} onDetailsClick={onDetailsClick} />

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={data.page.current}
            totalPages={data.page.total}
            inLoading={false}
            onNumberClick={(page) => console.log(`onNumberClick(${page})`)}
            onMaxResultsChange={() => console.log('onMaxResultsChange()')}
            overrideMaxResultsBy={<Button variant="info" onClick={() => console.log('onPrin()')}><FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR</Button>}
          />
        </Card>
      </Layout>
      <WorkDetailsModal isOpen={detailsModalOpen} onClose={() => setDetailsModalOpen(false)} work={workToDetails} workPermission={workPermission} />
    </>
  );
};
