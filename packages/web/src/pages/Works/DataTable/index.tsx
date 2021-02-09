import React from 'react';
import { FaSearch } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import { Badge } from '~/components/interface/Badge';
import { Button } from '~/components/interface/Button';
import { Table } from '~/components/interface/Table';
import { IWork } from '~/interfaces';
import { worksStatus } from '~/utils/commonSelectOptions';

import { DataTableCardContainer } from './styles';

interface IWorksDataTableProps {
  works: IWork[];
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
            <th style={{ textAlign: 'left' }}>CLIENTE</th>
            <th style={{ width: 150 }}>SETOR</th>
            <th style={{ width: 150 }}>SERVICO</th>
            <th style={{ width: 150 }}>IDENTIFICADOR</th>
            <th style={{ width: 100 }}>STATUS</th>
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

          {(!inLoading && works.length === 0) && (
            <>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>SEM DADOS PARA INFORMAR</td></tr>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>- NENHUM VEICULO ENCONTRADO -</td></tr>
            </>
          )}

          {!inLoading && works.map((el) => (
            <tr key={el.id}>
              <td>
                { el.client.group && (
                  <Badge>
                    { el.client.group }
                  </Badge>
                )}
                <span style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ el.client.name }</span>
              </td>
              <td style={{ textAlign: 'center' }}>{ el.sector.name }</td>
              <td style={{ textAlign: 'center' }}>{ el.service.name }</td>
              <td style={{ textAlign: 'center' }}>{ el.identifier }</td>
              <td style={{ textAlign: 'center' }}>{ worksStatus.filter((st) => st.value === el.status.toString())[0].label }</td>
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
