import { FormHandles, Scope } from '@unform/core';
import { Form } from '@unform/web';
import { transparentize } from 'polished';
import React, { useRef } from 'react';
import {
  RiCloseLine as IconClose,
} from 'react-icons/ri';
import Modal from 'react-modal';

import { Button } from '~/components/Button';
import { Input } from '~/components/Form';
import { IReceipt } from '~/interfaces';
import { theme } from '~/styles/theme';

import { ReceiptsModal } from './styles';

interface IEditModalProps {
  isOpen: boolean;
  receipt?: IReceipt;
  onClose: () => void;
}

Modal.setAppElement('#root');
export const EditModal: React.FC<IEditModalProps> = ({ receipt, isOpen, onClose }) => {
  const formRef = useRef<FormHandles>(null);

  const customStyles: Modal.Styles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',

      borderColor: theme.primary.main,
      borderRadius: 10,
      background: theme.primary.main,
      boxShadow: '0 0 4px 4px rgba(29, 31, 35, .25)',
    },
    overlay: {
      background: transparentize(0.25, theme.background),
      backdropFilter: 'blur(2px)',
    },
  };

  const formatDate = (dateStr: Date|string) => {
    if(dateStr) {
      const dateArr = dateStr.toString().split('T');

      if(dateArr.length !== 2) {
        return '';
      }

      const [year, month, day] = dateArr[0].split('-');

      return `${day}/${month}/${year}`;
    }

    return '';
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Recibo"
    >
      <ReceiptsModal>
        <div className="modal-header">
          RECIBO
          <Button apparence="error" onClick={onClose}>
            <IconClose />
          </Button>
        </div>
        {receipt && (
          <Form ref={formRef} onSubmit={(e) => console.log(e)}>
            <Scope path="client">
              <Input style={{ gridArea: 'CL' }} name="name" label="NOME" value={receipt.client.name} />
              <Input style={{ gridArea: 'CD' }} name="document" label="DOCUMENTO" value={receipt.client.document} />
              <Input style={{ gridArea: 'GP' }} name="group" label="GRUPO" value={receipt.client.group} />
            </Scope>

            <Scope path="vehicle">
              <Input style={{ gridArea: 'PL' }} name="plate" label="PLACA" value={receipt.vehicle.plate} />
              <Input style={{ gridArea: 'RN' }} name="renavam" label="RENAVAM" value={receipt.vehicle.renavam} />
              <Input style={{ gridArea: 'MM' }} name="brandModel" label="MARCA/MODELO" value={receipt.vehicle.brandModel} />
              <Input style={{ gridArea: 'TP' }} name="type" label="TIPO" value={receipt.vehicle.type} />
            </Scope>

            <Input style={{ gridArea: 'EM' }} name="issuedOn" label="EMITIDO EM" value={formatDate(receipt.issuedOn)} />
            <Input style={{ gridArea: 'ST' }} name="status" label="STATUS" value={receipt.status} />
            <Input style={{ gridArea: 'DT' }} name="details" label="OBSERVAÇÕES" value={receipt.details} />

            <div className="buttons">
              <Button type="submit" apparence="success">
                SALVAR
              </Button>

              <Button type="button" apparence="warning">
                EDITAR
              </Button>
            </div>
          </Form>
        )}
      </ReceiptsModal>
    </Modal>
  );
};
