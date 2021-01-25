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
  const [vehicleToDetails, setVehicleToDetails] = useState<IVehicle>();
  const [filters, setFilters] = useState<IVehiclesFilters>({ page: 1, limit: 10, status: [1, 2, 3] });
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

      if(response.data.page.total < filters.page) {
        setFilters((old) => ({ ...old, page: response.data.page.total }));
      }

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

  const onDetailsClick = useCallback((vehicleId: string) => {
    setVehicleToDetails(vehicles.data.filter((el) => el.id === vehicleId)[0]);
    setDetailsModalOpen(true);
  }, [vehicles.data]);

  const onModalsClose = useCallback(() => {
    setImportModalOpen(false);
    setDetailsModalOpen(false);
    setVehicleToDetails(undefined);
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
          onFiltersApplyClick={(data) => setFilters((old) => ({ ...old, ...data, page: 1 }))}
        />
        <VehiclesDataTable inLoading={inLoading} vehicles={vehicles.data} onDetailsClick={onDetailsClick} />

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={vehicles.page.current}
            totalPages={vehicles.page.total}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            onMaxResultsChange={() => console.log('onMaxResultsChange')}
            overrideMaxResultsBy={<></>}
          />
        </Card>
      </Layout>
      <VehiclesImportModal isOpen={importModalOpen} onClose={onModalsClose} />
      <VehiclesDetailsModal isOpen={detailsModalOpen} onClose={onModalsClose} vehicle={vehicleToDetails} />
    </>
  );
};
