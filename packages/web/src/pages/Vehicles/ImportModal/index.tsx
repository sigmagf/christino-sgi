import csv2json from 'csvtojson';
import React, { useState } from 'react';
import { FaEraser, FaTrash, FaUpload } from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Dropzone } from '~/components/Dropzone';
import { Modal } from '~/components/Modal';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { useLocalStorage } from '~/hooks';
import { IVehicle, IVehiclesImportCSV } from '~/interfaces';
import { api } from '~/utils/api';
import { withPagination } from '~/utils/withPagination';

import { ErrorsGroup, LoadingModal, TableResult } from './styles';

interface IImportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface IRequestError extends Omit<IVehicle, 'id'|'updated_at'|'created_at'|'client'> {
  error: string;
}

export const VehiclesImportModal: React.FC<IImportModalProps> = ({ isOpen, onClose }) => {
  const storage = useLocalStorage();

  const [vehiclesToImport, setVehiclesToImport] = useState<IVehiclesImportCSV[]>([]);
  const [vehiclesToImportTablePage, setVehiclesToImportTablePage] = useState(1);
  const [inLoading, setInLoading] = useState(false);
  const [requestErrorDetails, setRequestErrorDetails] = useState<IRequestError[]>([]);

  const vehiclesPagination = withPagination(vehiclesToImport, vehiclesToImportTablePage, 10);

  const onClearHandle = () => {
    setVehiclesToImport([]);
    setInLoading(false);
    setVehiclesToImportTablePage(1);
  };

  const onVehicleRemove = (renavam: string) => {
    setVehiclesToImport((old) => old.filter((el) => el.renavam !== renavam));
  };

  const onFileUploaded = (files: File[]) => {
    setRequestErrorDetails([]);
    onClearHandle();

    const reader = new FileReader();

    reader.onload = async (e) => {
      if(e.target) {
        const finalResult: IVehiclesImportCSV[] = await csv2json().fromString(e.target.result as string);
        setVehiclesToImport(finalResult.map((el) => ({
          name: (el.name || '').toUpperCase(),
          document: (el.document || '').toUpperCase(),
          group: el.group ? el.group.toUpperCase() : null,

          plate: (el.plate || '').toUpperCase(),
          renavam: el.renavam || '',
          crv: el.crv || null,
          brand_model: (el.brand_model || '').toUpperCase(),
          type: (el.type || '').toUpperCase(),
          details: (el.details || '').toUpperCase(),
          status: (el.status || '').toUpperCase(),
        })));
      }
    };

    reader.readAsText(files[0]);
  };

  const onSendHandle = async () => {
    setRequestErrorDetails([]);
    setInLoading(true);

    try {
      await api.post('/vehicles/import', { data: vehiclesToImport }, { headers: { authorization: `Bearer ${storage.getItem('token')}` } });

      toast.success('Arquivo enviado com sucesso!');
      onClose();
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);

        if(err.response.data.type === 'PARTIAL INVALID DATA') {
          setRequestErrorDetails(err.response.data.details);
        }
      } else {
        toast.error('Ocorreu um erro inesperado.');
        console.log(err);
      }
    }

    setInLoading(false);
    onClearHandle();
  };

  const onCloseHandle = () => {
    setRequestErrorDetails([]);
    onClearHandle();

    onClose();
  };

  const buttonsGroup = (
    <>
      <Button variant="success" onClick={onSendHandle} disabled={inLoading}>
        <FaUpload />&nbsp;&nbsp;&nbsp;Enviar lote
      </Button>
      <Button variant="error" onClick={onClearHandle} disabled={inLoading}>
        <FaEraser />&nbsp;&nbsp;&nbsp;Limpar
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCloseHandle}
      haveHeader={vehiclesToImport.length > 0}
      header={vehiclesToImport.length > 0 ? 'IMPORTACAO DE VEICULOS' : ''}
    >
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
        <Dropzone
          maxFiles={1}
          onDropAccepted={onFileUploaded}
        />
      ) : (
        <>
          {(vehiclesToImport.length !== 0) && (
            <TableResult>
              {inLoading && (
                <LoadingModal>
                  <ReactLoading type="bars" />
                </LoadingModal>
              )}

              <Table style={{ marginBottom: 15 }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>NOME</th>
                    <th>DOCUMENTO</th>
                    <th>PASTA</th>
                    <th>PLACA</th>
                    <th>RENAVAM</th>
                    <th>CRV</th>
                    <th>MARCA/MODELO</th>
                    <th>TIPO</th>
                    <th>DETALHES</th>
                    <th>STATUS</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiclesPagination.data.map((vehicle) => (
                    <tr key={vehicle.renavam}>
                      <td>{ vehicle.name }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.document }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.group }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.plate }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.renavam }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.crv }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.brand_model }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.type }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.details }</td>
                      <td style={{ textAlign: 'center' }}>{ vehicle.status }</td>
                      <td>
                        <Button
                          variant="error"
                          disabled={inLoading}
                          onClick={() => onVehicleRemove(vehicle.renavam)}
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Pagination
                inLoading={inLoading}
                currentPage={vehiclesToImportTablePage}
                totalPages={vehiclesPagination.page.total}
                onNumberClick={(n) => setVehiclesToImportTablePage(n)}
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
