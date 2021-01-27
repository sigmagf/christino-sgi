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
import { statusConverter } from '~/utils/statusConverter';

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
        console.log(err);
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
    getData();
  };

  const onPrintClick = async () => {
    try {
      const response = await api.get<IVehicle[]>(`/vehicles?noPagination=true&${qsConverter(filters)}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
      });

      // eslint-disable-next-line
      const win = window.open('', 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${screen.width},height=${screen.height}`);

      if(win) {
        win.document.body.innerHTML = `
          <style>
            @page { size: landscape; -webkit-print-color-adjust: exact; }
            * { font-family: 'Roboto Mono', monospace; font-size: 10px; }
            html, body { margin: 0; padding: 0; }
            table { width: 100%; border-radius: 5px; overflow: hidden; border-collapse: collapse; }
            td, th { padding: 8px; }
            thead > tr > th{ font-weight: 800; }
            tbody > tr:nth-child(even) { background: white; }
            tbody > tr:nth-child(odd) { background: lightgray; }
          </style>

          <table>
            <thead>
              <tr>
                <th style="text-align: left">CLIENTE</th>
                <th>PLACA</th>
                <th>RENAVAM</th>
                <th>CRV</th>
                <th>MARCA/MODELO</th>
                <th>TIPO</th>
                <th>DETALHES</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
            ${response.data.map((v) => `
              <tr>
                <td>${v.client.name}</td>
                <td style="text-align: center">${v.plate}</td>
                <td style="text-align: center">${v.renavam.padStart(11, '0')}</td>
                <td style="text-align: center">${(v.crv || '').padStart(12, '0')}</td>
                <td style="text-align: center">${v.brand_model}</td>
                <td style="text-align: center">${v.type}</td>
                <td style="text-align: center">${v.details || ''}</td>
                <td style="text-align: center">${statusConverter(v.status)}</td>
              </tr>
            `).join('')}
            </tbody>
          </table>
        `;

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
        console.log(err);
      }
    }
  };

  useEffect(() => { getData(); }, []); // eslint-disable-line
  useEffect(() => { getData(); }, [filters]); // eslint-disable-line

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
            overrideMaxResultsBy={<Button variant="info" onClick={onPrintClick}><FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR</Button>}
          />
        </Card>
      </Layout>
      <VehiclesImportModal isOpen={importModalOpen} onClose={onModalsClose} />
      <VehiclesDetailsModal isOpen={detailsModalOpen} onClose={onModalsClose} vehicle={vehicleToDetails} />
    </>
  );
};
