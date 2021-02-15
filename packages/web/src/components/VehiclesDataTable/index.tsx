import React, { useState } from 'react';
import { FaSearch, FaFilePdf } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { useLocalStorage } from '~/hooks';
import { Badge } from '~/interface/Badge';
import { Button } from '~/interface/Button';
import { Table } from '~/interface/Table';
import { IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { statusConverter } from '~/utils/statusConverter';

import { DataTableCardContainer, VehiclesStatusBadge } from './styles';

interface IVehicleDataTableProps {
  vehicles: IVehicle[];
  inLoading: boolean;
  onDetailsClick: (id: string) => void;
}

export const VehiclesDataTable: React.FC<IVehicleDataTableProps> = ({ vehicles, inLoading, onDetailsClick }) => {
  const storage = useLocalStorage();

  const [inLoadingCRLVe, setInLoadingCRLVe] = useState(false);

  const handleOnCRLVeView = async (id: string) => {
    setInLoadingCRLVe(true);

    try {
      const response = await api.get(`/vehicles/crlve/view/${id}`, {
        headers: { authorization: `Bearer ${storage.getItem('token')}` },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      // eslint-disable-next-line no-restricted-globals
      window.open(url, 'TITULO', `toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,width=${screen.width},height=${screen.height}`);
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado.');
      }
    }

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
                <VehiclesStatusBadge status={vehicle.status} title={statusConverter(vehicle.status)} />
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
