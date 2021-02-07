import React, { useState } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { VehiclesDataTable } from '~/components/VehiclesDataTable';
import { VehiclesDetailsModal } from '~/components/VehiclesDetailsModal';
import { VehiclesFiltersCard } from '~/components/VehiclesFiltersCard';
import { VehiclesImportModal } from '~/components/VehiclesImportModal';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { IPagination, IVehicle, IVehiclesFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { qsConverter } from '~/utils/queryStringConverter';

import { VehiclesPrintScreen } from './printScreen';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  const storage = useLocalStorage();
  const [despPermission, setDespPermission] = useState(-1);

  const [filters, setFilters] = useState<IVehiclesFilters>({ page: 1, limit: 10, status: [1, 2, 3] });
  const [vehicleIdToDetails, setVehicleIdToDetails] = useState<string>();
  const [inLoadingPrint, setInLoadingPrint] = useState(false);

  const [importModalOpen, setImportModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const { data: vehicles, revalidate, mutate, isValidating: inLoading } = useSWR<IPagination<IVehicle>>(`/vehicles${qsConverter(filters)}`);

  const onModalsClose = () => {
    setImportModalOpen(false);
    setDetailsModalOpen(false);
    revalidate();
  };

  const onCreateVehicleClick = () => {
    setVehicleIdToDetails(undefined);
    setDetailsModalOpen(true);
  };

  const onDetailsVehicleClick = (id: string) => {
    if(vehicles) {
      setVehicleIdToDetails(id);
      setDetailsModalOpen(true);
    }
  };

  const onVehicleChange = (vehicle: IVehicle) => {
    if(vehicles) {
      setVehicleIdToDetails(vehicle.id);
      mutate({
        ...vehicles,
        data: [...vehicles.data.filter((el) => el.id !== vehicle.id), vehicle],
      }, true);
    }
  };

  const onPrintClick = async () => {
    setInLoadingPrint(true);

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
      } else if(err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }

    setInLoadingPrint(false);
  };

  if(despPermission === 0) {
    return <Navigate to="/" replace />;
  }

  const printButton = (
    <Button
      variant="info"
      disabled={inLoadingPrint}
      style={{ cursor: inLoadingPrint ? 'progress' : 'pointer' }}
      onClick={onPrintClick}
    >
      <FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR
    </Button>
  );

  return (
    <>
      <Layout setPermissions={(perms) => setDespPermission(perms.desp_permission)}>
        <VehiclesFiltersCard
          onOpenImportModalClick={() => setImportModalOpen(true)}
          onCreateClick={onCreateVehicleClick}
          onFiltersApplyClick={(data) => setFilters((old) => ({ ...old, ...data, page: 1 }))}
          despPermission={despPermission}
        />
        <VehiclesDataTable inLoading={inLoading} vehicles={vehicles?.data || []} onDetailsClick={onDetailsVehicleClick} />

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={vehicles?.page.current || 1}
            totalPages={vehicles?.page.total || 1}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            leftContent={printButton}
          />
        </Card>
      </Layout>

      <VehiclesImportModal isOpen={importModalOpen} onClose={onModalsClose} />
      <VehiclesDetailsModal
        isOpen={detailsModalOpen}
        despPermission={despPermission}
        onClose={onModalsClose}
        vehicle={vehicles?.data.filter((el) => el.id === vehicleIdToDetails)[0]}
        onChangeSuccess={onVehicleChange}
      />
    </>
  );
};
