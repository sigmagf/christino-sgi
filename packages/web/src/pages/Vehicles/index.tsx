import React, { useState, useCallback, useEffect } from 'react';
import {
  FaSearch as SearchIcon,
  FaLayerGroup as StackIcon,
} from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { useLocalStorage } from '~/hooks';
import { IPagination, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { qsConverter } from '~/utils/queryStringConverter';
import { statusConverter } from '~/utils/statusConverter';

import { VehicleImportModal } from './ImportModal';
import { StatusBadge } from './styles';

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
        <Card style={{ marginBottom: 15 }}>
          <Button variant="info" onClick={() => setImportMOdalOpen(true)}>
            <StackIcon />&nbsp;&nbsp;&nbsp;ENVIAR LOTE DE VEICULOS
          </Button>
        </Card>

        <Card style={{ position: 'relative' }}>
          { inLoading && (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
              <ReactLoading type="bars" />
            </div>
          )}

          <Table>
            <thead>
              <tr>
                <th style={{ width: 20 }} aria-label="status-column" />
                <th style={{ fontFamily: 'monospace', textAlign: 'left' }}>CLIENTE</th>
                <th style={{ fontFamily: 'monospace', width: 100 }}>PLACA</th>
                <th style={{ fontFamily: 'monospace', width: 150 }}>RENAVAM</th>
                <th style={{ fontFamily: 'monospace', width: 250 }}>MARCA/MODELO</th>
                <th style={{ fontFamily: 'monospace', width: 50 }} aria-label="action-column" />
              </tr>
            </thead>
            <tbody>

              {(vehicles.data.length === 0) && (
                <>
                  <tr><td colSpan={6} /></tr>
                  <tr><td colSpan={6} /></tr>
                  <tr><td colSpan={6} /></tr>
                  <tr><td colSpan={6} /></tr>
                  {inLoading ? (
                    <>
                      <tr><td colSpan={6} /></tr>
                      <tr><td colSpan={6} /></tr>
                    </>
                  ) : (
                    <>
                      <tr><td colSpan={6} style={{ fontFamily: 'monospace', textAlign: 'center' }}>SEM DADOS PARA INFORMAR</td></tr>
                      <tr><td colSpan={6} style={{ fontFamily: 'monospace', textAlign: 'center' }}>- NENHUM VEICULO ENCONTRADO -</td></tr>
                    </>
                  )}
                  <tr><td colSpan={6} /></tr>
                  <tr><td colSpan={6} /></tr>
                  <tr><td colSpan={6} /></tr>
                  <tr><td colSpan={6} /></tr>
                </>
              )}

              {!inLoading && vehicles?.data.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBadge status={vehicle.status} title={statusConverter(vehicle.status)} />
                  </td>
                  <td style={{ fontFamily: 'monospace' }}>{ vehicle.client.name }</td>
                  <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.plate }</td>
                  <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.renavam }</td>
                  <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.brand_model }</td>
                  <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>
                    <Button variant="secondary" disabled={inLoading}>
                      <SearchIcon />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

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
      <VehicleImportModal isOpen={importModalOpen} onClose={onImportModalClose} />
    </>
  );
};
