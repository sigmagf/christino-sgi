import React, { useState } from 'react';

import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { useAPI } from '~/hooks';
import { IReceipt } from '~/interfaces';

import { EditModal } from './Modal';
import { ReceiptsTable } from './Table';

export const Receipts: React.FC = () => {
  document.title = 'Recibos | Christino';

  const request = useAPI('/receipts');

  const [modasIsOpen, setModalIsOpen] = useState(false);
  const [receipt, setReceipt] = useState<IReceipt>();

  const onModalOpen = (data: IReceipt) => {
    setModalIsOpen(true);
    setReceipt(data);
  };

  const onModalClose = () => {
    setModalIsOpen(false);
    setReceipt(undefined);
  };

  return (
    <>
      <Layout>
        <Card>
          <ReceiptsTable receipts={request.data} onReceiptDetailButton={onModalOpen} />
        </Card>
      </Layout>

      <EditModal isOpen={modasIsOpen} receipt={receipt} onClose={onModalClose} />
    </>
  );
};
