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
import { Input, Select } from '~/components/Form';
import { ICRV } from '~/interfaces';
import { theme } from '~/styles/theme';

import { ReceiptsModal } from './styles';

interface IEditModalProps {
  isOpen: boolean;
  crv?: ICRV;
  onClose: () => void;
}

Modal.setAppElement('#root');
export const CRVModal: React.FC<IEditModalProps> = ({ crv, isOpen, onClose }) => {
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

  const onCloseHandle = () => {
    setIsEditing(false);
    onClose();
  };

  const onSubmit: SubmitHandler<ICRV> = (data) => {
    setIsEditing(false);
    console.log(data);
  };

  const statusOptions = [
    { value: '0', label: 'BAIXADO' },
    { value: '1', label: 'ORIGINAL' },
    { value: '2', label: 'XEROX' },
    { value: '3', label: 'OUTRO' },
  ];

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
          <Button apparence="error" onClick={onCloseHandle}>
            <IconClose />
          </Button>
        </div>
        {crv && (
          <Form ref={formRef} onSubmit={onSubmit}>
            <Scope path="client">
              <Input style={{ gridArea: 'CL' }} name="name" label="NOME" value={crv.client.name || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'CD' }} name="document" label="DOCUMENTO" value={crv.client.document || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'GP' }} name="group" label="GRUPO" value={crv.client.group || ''} disabled={!isEditing} />
            </Scope>

            <Scope path="vehicle">
              <Input style={{ gridArea: 'PL' }} name="plate" label="PLACA" value={crv.vehicle.plate || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'RN' }} name="renavam" label="RENAVAM" value={crv.vehicle.renavam || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'MM' }} name="brandModel" label="MARCA/MODELO" value={crv.vehicle.brandModel || ''} disabled={!isEditing} />
              <Input style={{ gridArea: 'TP' }} name="type" label="TIPO" value={crv.vehicle.type || ''} disabled={!isEditing} />
            </Scope>

            <Input style={{ gridArea: 'EM' }} name="issuedOn" label="EMITIDO EM" value={formatDate(crv.issuedOn)} disabled={!isEditing} />
            <Select
              style={{ gridArea: 'ST' }}
              options={statusOptions}
              name="status"
              label="STATUS"
              value={statusOptions[crv.status || '1']}
              isDisabled={!isEditing}
            />
            <Input style={{ gridArea: 'DT' }} name="details" label="OBSERVAÇÕES" value={crv.details || ''} disabled={!isEditing} />

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
