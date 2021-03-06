import { IClient } from '@christino-sgi/common';
import React from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import ReactLoading from 'react-loading';

import { Badge } from '~/interface/Badge';
import { Button } from '~/interface/Button';
import { Table } from '~/interface/Table';
import { formatDocument } from '~/utils/formatString';

import { DataTableCardContainer } from './styles';

interface IClientsDataTableProps {
  clients: IClient[] | undefined;
  inLoading: boolean;
  onDetailsClick: (id: string) => void;
}

export const ClientsDataTable: React.FC<IClientsDataTableProps> = ({ clients, inLoading, onDetailsClick }) => {
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
            <th style={{ width: 100 }}>CPF/CNPJ</th>
            <th style={{ width: 250 }}>E-MAIL</th>
            <th style={{ width: 250 }}>TELEFONE 1</th>
            <th style={{ width: 250 }}>TELEFONE 2</th>
            <th style={{ width: 50 }} aria-label="action-column" />
          </tr>
        </thead>
        <tbody>
          {(!clients || clients.length === 0) && (
            <>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>{!inLoading && 'SEM DADOS PARA INFORMAR'}</td></tr>
              <tr><td colSpan={6} style={{ textAlign: 'center' }}>{!inLoading && '- NENHUM VEICULO ENCONTRADO -'}</td></tr>
            </>
          )}

          {clients && clients.map((el) => (
            <tr key={el.id}>
              <td>
                {el.group && (
                  <Badge>
                    { el.group }
                  </Badge>
                )}
                { el.name }
              </td>
              <td style={{ textAlign: 'center' }}>{ formatDocument(el.document) }</td>
              <td style={{ textAlign: 'center' }}>{ el.email }</td>
              <td style={{ textAlign: 'center' }}>{ el.phone1 }</td>
              <td style={{ textAlign: 'center' }}>{ el.phone2 }</td>
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
