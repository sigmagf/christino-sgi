import React, { useState, useCallback, useEffect } from 'react';
import { FaSearch as SearchIcon } from 'react-icons/fa';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { IPagination, IVehicle } from '~/interfaces';
import { api } from '~/services/api';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';

  const [vehicles, setVehicles] = useState<IPagination<IVehicle>>({
    page: {
      total: 1,
      current: 1,
      limit: 10,
    },
    data: [],
  });
  const [qsFilter, setqsFilter] = useState('?page=1&limit=10');

  const getData = useCallback(async () => {
    try {
      const response = await api.get<IPagination<IVehicle>>(`/vehicles${qsFilter}`);

      setVehicles(response.data);
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }
  }, []);

  useEffect(() => { getData(); }, []);
  useEffect(() => { getData(); }, [qsFilter]);

  return (
    <>
      <Layout>
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
              {vehicles?.data.length > 0 && (
                vehicles?.data.map((vehicle) => (
                  <tr>
                    <td style={{ fontFamily: 'monospace' }}>{ vehicle.client_id }</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.plate }</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.renavam }</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.brand_model }</td>
                    <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>
                      <Button>
                        <SearchIcon />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card>

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={vehicles.page.current}
            totalPages={vehicles.page.total}
            inLoading={false}
            onNumberClick={(page) => setqsFilter(`?page=${page}&limit=10`)}
            onMaxResultsChange={() => console.log('onMaxResultsChange')}
          />
        </Card>
      </Layout>
    </>
  );
};
