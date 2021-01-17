import React, { useState, useCallback, useEffect } from 'react';
import {
  FaSearch as SearchIcon,
  FaLayerGroup as StackIcon,
} from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { IPagination, IVehicle } from '~/interfaces';
import { api } from '~/services/api';
import { qsConverter } from '~/utils/queryStringConverter';

import { VehicleImportModal } from './ImportModal';
import { StatusBadge } from './styles';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  const [vehicles, setVehicles] = useState<IPagination<IVehicle>>({ page: { total: 1, current: 1, limit: 10 }, data: [] });
  const [filters, setFilters] = useState({ page: 1, limit: 10, name: '', group: '', document: '', plate: '', renavam: '', brand_model: '', type: '', status: '' });
  const [inLoading, setInLoading] = useState(false);
  const [importModalState, setImportModalState] = useState(false);

  const getData = useCallback(async () => {
    setInLoading(true);

    try {
      const response = await api.get<IPagination<IVehicle>>(`/vehicles${qsConverter(filters)}`);

      setVehicles(response.data);
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }

    setInLoading(false);
  }, [filters]);

  const statusConverter = useCallback((status: number) => {
    switch(status) {
      default:
      case 0:
        return 'BAIXADO';
      case 1:
        return 'CRLVe';
      case 2:
        return 'CRV';
      case 3:
        return 'OUTRO';
    }
  }, []);

  const onImportModalClose = useCallback(() => {
    setImportModalState(false);
    getData();
  }, []);

  useEffect(() => { getData(); }, [getData, filters]);

  return (
    <>
      <Layout>
        <Card style={{ marginBottom: 15 }}>
          <Button variant="info" onClick={() => setImportModalState(true)}>
            <StackIcon />&nbsp;&nbsp;&nbsp;ENVIAR LOTE DE VEICULOS
          </Button>
        </Card>

        <Card style={{ position: 'relative' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ width: 20 }}>&nbsp;</th>
                <th style={{ fontFamily: 'monospace', textAlign: 'left' }}>CLIENTE</th>
                <th style={{ fontFamily: 'monospace', width: 100 }}>PLACA</th>
                <th style={{ fontFamily: 'monospace', width: 150 }}>RENAVAM</th>
                <th style={{ fontFamily: 'monospace', width: 250 }}>MARCA/MODELO</th>
                <th style={{ fontFamily: 'monospace', width: 50 }}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {(!inLoading && vehicles && vehicles.data.length === 0) && (
                <>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6} style={{ fontFamily: 'monospace', textAlign: 'center' }}>SEM DADOS PARA INFORMAR</td></tr>
                  <tr><td colSpan={6} style={{ fontFamily: 'monospace', textAlign: 'center' }}>- NENHUM VEICULO ENCONTRADO -</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                </>
              )}
              {(inLoading || !vehicles) ? (
                <>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                  <tr><td colSpan={6}>&nbsp;</td></tr>
                </>
              ) : (
                vehicles.data.map((vehicle) => (
                  <tr>
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
                ))
              )}
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
      <VehicleImportModal isOpen={importModalState} onClose={onImportModalClose} />
    </>
  );
};
