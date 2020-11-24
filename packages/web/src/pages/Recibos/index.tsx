import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  RiSearchEyeLine as IconSearch,
} from 'react-icons/ri';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input, InputMask } from '~/components/Form';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { ICRV } from '~/interfaces';

import { RecibosFilters } from './styles';

export const Recibos: React.FC = () => {
  document.title = 'CRVs | SGI - Christino';

  const [currentPage, setCurrentPage] = useState(1);
  const [crvsPerPage] = useState(10);
  const [crvs, setCRVS] = useState<ICRV[]>([]);

  const indexOfLastCRV = currentPage * crvsPerPage;
  const indexofFirstCRV = indexOfLastCRV - crvsPerPage;
  const currentCRV = crvs?.slice(indexofFirstCRV, indexOfLastCRV);

  useEffect(() => {
    const getData = async () => {
      const request = await axios.get<ICRV[]>(`${process.env.REACT_APP_API_URL}/crvs`);

      setCRVS(request.data);
    };

    getData();
  }, []);

  const onFilterSubmit: SubmitHandler<ICRV> = (data) => {
    console.log(data);

    if(crvs) {
      const clientName = data.client.document.toUpperCase();
      const clientDoc = data.client.document.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      const clientGp = data.client.group.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

      const plate = data.vehicle.plate.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      const renavam = data.vehicle.renavam.replace(/[^A-Za-z0-9]/g, '');
      const brandModel = data.vehicle.brandModel.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
      const type = data.vehicle.type.replace(/[^A-Za-z0-9]/g, '').toUpperCase();

      const crvsFiltered = crvs.filter((crv) => (
        crv.client.name.includes(clientName)
        && crv.client.document.includes(clientDoc)
        && crv.vehicle.plate.includes(clientGp)

        && crv.vehicle.plate.includes(plate)
        && crv.vehicle.renavam.includes(renavam)
        && crv.vehicle.brandModel.includes(brandModel)
        && crv.vehicle.type.includes(type)
      ));

      setCRVS(crvsFiltered);
    }
  };

  return (
    <Layout>
      <Card>
        <Form onSubmit={onFilterSubmit}>
          <RecibosFilters>
            <Input name="client.name" label="NOME CLIENTE" />
            <Input name="client.document" label="DOCUMENTO CLIENTE" />
            <Input name="client.group" label="GRUPO" />
            <Input name="vehicle.plate" label="PLACA" maxLength={7} />
            <Input name="vehicle.renavam" label="RENAVAM" maxLength={12} />
            <Input name="vehicle.brandModel" label="MARCA/MODELO" />
            <Input name="vehicle.type" label="TIPO" />
            <Button type="submit" apparence="success">
              Filtrar
            </Button>
          </RecibosFilters>
        </Form>

        <Table>
          <thead>
            <tr>
              <th style={{ width: 500, textAlign: 'left' }}>CLIENTE</th>
              <th style={{ width: 85 }}>PLACA</th>
              <th>MARCA/MODELO</th>
              <th style={{ width: 50 }} />
            </tr>
          </thead>
          <tbody>
            {!crvs || !currentCRV ? (
              <tr>
                <td style={{ textAlign: 'center' }} colSpan={5}>CARREGANDO...</td>
              </tr>
            ) : currentCRV.map((crv) => (
              <tr key={crv.id}>
                <td style={{ maxWidth: 500 }}>{ crv.client.name }</td>
                <td style={{ textAlign: 'center' }}>{ crv.vehicle.plate }</td>
                <td style={{ textAlign: 'center' }}>{ crv.client.group }</td>
                <td>
                  <Button type="button">
                    <IconSearch />
                  </Button>
                </td>
              </tr>
            ))}

          </tbody>
        </Table>
        <Pagination
          totalItems={crvs ? crvs.length : crvsPerPage}
          itemsPerPage={crvsPerPage}
          paginate={(n) => setCurrentPage(n)}
          currentPage={currentPage}
        />
      </Card>
    </Layout>
  );
};
