import React, { useState, useCallback, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useLocalStorage } from '~/hooks';
import { IPagination, IVehicle, IVehiclesFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { qsConverter } from '~/utils/queryStringConverter';

import { VehiclesDataTable } from './DataTable';
import { VehiclesDetailsModal } from './DetailsModal';
import { VehiclesFiltersCard } from './FiltersCard';
import { VehiclesImportModal } from './ImportModal';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';
  const storage = useLocalStorage();

  const [vehicles, setVehicles] = useState<IPagination<IVehicle>>({ page: { total: 1, current: 1, limit: 10 }, data: [] });
  const [filters, setFilters] = useState<IVehiclesFilters>({ page: 1, limit: 10 });
  const [inLoading, setInLoading] = useState(false);

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const getData = useCallback(async () => {
    setInLoading(true);

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

      setVehicles({ page: { total: 1, current: 1, limit: 10 }, data: [] });
    }

    setInLoading(false);
  }, [filters, storage]);

  const onImportModalClose = useCallback(() => {
    setImportModalOpen(false);
    getData();
  }, [getData]);

  const onDetailsModalClose = useCallback(() => {
    setDetailsModalOpen(false);
    getData();
  }, [getData]);

  // eslint-disable-next-line
  useEffect(() => { getData(); }, []);

  // eslint-disable-next-line
  useEffect(() => { getData(); }, [filters]);

  return (
    <>
      <Layout>
        <VehiclesFiltersCard
          onOpenImportModalClick={() => setImportModalOpen(true)}
          onOpenCreateModalClick={() => setDetailsModalOpen(true)}
          onFiltersApplyClick={(data) => setFilters((old) => ({ ...old, ...data }))}
        />
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
      <VehiclesDetailsModal isOpen={detailsModalOpen} onClose={onDetailsModalClose} />
    </>
  );
};
