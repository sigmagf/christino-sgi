import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
  FaLayerGroup as StackIcon,
  FaPlus as AddIcon,
} from 'react-icons/fa';
import { NamedProps } from 'react-select';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input, Select } from '~/components/Form';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useLocalStorage } from '~/hooks';
import { IPagination, IVehicle } from '~/interfaces';
import { api } from '~/utils/api';
import { qsConverter } from '~/utils/queryStringConverter';

import { VehiclesDataTable } from './DataTable';
import { VehiclesImportModal } from './ImportModal';
import { FiltersCard, FiltersCardActionButtons } from './styles';

export const VehiclesPage: React.FC = () => {
  document.title = 'Veiculos | Christino';
  const storage = useLocalStorage();

  const formRef = useRef<FormHandles>(null);

  const [vehicles, setVehicles] = useState<IPagination<IVehicle>>({ page: { total: 1, current: 1, limit: 10 }, data: [] });
  const [filters, setFilters] = useState({ page: 1, limit: 10 });
  const [inLoading, setInLoading] = useState(false);
  const [importModalOpen, setImportMOdalOpen] = useState(false);

  const getData = useCallback(async () => {
    setInLoading(true);
    setVehicles({ page: { total: 1, current: 1, limit: 10 }, data: [] });

    try {
      const response = await api.get<IPagination<IVehicle>>(`/vehicles${qsConverter(filters)}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      setVehicles(response.data);
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }

    setInLoading(false);
  }, [filters, storage]);

  const onImportModalClose = useCallback(() => {
    setImportMOdalOpen(false);
    getData();
  }, [getData]);

  // eslint-disable-next-line
  useEffect(() => { getData(); }, []);

  // eslint-disable-next-line
  useEffect(() => { getData(); }, [filters]);

  const clients: NamedProps['options'] = [
    {
      value: '1ead27bc-0ec8-4a6a-89f6-ceaab9fd2373',
      label: '03108429809 - VANIL RODRIGUES',
    },
  ];

  return (
    <>
      <Layout>
        <FiltersCard>
          <details open>
            <summary>Filtros</summary>
            <Form ref={formRef} onSubmit={(data) => console.log(data)}>
              <Select label="CLIENTE" name="client_id" style={{ gridArea: 'CN' }} options={clients} />
              <Input label="GRUPO" name="client.group" style={{ gridArea: 'CG' }} />

              <Input label="PLACA" name="plate" style={{ gridArea: 'VP' }} />
              <Input label="RENAVAM" name="renavam" style={{ gridArea: 'VR' }} />
              <Input label="CRV" name="crv" style={{ gridArea: 'VC' }} />
              <Input label="MARCA/MODELO" name="renavam" style={{ gridArea: 'VM' }} />
            </Form>
          </details>

          <FiltersCardActionButtons>
            <Button variant="success" style={{ width: 175.97 }} onClick={() => setImportMOdalOpen(true)}>
              <AddIcon />&nbsp;&nbsp;&nbsp;ADICIONAR VEICULO
            </Button>
            <Button variant="info" style={{ width: 217.19 }} onClick={() => setImportMOdalOpen(true)}>
              <StackIcon />&nbsp;&nbsp;&nbsp;ENVIAR LOTE DE VEICULOS
            </Button>
            <Button variant="secondary" style={{ width: 96.33 }} onClick={() => formRef.current && formRef.current.submitForm()}>
              <StackIcon />&nbsp;&nbsp;&nbsp;FILTRAR
            </Button>
          </FiltersCardActionButtons>
        </FiltersCard>

        <VehiclesDataTable inLoading={inLoading} vehicles={vehicles.data} />

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={vehicles.page.current}
            totalPages={vehicles.page.total}
            inLoading={inLoading}
            onNumberClick={(page) => setFilters((old) => ({ ...old, page }))}
            onMaxResultsChange={() => console.log('onMaxResultsChange')}
          />
        </Card>
      </Layout>
      <VehiclesImportModal isOpen={importModalOpen} onClose={onImportModalClose} />
    </>
  );
};
