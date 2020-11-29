import { Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useState, useEffect } from 'react';
import {
  RiSearchEyeLine as IconSearch,
} from 'react-icons/ri';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input } from '~/components/Form';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { useAPI } from '~/hooks';
import { IClient, IReceipt } from '~/interfaces';

import { EditModal } from './EditModal';
import { ReceiptsFilters } from './styles';

export const Receipts: React.FC = () => {
  document.title = 'Recibos | Christino';

  const [modasIsOpen, setModalIsOpen] = useState(false);
  const [receipt, setReceipt] = useState<IReceipt>();

  const request = useAPI<IReceipt[]>('/receipts');
  const [receipts, setReceipts] = useState<IReceipt[]>([]);
  const [clients] = useState<IClient[]>([]);
  const [groups] = useState<string[]>([]);

  const [receiptsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastReceipt = currentPage * receiptsPerPage;
  const indexofFirstReceipt = indexOfLastReceipt - receiptsPerPage;
  const intervalReceipts = receipts.slice(indexofFirstReceipt, indexOfLastReceipt);

  useEffect(() => {
    if(!request.error && request.data) {
      setReceipts(request.data);
      const unfilterClients: IClient[] = request.data.map((e) => e.client);
      const clientsFiltered: IClient[] = [];

      unfilterClients.forEach((e) => {
        if(clientsFiltered.filter((cl) => cl.id === e.id).length === 0) {
          clients.push(e);
        }

        if(groups.filter((cl) => cl === e.group).length === 0) {
          groups.push(e.group);
        }
      });

      groups.sort();

      console.log('Data requested from server!');
    }
  }, [clients, groups, request.data, request.error]);

  const onReceiptDetailButton = (data: IReceipt) => {
    setModalIsOpen(true);
    setReceipt(data);
  };

  const onModalClose = () => {
    setModalIsOpen(false);
    setReceipt(undefined);
  };

  const onFilterSubmit: SubmitHandler<IReceipt> = (data) => {
    if(receipts) {
      const name = data.client.name.toUpperCase() || '';
      const document = data.client.document.replace(/[^A-Za-z0-9]/g, '').toUpperCase() || '';
      const group = data.client.group.toUpperCase() || '';

      const plate = data.vehicle.plate.replace(/[^A-Za-z0-9]/g, '').toUpperCase() || '';
      const renavam = data.vehicle.renavam.replace(/[^A-Za-z0-9]/g, '') || '';
      const brand = data.vehicle.brandModel.toUpperCase() || '';
      const type = data.vehicle.type.replace(/[^A-Za-z0-9]/g, '').toUpperCase() || '';

      let receiptsFiltered: IReceipt[] = request.data || [];

      if(name) { receiptsFiltered = receiptsFiltered.filter(({ client }) => client.name.includes(name)); }
      if(document) { receiptsFiltered = receiptsFiltered.filter(({ client }) => client.document.includes(document)); }
      if(group) { receiptsFiltered = receiptsFiltered.filter(({ client }) => client.group.includes(group)); }

      if(plate) { receiptsFiltered = receiptsFiltered.filter(({ vehicle }) => vehicle.plate.includes(plate)); }
      if(renavam) { receiptsFiltered = receiptsFiltered.filter(({ vehicle }) => vehicle.renavam.includes(renavam)); }
      if(brand) { receiptsFiltered = receiptsFiltered.filter(({ vehicle }) => vehicle.brandModel.includes(brand)); }
      if(type) { receiptsFiltered = receiptsFiltered.filter(({ vehicle }) => vehicle.type.includes(type)); }

      setReceipts(receiptsFiltered);
      setCurrentPage(1);
    }
  };

  return (
    <>
      <Layout>
        <Card>
          <Form onSubmit={onFilterSubmit}>
            <ReceiptsFilters>
              <Scope path="client">
                <Input style={{ gridArea: 'CL' }} name="name" list="clients-name" label="NOME" />
                <Input style={{ gridArea: 'CD' }} name="document" label="DOCUMENTO" />
                <Input style={{ gridArea: 'GP' }} name="group" list="clients-groups" label="GRUPO" />
              </Scope>

              <Scope path="vehicle">
                <Input style={{ gridArea: 'PL' }} name="plate" label="PLACA" maxLength={7} />
                <Input style={{ gridArea: 'RN' }} name="renavam" label="RENAVAM" maxLength={12} />
                <Input style={{ gridArea: 'MM' }} name="brandModel" label="MARCA/MODELO" />
              </Scope>

              <Input style={{ gridArea: 'CT' }} name="vehicle.type" label="TIPO" />

              <Button style={{ gridArea: 'SB' }} type="submit" apparence="success">
                Filtrar
              </Button>
            </ReceiptsFilters>
          </Form>

          <datalist id="clients-name">
            {clients && clients.map((e) => <option key={e.id} value={e.name}>{ e.name }</option>)}
          </datalist>

          <datalist id="clients-groups">
            {groups && groups.map((e) => <option key={e} value={e}>{ e }</option>)}
          </datalist>

          <Table>
            <thead>
              <tr>
                <th style={{ width: 500, textAlign: 'left' }}>CLIENTE</th>
                <th style={{ width: 85 }}>PLACA</th>
                <th>MARCA/MODELO</th>
                <th style={{ width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {!receipts || !intervalReceipts ? (
                <tr>
                  <td style={{ textAlign: 'center' }} colSpan={5}>CARREGANDO...</td>
                </tr>
              ) : intervalReceipts.map((crv) => (
                <tr key={crv.id}>
                  <td style={{ maxWidth: 500 }}>{ crv.client.name }</td>
                  <td style={{ textAlign: 'center' }}>{ crv.vehicle.plate }</td>
                  <td style={{ textAlign: 'center' }}>{ crv.vehicle.brandModel }</td>
                  <td>
                    <Button type="button" onClick={() => onReceiptDetailButton(crv)}>
                      <IconSearch />
                    </Button>
                  </td>
                </tr>
              ))}

            </tbody>
          </Table>
          <Pagination
            totalItems={receipts ? receipts.length : receiptsPerPage}
            itemsPerPage={receiptsPerPage}
            paginate={(n) => setCurrentPage(n)}
            currentPage={currentPage}
          />
        </Card>
      </Layout>

      <EditModal isOpen={modasIsOpen} receipt={receipt} onClose={onModalClose} />
    </>
  );
};
