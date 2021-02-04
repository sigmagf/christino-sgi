import React from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Table } from '~/components/Table';
import { IWork } from '~/interfaces';

import { DataTableCardContainer, StatusBadge } from './styles';

interface IVehicleDataTableProps {
  data: IWork[];
  inLoading: boolean;
  onDetailsClick: (id: string) => void;
}

export const WorksDataTable: React.FC<IVehicleDataTableProps> = ({ data, inLoading, onDetailsClick }) => {
  return (
    <DataTableCardContainer style={{ position: 'relative' }}>
      { inLoading && (
      <div style={{ position: 'absolute', marginTop: 25, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <ReactLoading type="bars" />
      </div>
      )}

      <Table>
        <thead>
          <tr>
            <th aria-label="status-column" />
            <th style={{ textAlign: 'left' }}>CLIENTE</th>
            <th style={{ width: 100 }}>SETOR</th>
            <th style={{ width: 250 }}>SERVIÇO</th>
            <th style={{ width: 250 }}>VALOR</th>
            <th style={{ width: 50 }} aria-label="action-column" />
          </tr>
        </thead>
        <tbody>
          {inLoading && (
            <>
              <tr><td colSpan={6} /></tr>
              <tr><td colSpan={6} /></tr>
            </>
          )}

          {(!inLoading && data.length === 0) && (
            <>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>SEM DADOS PARA INFORMAR</td></tr>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>- NENHUMA O.S. ENCONTRADA -</td></tr>
            </>
          )}

          {!inLoading && data.map((el) => (
            <tr key={el.id}>
              <td>
                <StatusBadge status={el.status} />
              </td>
              <td>
                { el.client.name }
                {el.client.group && (
                  <Badge>
                    { el.client.group }
                  </Badge>
                )}
              </td>
              <td style={{ textAlign: 'center' }}>{ el.sector.name }</td>
              <td style={{ textAlign: 'center' }}>{ el.service.name }</td>
              <td style={{ textAlign: 'center' }}>{ el.value.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) }</td>
              <td style={{ textAlign: 'center' }}>
                <Button variant="secondary" style={{ height: 34 }} onClick={() => onDetailsClick(el.id)} disabled={inLoading}>
                  <SearchIcon />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DataTableCardContainer>

  );
};
