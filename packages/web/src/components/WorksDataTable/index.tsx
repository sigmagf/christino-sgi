import React from 'react';
import { FaSearch } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import { Badge } from '~/interface/Badge';
import { Button } from '~/interface/Button';
import { Table } from '~/interface/Table';
import { IWork } from '~/interfaces';
import { worksStatus } from '~/utils/commonSelectOptions';
import { formatDate } from '~/utils/formatString';

import { WorksStatusBadge, DataTableCardContainer } from './styles';

interface IWorksDataTableProps {
  works: IWork[] | undefined;
  inLoading: boolean;
  onDetailsClick: (id: string) => void;
}

export const WorksDataTable: React.FC<IWorksDataTableProps> = ({ works, inLoading, onDetailsClick }) => {
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
            <th style={{ width: 150 }}>SETOR</th>
            <th style={{ width: 150 }}>SERVICO</th>
            <th style={{ width: 150 }}>IDENTIFICADOR</th>
            <th style={{ width: 100 }}>CRIADO EM</th>
            <th style={{ width: 50 }} aria-label="action-column" />
          </tr>
        </thead>
        <tbody>
          {(!works || works.length === 0) && (
            <>
              <tr><td colSpan={7} style={{ textAlign: 'center' }}>{!inLoading && 'SEM DADOS PARA INFORMAR'}</td></tr>
              <tr><td colSpan={7} style={{ textAlign: 'center' }}>{!inLoading && '- NENHUMA O.S. ENCONTRADO -'}</td></tr>
            </>
          )}

          {works && works.map((el) => (
            <tr key={el.id}>
              <td><WorksStatusBadge status={el.status} title={worksStatus.find((st) => st.value === el.status.toString())?.label} /></td>
              <td>
                { el.client.group && (
                  <Badge>
                    { el.client.group }
                  </Badge>
                )}
                <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ el.client.name }</span>
              </td>
              <td style={{ textAlign: 'center' }}>{ el.service.sector.name }</td>
              <td style={{ textAlign: 'center' }}>{ el.service.name }</td>
              <td style={{ textAlign: 'center' }}>{ el.identifier }</td>
              <td style={{ textAlign: 'center' }}>{ formatDate(el.createdAt) }</td>
              <td style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
                <Button variant="secondary" style={{ height: 34 }} onClick={() => onDetailsClick(el.id)} disabled={inLoading}>
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
