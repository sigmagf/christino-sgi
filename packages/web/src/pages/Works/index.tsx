import React from 'react';
import { FaPrint } from 'react-icons/fa';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';

import { WorksDataTable } from './DataTable';

export const WorksPage: React.FC = () => {
  document.title = 'Ordens de Serviço | Christino';

  const data = [
    {
      id: '1',
      status: 2,
      client: {
        name: 'JOAO GABRIEL FURLAN E LEONEL',
        document: '000.000.000-00',
        group: 'FURLAN',
      },
      sector: 1,
      service: 1,
      value: 2503.20,
    },
  ];

  return (
    <Layout>
      <WorksDataTable inLoading={false} data={data} onDetailsClick={() => console.log('click')} />

      <Card style={{ margin: '15px 0' }}>
        <Pagination
          currentPage={1}
          totalPages={7}
          inLoading={false}
          onNumberClick={(page) => console.log(`onNumberClick(${page})`)}
          onMaxResultsChange={() => console.log('onMaxResultsChange()')}
          overrideMaxResultsBy={<Button variant="info" onClick={() => console.log('onPrin()')}><FaPrint />&nbsp;&nbsp;&nbsp;IMPRIMIR</Button>}
        />
      </Card>
    </Layout>
  );
};
