import { IWork } from '@christino-sgi/common';
import { transparentize } from 'polished';
import React from 'react';
import { Line } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

import { Layout } from '~/components/Layout';
import { Card } from '~/components/UI/Card';
import { useSWR } from '~/hooks';

import { HomePageContainer } from './styles';

export const HomePage: React.FC = () => {
  document.title = 'Início | Christino';

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const theme = useTheme();
  const commonLabels = ['JAN', 'FEV', 'MAR', 'ABR', 'MAI', 'JUN', 'JUL', 'AGO', 'SET', 'OUT', 'NOV', 'DEZ'];
  const commonDataset = {
    fill: false,
    backgroundColor: theme.secondary.main,
    borderColor: transparentize(0.25, theme.secondary.main),
  };
  const commonOptions = {
    scales: {
      yAxes: [{
        ticks: {
          fontColor: theme.text,
          beginAtZero: true,
        },
      }],
      xAxes: [{
        ticks: { fontColor: theme.text },
      }],
    },
    legend: { labels: { fontColor: theme.text } },
  };
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const { data: works } = useSWR<IWork[]>('/works?noPagination=true');
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  /* END BOOLEAN STATES */

  const cDesp = (month = 1) => {
    if(works) {
      const count = works.filter((el) => (new Date(el.createdAt || '')).getMonth() === month).filter((el) => el.service.sector.name === 'DESPACHANTE');
      return count.length;
    }

    return 0;
  };

  const cSegu = (month = 1) => {
    if(works) {
      const count = works.filter((el) => (new Date(el.createdAt || '')).getMonth() === month).filter((el) => el.service.sector.name === 'SEGUROS');
      return count.length;
    }

    return 0;
  };

  const cEscr = (month = 1) => {
    if(works) {
      const count = works.filter((el) => (new Date(el.createdAt || '')).getMonth() === month).filter((el) => el.service.sector.name === 'ESCRITORIO');
      return count.length;
    }

    return 0;
  };

  return (
    <Layout>
      <HomePageContainer>
        <Card style={{ gridArea: 'D' }}>
          <Line
            data={{
              labels: commonLabels,
              datasets: [{
                label: 'DESPACHANTE',
                data: [cDesp(0), cDesp(1), cDesp(2), cDesp(3), cDesp(4), cDesp(5), cDesp(6), cDesp(7), cDesp(8), cDesp(9), cDesp(10), cDesp(11)],
                ...commonDataset,
              }],
            }}
            options={commonOptions}
          />
        </Card>

        <Card style={{ gridArea: 'S' }}>
          <Line
            data={{
              labels: commonLabels,
              datasets: [{
                label: 'SEGUROS',
                data: [cSegu(0), cSegu(1), cSegu(2), cSegu(3), cSegu(4), cSegu(5), cSegu(6), cSegu(7), cSegu(8), cSegu(9), cSegu(10), cSegu(11)],
                ...commonDataset,
              }],
            }}
            options={commonOptions}
          />
        </Card>

        <Card style={{ gridArea: 'E' }}>
          <Line
            data={{
              labels: commonLabels,
              datasets: [{
                label: 'ESCRITORIO',
                data: [cEscr(0), cEscr(1), cEscr(2), cEscr(3), cEscr(4), cEscr(5), cEscr(6), cEscr(7), cEscr(8), cEscr(9), cEscr(10), cEscr(11)],
                ...commonDataset,
              }],
            }}
            options={commonOptions}
          />
        </Card>
      </HomePageContainer>
    </Layout>
  );
};
