import React from 'react';
import {
  FaSearch as IconSearch,
} from 'react-icons/fa';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Table } from '~/components/Table';
import { IReceipt } from '~/interfaces';

interface IReceiptsTableProps {
  receipts: IReceipt[];
  onReceiptDetailButton: (receipt: IReceipt) => void;
}

export const ReceiptsTable: React.FC<IReceiptsTableProps> = ({ receipts, onReceiptDetailButton }) => {
  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th style={{ fontFamily: 'monospace', width: 500, textAlign: 'left' }}>CLIENTE</th>
            <th style={{ fontFamily: 'monospace', width: 85 }}>PLACA</th>
            <th style={{ fontFamily: 'monospace' }}>MARCA/MODELO</th>
            <th style={{ fontFamily: 'monospace', width: 40 }} />
          </tr>
        </thead>
        <tbody>
          {receipts.length <= 0 ? (
            <tr>
              <td style={{ fontFamily: 'monospace', textAlign: 'center' }} colSpan={5}>CARREGANDO...</td>
            </tr>
          ) : receipts.map((crv) => (
            <tr key={crv.id}>
              <td style={{ fontFamily: 'monospace', maxWidth: 500 }}>{ crv.client.name }</td>
              <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ crv.vehicle.plate }</td>
              <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ crv.vehicle.brandModel }</td>
              <td>
                <Button type="button" onClick={() => onReceiptDetailButton(crv)}>
                  <IconSearch />
                </Button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    </Card>
  );
};
