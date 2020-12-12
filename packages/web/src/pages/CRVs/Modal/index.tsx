/* eslint-disable max-len */
import { FormHandles, Scope, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { transparentize } from 'polished';
import React, { useRef, useState } from 'react';
import {
  FaTimes as IconClose,
} from 'react-icons/fa';
import Modal from 'react-modal';

import { Button } from '~/components/Button';
import { Input } from '~/components/Form';
import { ICRV } from '~/interfaces';
import { theme } from '~/styles/theme';

import { ReceiptsModal } from './styles';

interface IEditModalProps {
  isOpen: boolean;
  receipt?: ICRV;
  onClose: () => void;
}

Modal.setAppElement('#root');
export const CRVModal: React.FC<IEditModalProps> = ({ receipt, isOpen, onClose }) => {
  const formRef = useRef<FormHandles>(null);

  const [isEditing, setIsEditing] = useState(false);

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

  const onEditButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    setIsEditing(true);
  };

  const onSubmit: SubmitHandler<ICRV> = (data) => {
    console.log(data);
    setIsEditing(false);
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
          <Form ref={formRef} onSubmit={onSubmit}>
            <Input type="hidden" name="id" value={receipt.id || ''} disabled={!isEditing} />

            <Scope path="client">
              <Input style={{ gridArea: 'CL' }} name="name" label="NOME" value={receipt.client.name || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'CD' }} name="document" label="DOCUMENTO" value={receipt.client.document || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'GP' }} name="group" label="GRUPO" value={receipt.client.group || ''} disabled={!isEditing} />
            </Scope>

            <Scope path="vehicle">
              <Input style={{ gridArea: 'PL' }} name="plate" label="PLACA" value={receipt.vehicle.plate || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'RN' }} name="renavam" label="RENAVAM" value={receipt.vehicle.renavam || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'MM' }} name="brandModel" label="MARCA/MODELO" value={receipt.vehicle.brandModel || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'TP' }} name="type" label="TIPO" value={receipt.vehicle.type || ''} disabled={!isEditing} />
            </Scope>

            <Input style={{ gridArea: 'EM' }} name="issuedOn" label="EMITIDO EM" value={formatDate(receipt.issuedOn)} disabled={!isEditing} />
            <Input style={{ gridArea: 'ST' }} name="status" label="STATUS" value={receipt.status || '1'} disabled={!isEditing} />
            <Input style={{ gridArea: 'DT' }} name="details" label="OBSERVAÇÕES" value={receipt.details || ''} disabled={!isEditing} />

            <div className="buttons">
              {isEditing ? (
                <Button type="submit" apparence="success">
                  SALVAR
                </Button>
              ) : (
                <Button type="button" apparence="warning" onClick={onEditButtonClick}>
                  EDITAR
                </Button>
              )}
            </div>
          </Form>
        )}
      </ReceiptsModal>
    </Modal>
  );
};
