import React, { useState, useCallback, useEffect } from 'react';
import {
  FaLayerGroup as StackIcon,
  FaPlus as AddIcon,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useLocalStorage } from '~/hooks';
import { IPagination, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { qsConverter } from '~/utils/queryStringConverter';

import { VehiclesDataTable } from './DataTable';
import { VehiclesImportModal } from './ImportModal';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';
  const storage = useLocalStorage();

  const [vehicles, setVehicles] = useState<IPagination<IVehicle>>({ page: { total: 1, current: 1, limit: 10 }, data: [] });
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [inLoading, setInLoading] = useState(false);
  const [importModalOpen, setImportMOdalOpen] = useState(false);

  const getData = useCallback(async () => {
    setInLoading(true);
    setVehicles({ page: { total: 1, current: 1, limit: 10 }, data: [] });

    try {
      const response = await api.get<IPagination<IVehicle>>(`/vehicles${qsConverter(filters)}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      setVehicles(response.data);
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }

    setInLoading(false);
  }, [filters, storage]);

  const onImportModalClose = useCallback(() => {
    setImportMOdalOpen(false);
    getData();
  }, [getData]);

  // eslint-disable-next-line
  useEffect(() => { getData(); }, []);

  // eslint-disable-next-line
  useEffect(() => { getData(); }, [filters]);

  return (
    <>
      <Layout>
        <Card style={{ marginBottom: 15, display: 'flex', gap: '10px' }}>
          <Button variant="success" onClick={() => setImportMOdalOpen(true)}>
            <AddIcon />&nbsp;&nbsp;&nbsp;ADICIONAR VEICULO
          </Button>
          <Button variant="info" onClick={() => setImportMOdalOpen(true)}>
            <StackIcon />&nbsp;&nbsp;&nbsp;ENVIAR LOTE DE VEICULOS
          </Button>
        </Card>

        <VehiclesDataTable inLoading={inLoading} vehicles={vehicles.data} />

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={vehicles.page.current}
            totalPages={vehicles.page.total}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            onMaxResultsChange={() => console.log('onMaxResultsChange')}
          />
        </Card>
      </Layout>
      <VehiclesImportModal isOpen={importModalOpen} onClose={onImportModalClose} />
    </>
  );
};
