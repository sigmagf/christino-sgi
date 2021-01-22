import React from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Table } from '~/components/Table';
import { IVehicle } from '~/interfaces';
import { statusConverter } from '~/utils/statusConverter';

import { StatusBadge } from './styles';

interface IVehicleDataTableProps {
  vehicles: IVehicle[];
  inLoading: boolean;
}

export const VehiclesDataTable: React.FC<IVehicleDataTableProps> = ({ vehicles, inLoading }) => {
  return (
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
          {inLoading && (
            <>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
            </>
          )}

          {(!inLoading && vehicles.length === 0) && (
            <>
              <tr><td colSpan={6} style={{ fontFamily: 'monospace', textAlign: 'center' }}>SEM DADOS PARA INFORMAR</td></tr>
              <tr><td colSpan={6} style={{ fontFamily: 'monospace', textAlign: 'center' }}>- NENHUM VEICULO ENCONTRADO -</td></tr>
            </>
          )}

          {!inLoading && vehicles.map((vehicle) => (
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

  );
};
