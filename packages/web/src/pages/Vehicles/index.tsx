import React, { useState, useCallback, useEffect } from 'react';
import { FaPrint } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
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
import { VehiclesPrintScreen } from './printScreen';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';
  const storage = useLocalStorage();

  const [desp_permission, setDesp_permission] = useState(0);

  const [vehicles, setVehicles] = useState<IPagination<IVehicle>>({ page: { total: 1, current: 1, limit: 10 }, data: [] });
  const [vehicleToDetails, setVehicleToDetails] = useState<IVehicle>();
  const [filters, setFilters] = useState<IVehiclesFilters>({ page: 1, limit: 10, status: [1, 2, 3] });
  const [inLoading, setInLoading] = useState(false);

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const getVehicles = useCallback(async () => {
    setInLoading(true);

    try {
      const response = await api.get<IPagination<IVehicle>>(`/vehicles${qsConverter(filters)}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
      });

      if(response.data.page.total < filters.page) {
        setFilters((old) => ({ ...old, page: response.data.page.total }));
      }

      setVehicles(response.data);
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }

      setVehicles({ page: { total: 1, current: 1, limit: 10 }, data: [] });
    }

    setInLoading(false);
  }, [filters, storage]);

  const onDetailsClick = (vehicleId: string) => {
    setVehicleToDetails(vehicles.data.filter((el) => el.id === vehicleId)[0]);
    setDetailsModalOpen(true);
  };

  const onModalsClose = () => {
    setImportModalOpen(false);
    setDetailsModalOpen(false);
    setVehicleToDetails(undefined);
    getVehicles();
  };

  const onPrintClick = async () => {
    try {
      const response = await api.get<IVehicle[]>(`/vehicles?noPagination=true&${qsConverter(filters)}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
      });

      // eslint-disable-next-line
      const win = window.open('', 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=${screen.width},height=${screen.height}`);

      if(win) {
        win.document.body.innerHTML = VehiclesPrintScreen(response.data);
        win.print();
        win.close();
      }
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }
  };

  useEffect(() => { getVehicles(); }, [filters]); // eslint-disable-line

  return (
    <>
      <Layout setPermissions={(perms) => setDesp_permission(perms.desp_permission)}>
        <VehiclesFiltersCard
          onOpenImportModalClick={() => setImportModalOpen(true)}
          onOpenCreateModalClick={() => setDetailsModalOpen(true)}
          onFiltersApplyClick={(data) => setFilters((old) => ({ ...old, ...data, page: 1 }))}
          desp_permission={desp_permission}
        />
        <VehiclesDataTable inLoading={inLoading} vehicles={vehicles.data} onDetailsClick={onDetailsClick} />

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={vehicles.page.current}
            totalPages={vehicles.page.total}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            onMaxResultsChange={() => console.log('onMaxResultsChange')}
            overrideMaxResultsBy={<Button variant="info" onClick={onPrintClick}><FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR</Button>}
          />
        </Card>
      </Layout>

      <VehiclesImportModal isOpen={importModalOpen} onClose={onModalsClose} />
      <VehiclesDetailsModal
        isOpen={detailsModalOpen}
        onClose={onModalsClose}
        vehicle={vehicleToDetails}
        desp_permission={desp_permission}
      />
    </>
  );
};
