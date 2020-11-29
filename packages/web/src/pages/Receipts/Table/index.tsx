import React from 'react';
import {
  RiSearchEyeLine as IconSearch,
} from 'react-icons/ri';

import { Button } from '~/components/Button';
import { Table } from '~/components/Table';
import { IReceipt } from '~/interfaces';

interface IReceiptsTableProps {
  receipts?: IReceipt[];
  onReceiptDetailButton: (receipt: IReceipt) => void;
}

export const ReceiptsTable: React.FC<IReceiptsTableProps> = ({ receipts, onReceiptDetailButton }) => {
  return (
    <Table>
      <thead>
        <tr>
          <th style={{ width: 500, textAlign: 'left' }}>CLIENTE</th>
          <th style={{ width: 85 }}>PLACA</th>
          <th>MARCA/MODELO</th>
          <th style={{ width: 40 }} />
        </tr>
      </thead>
      <tbody>
        {!receipts ? (
          <tr>
            <td style={{ textAlign: 'center' }} colSpan={5}>CARREGANDO...</td>
          </tr>
        ) : receipts.map((crv) => (
          <tr key={crv.id}>
            <td style={{ maxWidth: 500 }}>{ crv.client.name }</td>
            <td style={{ textAlign: 'center' }}>{ crv.vehicle.plate }</td>
            <td style={{ textAlign: 'center' }}>{ crv.vehicle.brandModel }</td>
            <td>
              <Button type="button" onClick={() => onReceiptDetailButton(crv)}>
                <IconSearch />
              </Button>
            </td>
          </tr>
        ))}

      </tbody>
    </Table>
  );
};
