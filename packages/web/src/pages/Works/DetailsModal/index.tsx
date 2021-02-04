import { FormHandles } from '@unform/core';
import React, { useRef, useState } from 'react';

import { Input } from '~/components/Form';
import { Modal } from '~/components/Modal';
import { IWork } from '~/interfaces';

import { DetailsForm } from './styles';

interface IDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  work?: IWork;
  workPermission: number;
}

export const WorkDetailsModal: React.FC<IDetailsModalProps> = ({ isOpen, onClose, work, workPermission }) => {
  const formRef = useRef<FormHandles>(null);

  const [inLoading] = useState(false);
  const [editing] = useState(true);
  const [haveClient] = useState(true);
  const [clientSearched] = useState(false);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} shouldCloseOnEsc={false} shouldCloseOnOverlayClick={false} header="ORDEM DE SERVIÇO">
      <DetailsForm ref={formRef} onSubmit={console.log} initialData={work && { ...work.client, ...work.sector }}>
        <Input
          disabled={inLoading || !editing || haveClient}
          name="name"
          label="NOME"
        />
        <Input
          disabled={inLoading || !editing || clientSearched}
          name="document"
          label="DOCUMENTO"
          maxLength={14}
          onFocus={() => console.log('bla')}
          onBlur={() => console.log('bla')}
        />
        <Input
          disabled={inLoading || !editing || haveClient}
          name="group"
          label="GRUPO"
        />

        <hr />

        <Input
          disabled
          name="sector"
          label="SETOR"
        />
        <Input
          disabled={inLoading || !editing}
          name="renavam"
          label="RENAVAM"
          maxLength={11}
        />
        <Input
          disabled={inLoading || !editing}
          name="crv"
          label="CRV"
          maxLength={12}
        />
        <Input
          disabled={inLoading || !editing}
          name="brand_model"
          label="MARCA/MODELO"
        />
        <Input
          disabled={inLoading || !editing}
          name="type"
          label="TIPO"
        />
        <Input
          disabled={inLoading || !editing}
          name="status"
          label="STATUS"
        />
        <Input
          disabled={inLoading || !editing}
          name="details"
          label="DETALHES"
        />
      </DetailsForm>
    </Modal>
  );
};
