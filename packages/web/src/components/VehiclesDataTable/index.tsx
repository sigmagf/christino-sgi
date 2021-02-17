import React, { useState } from 'react';
import { FaSearch, FaFilePdf } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import { Badge } from '~/interface/Badge';
import { Button } from '~/interface/Button';
import { Table } from '~/interface/Table';
import { IVehicle } from '~/interfaces';
import { vehicleStatus } from '~/utils/commonSelectOptions';

import { DataTableCardContainer, VehiclesStatusBadge } from './styles';

interface IVehicleDataTableProps {
  vehicles: IVehicle[];
  inLoading: boolean;
  onDetailsClick: (id: string) => void;
  onCRLVeViewClick: (id: string) => Promise<void>;
}

export const VehiclesDataTable: React.FC<IVehicleDataTableProps> = ({ vehicles, inLoading, onDetailsClick, onCRLVeViewClick }) => {
  const [inLoadingCRLVe, setInLoadingCRLVe] = useState(false);

  const handleOnCRLVeView = async (id: string) => {
    setInLoadingCRLVe(true);
    await onCRLVeViewClick(id);
    setInLoadingCRLVe(false);
  };

  return (
    <DataTableCardContainer style={{ position: 'relative' }}>
      { inLoading && (
      <div style={{ position: 'absolute', marginTop: 25, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ReactLoading type="bars" />
      </div>
      )}

      <Table style={{ tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ width: 50 }} aria-label="status-column" />
            <th style={{ textAlign: 'left' }}>CLIENTE</th>
            <th style={{ width: 100 }}>PLACA</th>
            <th style={{ width: 150 }}>RENAVAM</th>
            <th style={{ width: 250 }}>MARCA/MODELO</th>
            <th style={{ width: 94 }} aria-label="action-column" />
          </tr>
        </thead>
        <tbody>
          {inLoading && (
            <>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
            </>
          )}

          {(!inLoading && vehicles.length === 0) && (
            <>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>SEM DADOS PARA INFORMAR</td></tr>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>- NENHUM VEICULO ENCONTRADO -</td></tr>
            </>
          )}

          {!inLoading && vehicles.map((vehicle) => (
            <tr key={vehicle.id}>
              <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <VehiclesStatusBadge status={vehicle.status} title={vehicleStatus.find((el) => el.value === vehicle.status.toString())?.label} />
              </td>
              <td>
                { vehicle.client.group && (
                  <Badge>
                    { vehicle.client.group }
                  </Badge>
                )}
                <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ vehicle.client.name }</span>
              </td>
              <td style={{ textAlign: 'center' }}>{ vehicle.plate }</td>
              <td style={{ textAlign: 'center' }}>{ vehicle.renavam }</td>
              <td style={{ textAlign: 'center' }}>{ vehicle.brandModel }</td>
              <td style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
                {vehicle.crlveIncluded && (
                  <Button
                    variant="secondary"
                    style={{ height: 34, cursor: inLoadingCRLVe ? 'progress' : 'pointer' }}
                    onClick={() => handleOnCRLVeView(vehicle.id)}
                    disabled={inLoading || inLoadingCRLVe}
                  >
                    <FaFilePdf />
                  </Button>
                )}
                <Button variant="secondary" style={{ height: 34 }} onClick={() => onDetailsClick(vehicle.id)} disabled={inLoading}>
                  <FaSearch />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DataTableCardContainer>

  );
};
