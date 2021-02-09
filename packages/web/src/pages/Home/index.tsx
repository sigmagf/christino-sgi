import React from 'react';

import { Layout } from '~/components/Layout';

import { Card } from '~/interface/Card';

import { } from './styles';

export const HomePage: React.FC = () => {
  document.title = 'Início | Christino';

  return (
    <Layout>
      <Card />
    </Layout>
  );
};
