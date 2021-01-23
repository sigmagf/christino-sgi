import React from 'react';

import { Button } from '~/components/Button';
import { Input } from '~/components/Form';
import { Modal } from '~/components/Modal';

import { DetailsModalContainer } from './styles';

interface IDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VehiclesDetailsModal: React.FC<IDetailsModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} header="CADASTRO/ALTERACAO DE VEICULOS">
      <DetailsModalContainer onSubmit={(data) => console.log(data)}>
        <Input style={{ gridArea: 'CN' }} name="name" label="NOME" />
        <Input style={{ gridArea: 'CD' }} name="document" label="DOCUMENTO" defaultValue="12.123.456/0001-01" />
        <Input style={{ gridArea: 'CG' }} name="group" label="GRUPO" />

        <hr style={{ gridArea: 'HR' }} />

        <Input style={{ gridArea: 'VP' }} name="group" label="PLACA" defaultValue="ABC-1234" />
        <Input style={{ gridArea: 'VR' }} name="group" label="RENAVAM" defaultValue="12345678911" />
        <Input style={{ gridArea: 'VC' }} name="group" label="CRV" defaultValue="123456789111" />
        <Input style={{ gridArea: 'VM' }} name="group" label="MARCA/MODELO" defaultValue="GM/CHEVROLET D20 CUSTOM S" />
        <Input style={{ gridArea: 'VT' }} name="group" label="TIPO" />
        <Input style={{ gridArea: 'VS' }} name="group" label="STATUS" />

        <div className="action-buttons" style={{ gridArea: 'AB' }}>
          <Button variant="success">
            SALVAR
          </Button>
          <Button variant="error">
            EXCLUIR
          </Button>
        </div>
      </DetailsModalContainer>
    </Modal>
  );
};
