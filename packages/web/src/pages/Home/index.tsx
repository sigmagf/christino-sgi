import React from 'react';
import { Chart } from 'react-charts';

import { Layout } from '~/components/Layout';
import { Card } from '~/interface/Card';

export const HomePage: React.FC = () => {
  document.title = 'Início | Christino';

  const data = React.useMemo(() => [{
    label: 'Series 1',
    data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]],
  }, {
    label: 'Series 2',
    data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]],
  }], []);

  const axes = React.useMemo(() => [{
    primary: true,
    type: 'linear',
    position: 'bottom',
  }, {
    type: 'linear',
    position: 'left',
  }], []);

  return (
    <Layout>
      <Card style={{ height: 200 }}>
        <Chart data={data} axes={axes} />
      </Card>
    </Layout>
  );
};
