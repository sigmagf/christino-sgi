import React from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  return (
    <>
      <Layout>
        <Card style={{ margin: '15px 0' }}>
          *
        </Card>

        <Card style={{ position: 'relative' }}>
          <Table>
            <thead>
              <tr>
                <th style={{ fontFamily: 'monospace', textAlign: 'left' }}>CLIENTE</th>
                <th style={{ fontFamily: 'monospace', width: 100 }}>PLACA</th>
                <th style={{ fontFamily: 'monospace', width: 150 }}>RENAVAM</th>
                <th style={{ fontFamily: 'monospace', width: 250 }}>MARCA/MODELO</th>
                <th style={{ fontFamily: 'monospace', width: 50 }}>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontFamily: 'monospace' }}>ALMEIDA & ANTUNES ORGANIZACAO E PROMOCAO DE FEIRAS LTDA</td>
                <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>ABC-1234</td>
                <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>12.345.678.998</td>
                <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>I/VW AMAROK CD 4X4 TREND</td>
                <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>
                  <Button>
                    <SearchIcon />
                  </Button>
                </td>
              </tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
              <tr><td colSpan={5} /></tr>
            </tbody>
          </Table>
        </Card>

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={1}
            totalPages={10}
            inLoading={false}
            onNumberClick={() => console.log('onPageClick')}
            onMaxResultsChange={() => console.log('onMaxResultsChange')}
          />
        </Card>
      </Layout>
    </>
  );
};
