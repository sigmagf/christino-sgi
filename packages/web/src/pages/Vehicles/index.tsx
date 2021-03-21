import { IPagination, IVehicle } from '@christino-sgi/common';
import React, { useEffect, useState, useContext } from 'react';
import { FaPrint } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Layout } from '~/components/Layout';
import { Button } from '~/components/UI/Button';
import { Card } from '~/components/UI/Card';
import { Paginator } from '~/components/UI/Paginator';
import { VehiclesDataTable } from '~/components/Vehicles/DataTable';
import { VehiclesDetailsModal } from '~/components/Vehicles/DetailsModal';
import { VehiclesFiltersCard } from '~/components/Vehicles/FiltersCard';
import { UserPermissionsContext } from '~/contexts/UserPermissions';
import { useLocalStorage, useSWR } from '~/hooks';
import { IVehiclesRequestFilters } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';
import { qsConverter } from '~/utils/qsConverter';

import { vehiclesPrintScreen } from './printScreen';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const { despPermission } = useContext(UserPermissionsContext);
  let winCRLVe: Window | null;
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const [filters, setFilters] = useState<IVehiclesRequestFilters>({ page: 1, limit: 10, status: [1, 2, 3] });
  const { data: vehicles, isValidating: inLoading, error: getVehiclesError, mutate, revalidate } = useSWR<IPagination<IVehicle>>(`/vehicles${qsConverter(filters)}`);
  const [vehicleIdToDetails, setVehicleIdToDetails] = useState<string>();
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoadingPrint, setInLoadingPrint] = useState(false);
  const [detailsModal, setDetailsModal] = useState(false);
  /* END BOOLEAN STATES */

  /* - HANDLE DETAILS MODAL - */
  const onDetailsModalClose = () => { setDetailsModal(false); revalidate(); };
  const onCreateClick = () => { setVehicleIdToDetails(undefined); setDetailsModal(true); };
  const onDetailsClick = (id: string) => { setVehicleIdToDetails(id); setDetailsModal(true); };
  /* END HANDLE DETAILS MODAL */

  const onVehicleChange = (vehicle: IVehicle) => {
    mutate((e) => e && ({ page: e.page, data: [...e.data.filter((el) => el.id !== vehicle.id), vehicle] }), true);
    setVehicleIdToDetails(vehicle.id);
  };

  /* - HANDLE GET CRLV-e - */
  const onCRLVeViewClick = async (id: string) => {
    try {
      const response = await api.get(`/vehicles/${id}/crlve`, { headers: { authorization: `Bearer ${storage.getItem('token')}` }, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      if(winCRLVe) {
        winCRLVe.close();
      }

      // eslint-disable-next-line no-restricted-globals
      winCRLVe = window.open(url, 'popup', `width=${screen.width},height=${screen.height}`);

      if(!winCRLVe) {
        toast.error('Ative o popup em seu navegador.');
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }
  };

  /* - HANDLE GET WITHDRAWAL */
  const onWithdrawalViewClick = async (id: string) => {
    try {
      const response = await api.get(`/vehicles/${id}/withdrawal`, { headers: { authorization: `Bearer ${storage.getItem('token')}` }, responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));

      // eslint-disable-next-line no-restricted-globals
      const win = window.open(url, 'popup', `width=${screen.width},height=${screen.height}`);

      if(!win) {
        toast.error('Ative o popup em seu navegador.');
      }
    } catch(err) {
      handleHTTPRequestError(err);
    }
  };

  const onPrintClick = async () => {
    setInLoadingPrint(true);

    try {
      const response = await api.get<IVehicle[]>(`/vehicles?noPagination=true&${qsConverter(filters)}`, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      // eslint-disable-next-line
      const win = window.open('', 'popup', `width=${screen.width},height=${screen.height}`);

      if(win) {
        win.document.body.innerHTML = vehiclesPrintScreen(response.data);
        win.print();
        win.close();
      } else {
        toast.error('Ative o popup em seu navegador.');
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
    alert('Usuário não tem acesso ao módulo veículos!');
    return <Navigate to="/" replace />;
  }

  const printButton = (
    <Button variant="info" disabled={inLoadingPrint} onClick={onPrintClick}>
      <FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR
    </Button>
  );

  return (
    <>
      <Layout>
        <VehiclesFiltersCard
          onCreateClick={onCreateClick}
          onFiltersApplyClick={(data) => setFilters({ ...filters, ...data, page: 1 })}
        />

        <VehiclesDataTable
          inLoading={inLoading}
          vehicles={vehicles?.data}
          onDetailsClick={onDetailsClick}
          onCRLVeViewClick={onCRLVeViewClick}
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

      {detailsModal && (
        <VehiclesDetailsModal
          isOpen={detailsModal}
          onClose={onDetailsModalClose}
          vehicle={vehicles?.data.find((el) => el.id === vehicleIdToDetails)}
          onChange={onVehicleChange}
          onCRLVeViewClick={onCRLVeViewClick}
          onWithdrawalViewClick={onWithdrawalViewClick}
        />
      )}
    </>
  );
};
