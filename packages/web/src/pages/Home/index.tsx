import React from 'react';

import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';

import { } from './styles';

export const HomePage: React.FC = () => {
  document.title = 'Início | Christino';

  return (
    <Layout>
      <Card />
    </Layout>
  );
};
