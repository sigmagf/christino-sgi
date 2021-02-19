import React, { useEffect, useState, useContext } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

import { Layout, UserPermissionsContext } from '~/components/Layout';
import { VehiclesDataTable } from '~/components/VehiclesDataTable';
import { VehiclesDetailsModal } from '~/components/VehiclesDetailsModal';
import { VehiclesFiltersCard } from '~/components/VehiclesFiltersCard';
import { useLocalStorage } from '~/hooks';
import { useSWR } from '~/hooks/useSWR';
import { Button } from '~/interface/Button';
import { Card } from '~/interface/Card';
import { Paginator } from '~/interface/Paginator';
import { IPagination, IVehicle, IVehiclesFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { qsConverter } from '~/utils/qsConverter';

import { vehiclesPrintScreen } from './printScreen';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  const { despPermission } = useContext(UserPermissionsContext);
  const storage = useLocalStorage();

  const [filters, setFilters] = useState<IVehiclesFilters>({ page: 1, limit: 10, status: [1, 2, 3] });
  const [vehicleIdToDetails, setVehicleIdToDetails] = useState<string>();
  const [inLoadingPrint, setInLoadingPrint] = useState(false);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);

  const { data: vehicles, revalidate, mutate, isValidating: inLoading, error: getVehiclesError } = useSWR<IPagination<IVehicle>>(`/vehicles${qsConverter(filters)}`);

  const onModalsClose = () => {
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
      mutate({ page: vehicles.page, data: [...vehicles.data.filter((el) => el.id !== vehicle.id), vehicle] }, true);
      setVehicleIdToDetails(vehicle.id);
    }
  };

  const handleGetCRLVe = async (id: string) => {
    try {
      const response = await api.get(`/vehicles/${id}/crlve`, { headers: { authorization: `Bearer ${storage.getItem('token')}` }, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // eslint-disable-next-line no-restricted-globals
      window.open(url, 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=${screen.width},height=${screen.height}`);
    } catch(err) {
      handleHTTPRequestError(err);
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
        win.document.body.innerHTML = vehiclesPrintScreen(response.data);
        win.print();
        win.close();
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }

    setInLoadingPrint(false);
  };

  useEffect(() => {
    if(getVehiclesError) {
      handleHTTPRequestError(getVehiclesError);
    }
  }, [getVehiclesError]);

  if(despPermission === 0) {
    return <Navigate to="/" replace />;
  }

  const printButton = (
    <Button variant="info" disabled={inLoadingPrint} style={{ cursor: inLoadingPrint ? 'progress' : 'pointer' }} onClick={onPrintClick}>
      <FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR
    </Button>
  );

  return (
    <>
      <Layout>
        <VehiclesFiltersCard
          onCreateClick={onCreateVehicleClick}
          onFiltersApplyClick={(data) => setFilters({ ...filters, ...data, page: 1 })}
        />

        <VehiclesDataTable
          inLoading={inLoading}
          vehicles={vehicles?.data || []}
          onDetailsClick={onDetailsVehicleClick}
          onCRLVeViewClick={handleGetCRLVe}
        />

        <Card style={{ margin: '15px 0' }}>
          <Paginator
            currentPage={vehicles?.page.current || 1}
            totalPages={vehicles?.page.total || 1}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            leftContent={printButton}
          />
        </Card>
      </Layout>

      <VehiclesDetailsModal
        isOpen={detailsModalOpen}
        onClose={onModalsClose}
        vehicle={vehicles?.data.find((el) => el.id === vehicleIdToDetails)}
        onChangeSuccess={onVehicleChange}
        onCRLVeViewClick={handleGetCRLVe}
      />
    </>
  );
};
