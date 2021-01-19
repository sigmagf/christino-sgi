import { transparentize } from 'polished';
import React, { useCallback, useState } from 'react';
import Dropzone from 'react-dropzone';
import {
  FaTimes as IconRemove,
  FaTrash as IconClear,
  FaUpload as IconUpload,
} from 'react-icons/fa';
import ReactLoading from 'react-loading';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

import { Button } from '~/components/Button';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { useLocalStorage } from '~/hooks';
import { IVehicle, IVehiclesImportJSON } from '~/interfaces';
import { api } from '~/utils/api';
import { readVehiclesImportFile } from '~/utils/readVehiclesImportFile';
import { withPagination } from '~/utils/withPagination';

import { DropContainer, ErrorsGroup, LoadingModal, TableResult, UploadMessage } from './styles';

interface IImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IRequestError extends Omit<IVehicle, 'id'|'updated_at'|'created_at'|'client'> {
  error: string;
}

Modal.setAppElement('#root');
export const VehicleImportModal: React.FC<IImportModalProps> = ({ isOpen, onClose }) => {
  const theme = useTheme();
  const storage = useLocalStorage();

  const [vehiclesToImport, setVehiclesToImport] = useState<IVehiclesImportJSON[]>([]);
  const [vehiclesToImportPage, setVehiclestoImportPage] = useState(1);
  const [inLoading, setInLoading] = useState(false);
  const [requestErrorDetails, setRequestErrorDetails] = useState<IRequestError[]>([]);

  const vehiclesPagination = withPagination(vehiclesToImport, vehiclesToImportPage, 10);

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

  const renderDragMessage = (isDragActive: boolean, isDragReject: boolean) => {
    if(!isDragActive) {
      return <UploadMessage>ARRASTE OU CLIQUE AQUI PARA ENVIAR O ARQUIVO</UploadMessage>;
    }

    if(isDragReject) {
      return <UploadMessage type="error">ARQUIVO NAO SUPORTADO</UploadMessage>;
    }

    return <UploadMessage type="success">SOLTE O ARQUIVO AQUI</UploadMessage>;
  };

  const onClearHandle = useCallback(() => {
    setVehiclesToImport([]);
    setInLoading(false);
    setVehiclestoImportPage(1);
  }, []);

  const onFileUploaded = useCallback((files: File[]) => {
    setRequestErrorDetails([]);
    onClearHandle();

    const reader = new FileReader();

    reader.onload = async (e) => {
      if(!e.target) {
        return;
      }

      const finalResult = await readVehiclesImportFile(e.target.result as string);
      setVehiclesToImport(finalResult);
    };

    reader.readAsText(files[0]);
  }, [onClearHandle]);

  const onSendHandle = useCallback(async () => {
    setRequestErrorDetails([]);
    setInLoading(true);

    try {
      await api.post('/vehicles/import', {
        data: vehiclesToImport,
      }, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      toast.success('Arquivo enviado com sucesso!');
    } catch(err) {
      if(err.message === 'Network Error' || !err.response) {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);

        if(err.response.data.type === 'PARTIAL INVALID DATA') {
          setRequestErrorDetails(err.response.data.details);
        }
      }
    }

    setInLoading(false);
    onClearHandle();
  }, [onClearHandle, vehiclesToImport, storage]);

  const onCloseHandle = () => {
    setRequestErrorDetails([]);
    onClearHandle();

    onClose();
  };

  const buttonsGroup = (
    <>
      <Button variant="error" onClick={onClearHandle} disabled={inLoading}>
        <IconClear />&nbsp;&nbsp;&nbsp;Limpar
      </Button>
      <Button variant="success" onClick={onSendHandle} disabled={inLoading}>
        <IconUpload />&nbsp;&nbsp;&nbsp;Enviar lote
      </Button>
    </>
  );

  return (
    <Modal isOpen={isOpen} onRequestClose={onCloseHandle} style={customStyles}>
      {requestErrorDetails.length !== 0 && (
        <ErrorsGroup>
          {requestErrorDetails.map((error) => (
            <details key={error.renavam}>
              <summary>{ `${error.plate} - ${error.renavam}` }</summary>
              <section>{ error.error }</section>
            </details>
          ))}
        </ErrorsGroup>
      )}

      {(vehiclesToImport.length === 0) ? (
        <Dropzone accept="text/csv" maxFiles={1} onDropAccepted={onFileUploaded} disabled={inLoading}>
          {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
            <DropContainer {...getRootProps()} isDragActive={isDragActive} isDragReject={isDragReject}>
              <input {...getInputProps()} />
              {renderDragMessage(isDragActive, isDragReject)}
            </DropContainer>
          )}
        </Dropzone>
      ) : (
        <>
          {(vehiclesToImport.length !== 0) && (
            <TableResult>
              {inLoading && (
                <LoadingModal>
                  <ReactLoading type="bubbles" />
                </LoadingModal>
              )}

              <Table style={{ marginBottom: 15, width: 1500 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', fontFamily: 'monospace' }}>NOME</th>
                    <th style={{ fontFamily: 'monospace' }}>DOCUMENTO</th>
                    <th style={{ fontFamily: 'monospace' }}>GRUPO</th>
                    <th style={{ fontFamily: 'monospace' }}>PLACA</th>
                    <th style={{ fontFamily: 'monospace' }}>RENAVAM</th>
                    <th style={{ fontFamily: 'monospace' }}>CRV</th>
                    <th style={{ fontFamily: 'monospace' }}>MARCA/MODELO</th>
                    <th style={{ fontFamily: 'monospace' }}>TIPO</th>
                    <th style={{ fontFamily: 'monospace' }}>DETALHES</th>
                    <th style={{ fontFamily: 'monospace' }}>STATUS</th>
                    <th style={{ fontFamily: 'monospace' }}>EMITIDO EM</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclesPagination.data.map((vehicle) => (
                    <tr key={vehicle.renavam}>
                      <td style={{ fontFamily: 'monospace' }}>{ vehicle.client.name }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.client.document }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.client.group }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.plate }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.renavam }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.crv }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.brand_model }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.type }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.details }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.status }</td>
                      <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ vehicle.issued_on }</td>
                      <td>
                        <Button
                          variant="error"
                          disabled={inLoading}
                          onClick={() => setVehiclesToImport((old) => old.filter((el) => el.renavam !== vehicle.renavam))}
                        >
                          <IconRemove />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination
                inLoading={inLoading}
                currentPage={vehiclesToImportPage}
                totalPages={vehiclesPagination.page.total}
                onNumberClick={(n) => setVehiclestoImportPage(n)}
                onMaxResultsChange={() => {}}
                overrideMaxResultsBy={buttonsGroup}
              />
            </TableResult>
          )}
        </>
      )}
    </Modal>
  );
};
