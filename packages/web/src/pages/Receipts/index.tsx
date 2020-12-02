import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { useLocalStorage } from '~/hooks';
import { IPagination, IReceipt } from '~/interfaces';
import { api } from '~/services/api';
import { translateTranslateMessages } from '~/utils/translateBackendMessages';

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
    let filtersStr = filters?.client.name ? `&name=${filters?.client.name.toUpperCase()}` : '';
    filtersStr += filters?.client.group ? `&group=${filters?.client.group.toUpperCase()}` : '';

    filtersStr += filters?.vehicle.plate ? `&plate=${filters.vehicle.plate.toUpperCase()}` : '';
    filtersStr += filters?.vehicle.renavam ? `&renavam=${filters.vehicle.renavam.toUpperCase()}` : '';
    filtersStr += filters?.vehicle.brandModel ? `&brandModel=${filters.vehicle.brandModel.toUpperCase()}` : '';

    try {
      const request = await api.get(`/receipts?page=${page}&limit=${limit}${filtersStr}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      setReceipts(request.data);
    } catch(err) {
      toast.error(translateTranslateMessages(err.response.data.message));
    }
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
    if(maxResults !== receipts?.page.limit) {
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

        {receipts && receipts.data && receipts.data.length > 0 && (
          <>
            <ReceiptsTable receipts={receipts.data} onReceiptDetailButton={onModalOpen} />
            <Card style={{ margin: '15px 0' }}>
              <Pagination
                currentPage={receipts.page.current}
                totalPages={receipts.page.total}
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
