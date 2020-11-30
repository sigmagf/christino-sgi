import React, { useState, useEffect } from 'react';

import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useLocalStorage } from '~/hooks';
import { IPagination, IReceipt } from '~/interfaces';
import { api } from '~/services/api';

import { ReceiptsFilters } from './Filters';
import { EditModal } from './Modal';
import { ReceiptsTable } from './Table';

export const Receipts: React.FC = () => {
  document.title = 'Recibos | Christino';

  const storage = useLocalStorage();

  const [receipts, setReceipts] = useState<IPagination<IReceipt>>();
  const [modasIsOpen, setModalIsOpen] = useState(false);
  const [receipt, setReceipt] = useState<IReceipt>();

  const getData = async (page = 1, limit = 10, filters?: Pick<IReceipt, 'client'|'vehicle'>) => {
    let filtersStr = filters?.client.name ? `&clientName=${filters?.client.name.toUpperCase()}` : '';
    filtersStr += filters?.client.group ? `&clientGroup=${filters?.client.group.toUpperCase()}` : '';

    filtersStr += filters?.vehicle.plate ? `&vehiclePlate=${filters.vehicle.plate.toUpperCase()}` : '';
    filtersStr += filters?.vehicle.renavam ? `&vehicleRenavam=${filters.vehicle.renavam.toUpperCase()}` : '';
    filtersStr += filters?.vehicle.brandModel ? `&vehicleBrandModel=${filters.vehicle.brandModel.toUpperCase()}` : '';

    const { data } = await api.get(`/receipts?page=${page}&limit=${limit}${filtersStr}`, {
      headers: {
        authorization: `Bearer ${storage.getItem('token')}`,
      },
    });

    setReceipts(data);
  };

  const onModalOpen = (dt: IReceipt) => {
    setModalIsOpen(true);
    setReceipt(dt);
  };

  const onModalClose = () => {
    setModalIsOpen(false);
    setReceipt(undefined);
  };

  const onPaginationClick = (n: number) => {
    getData(n);
  };

  const onPaginationMaxResultsClick = (maxResults: number) => {
    if(maxResults !== receipts?.limit) {
      getData(1, maxResults);
    }
  };

  const onApplyFilters = (data: Pick<IReceipt, 'client'|'vehicle'>) => {
    getData(1, 10, data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getData(); }, []);

  return (
    <>
      <Layout>
        <Card style={{ margin: '15px 0' }}>
          <ReceiptsFilters onFilterSubmit={onApplyFilters} />
        </Card>

        {receipts && receipts.result && receipts.result.length > 0 && (
          <>
            <ReceiptsTable receipts={receipts.result} onReceiptDetailButton={onModalOpen} />
            <Card style={{ margin: '15px 0' }}>
              <Pagination
                currentPage={receipts.current}
                totalPages={receipts.total}
                onNumberClick={onPaginationClick}
                onMaxResultsChange={onPaginationMaxResultsClick}
              />
            </Card>
          </>
        )}
      </Layout>

      <EditModal isOpen={modasIsOpen} receipt={receipt} onClose={onModalClose} />
    </>
  );
};
