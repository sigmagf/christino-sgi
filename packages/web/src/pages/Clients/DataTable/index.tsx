import React from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import { Badge } from '~/components/Badge';
import { Button } from '~/components/Button';
import { Table } from '~/components/Table';
import { IClient } from '~/interfaces';
import { formatDocument } from '~/utils/formatDocument';

import { DataTableCardContainer } from './styles';

interface IClientsDataTableProps {
  data: IClient[];
  inLoading: boolean;
  onDetailsClick: (id: string) => void;
}

export const ClientsDataTable: React.FC<IClientsDataTableProps> = ({ data, inLoading, onDetailsClick }) => {
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
            <th style={{ textAlign: 'left' }}>NOME</th>
            <th style={{ width: 100 }}>DOCUMENTO</th>
            <th style={{ width: 250 }}>E-MAIL</th>
            <th style={{ width: 250 }}>TELEFONE 1</th>
            <th style={{ width: 250 }}>TELEFONE 2</th>
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
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>- NENHUM VEICULO ENCONTRADO -</td></tr>
            </>
          )}

          {!inLoading && data.map((el) => (
            <tr key={el.id}>
              <td>
                { el.name }
                {el.group && (
                  <Badge>
                    { el.group }
                  </Badge>
                )}
              </td>
              <td style={{ textAlign: 'center' }}>{ formatDocument(el.document) }</td>
              <td style={{ textAlign: 'center' }}>{ el.email }</td>
              <td style={{ textAlign: 'center' }}>{ el.phone1 }</td>
              <td style={{ textAlign: 'center' }}>{ el.phone2 }</td>
              <td style={{ textAlign: 'center' }}>
                <Button variant="secondary" style={{ height: 34 }} onClick={() => onDetailsClick(el.id)} disabled={inLoading || true}>
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
