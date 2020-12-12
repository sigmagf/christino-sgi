import React, { useState, useEffect, useCallback } from 'react';
import {
  FaSearch as IconSearch,
} from 'react-icons/fa';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Layout } from '~/components/Layout';
import { Pagination } from '~/components/Pagination';
import { Table } from '~/components/Table';
import { useLocalStorage } from '~/hooks';
import { IPagination, ICRV } from '~/interfaces';
import { api } from '~/services/api';
import { translateTranslateMessages } from '~/utils/translateBackendMessages';

import { CRVsFilters } from './Filters';
import { CRVModal } from './Modal';

export const CRVsPage: React.FC = () => {
  document.title = 'CRVs | Christino';

  const storage = useLocalStorage();
  const navigate = useNavigate();

  const [inLoading, setInLoading] = useState(false);

  const [crvs, setCrvs] = useState<IPagination<ICRV>>();
  const [modasIsOpen, setModalIsOpen] = useState(false);
  const [crvToModal, setCrvToModal] = useState<ICRV>();

  const getData = useCallback(async (page = 1, limit = 10, filters?: Pick<ICRV, 'client'|'vehicle'>) => {
    let filtersStr = '';
    if(filters) {
      const { client, vehicle } = filters;

      filtersStr = client.name ? `&name=${encodeURIComponent(client.name.toUpperCase())}` : '';
      filtersStr += client.group ? `&group=${encodeURIComponent(client.group.toUpperCase())}` : '';

      filtersStr += vehicle.plate ? `&plate=${encodeURIComponent(vehicle.plate.toUpperCase())}` : '';
      filtersStr += vehicle.renavam ? `&renavam=${encodeURIComponent(vehicle.renavam.toUpperCase())}` : '';
      filtersStr += vehicle.brandModel ? `&brandModel=${encodeURIComponent(vehicle.brandModel.toUpperCase())}` : '';
    }

    try {
      setInLoading(true);
      const request = await api.get(`/crvs?page=${page}&limit=${limit}${filtersStr}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      setCrvs(request.data);
      setInLoading(false);
    } catch(err) {
      if(err.response.status === 401) {
        storage.setItem('token', null);
        navigate('/login');
      }

      toast.error(translateTranslateMessages(err.response.data.message));
    }
  }, [navigate, storage]);

  const onModalOpen = (dt: ICRV) => {
    setModalIsOpen(true);
    setCrvToModal(dt);
  };

  const onModalClose = () => {
    setModalIsOpen(false);
    setCrvToModal(undefined);
  };

  const onPaginationClick = (n: number) => {
    getData(n);
  };

  const onPaginationMaxResultsClick = (maxResults: number) => {
    if(maxResults !== crvs?.page.limit) {
      getData(1, maxResults);
    }
  };

  const onApplyFilters = (data: Pick<ICRV, 'client'|'vehicle'>) => {
    getData(1, 10, data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getData(); }, []);

  return (
    <>
      <Layout>
        <Card style={{ margin: '15px 0' }}>
          <CRVsFilters onFilterSubmit={onApplyFilters} />
        </Card>

        <Card>
          <Table style={{ position: 'relative' }}>
            <thead>
              <tr>
                <th style={{ fontFamily: 'monospace', width: 500, textAlign: 'left' }}>CLIENTE</th>
                <th style={{ fontFamily: 'monospace', width: 85 }}>PLACA</th>
                <th style={{ fontFamily: 'monospace' }}>MARCA/MODELO</th>
                <th style={{ fontFamily: 'monospace', width: 40 }} />
              </tr>
            </thead>
            <tbody>
              {inLoading && (
                <>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>
                  <tr><td colSpan={4} /></tr>

                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    marginTop: 25,
                  }}
                  >
                    <ReactLoading type="bars" />
                  </div>
                </>
              )}

              {(!inLoading && !crvs) && (
                <tr>
                  <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>
                    NENHUM CRV ENCONTRADO
                  </td>
                </tr>
              )}

              {(!inLoading && crvs) && crvs.data.map((crv) => (
                <tr key={crv.id}>
                  <td style={{ fontFamily: 'monospace', maxWidth: 500 }}>{ crv.client.name }</td>
                  <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ crv.vehicle.plate }</td>
                  <td style={{ fontFamily: 'monospace', textAlign: 'center' }}>{ crv.vehicle.brandModel }</td>
                  <td>
                    <Button type="button" onClick={() => onModalOpen(crv)}>
                      <IconSearch />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card>

        <Card style={{ margin: '15px 0' }}>
          <Pagination
            currentPage={crvs ? crvs.page.current : 1}
            totalPages={crvs ? crvs.page.total : 1}
            inLoading={inLoading}
            onNumberClick={onPaginationClick}
            onMaxResultsChange={onPaginationMaxResultsClick}
          />
        </Card>
      </Layout>

      <CRVModal isOpen={modasIsOpen} receipt={crvToModal} onClose={onModalClose} />
    </>
  );
};
