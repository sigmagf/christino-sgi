import React from 'react';

import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';

import { Details } from './styles';

export const HomePage: React.FC = () => {
  document.title = 'Início | Christino';

  return (
    <Layout>
      <Card>
        <Details>
          <summary>ABC1234 - 00123456789</summary>
          <section>Plate already exists for this client</section>
        </Details>
      </Card>
    </Layout>
  );
};
