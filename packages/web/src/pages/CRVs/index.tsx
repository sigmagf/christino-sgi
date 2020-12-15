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
import { IPagination, ICRV, ICRVFilter } from '~/interfaces';
import { api } from '~/services/api';
import { toQueryString } from '~/utils/toQueryString';
import { translateTranslateMessages } from '~/utils/translateBackendMessages';

import { CRVsFilters } from './Filters';
import { CRVModal } from './Modal';

export const CRVsPage: React.FC = () => {
  document.title = 'CRVs | Christino';

  const storage = useLocalStorage();
  const navigate = useNavigate();

  const [inLoading, setInLoading] = useState(false);
  const [qsFilter, setQSFilter] = useState<ICRVFilter>();

  const [crvs, setCrvs] = useState<IPagination<ICRV>>();
  const [crvModalOpen, setCrvModalOpen] = useState(false);
  const [crvToModal, setCrvToModal] = useState<ICRV>();

  const getData = useCallback(async (page = 1, limit: number) => {
    const qs: string[] = [];

    if(qsFilter) {
      (toQueryString(qsFilter.client, false, 1) as string[]).forEach((e) => { qs.push(e); });
      (toQueryString(qsFilter.vehicle, false, 1) as string[]).forEach((e) => { qs.push(e); });
      (toQueryString({ status: qsFilter.status }, false, 1) as string[]).forEach((e) => { qs.push(e); });
    }

    setInLoading(true);
    try {
      const request = await api.get(`/crvs?page=${page}&limit=${limit}&${qs.join('&')}`, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      setCrvs(request.data);
    } catch(err) {
      if(err.response.status === 401) {
        storage.setItem('token', null);
        navigate('/login');
      }

      toast.error(translateTranslateMessages(err.response.data.message));
    }
    setInLoading(false);
  }, [navigate, qsFilter, storage]);

  const onModalOpen = (data: ICRV) => {
    setCrvModalOpen(true);
    setCrvToModal(data);
  };

  const onModalClose = () => {
    setCrvModalOpen(false);
    setCrvToModal(undefined);
  };

  const onChangePage = (n: number) => {
    getData(n, crvs?.page.limit || 10);
  };

  const onMaxResultsChange = (maxResults: number) => {
    if(maxResults !== (crvs?.page.limit || 10)) {
      getData(1, maxResults);
    }
  };

  const onApplyFilters = (data: ICRVFilter) => {
    setQSFilter(data);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getData(1, 10); }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { getData(1, 10); }, [qsFilter]);

  return (
    <>
      <Layout>
        <Card style={{ margin: '15px 0' }}>
          <CRVsFilters onFilterSubmit={onApplyFilters} />
        </Card>

        <Card style={{ position: 'relative' }}>
          {inLoading && (
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
          )}
          <Table>
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
                <tr key={crv.vehicle.id + crv.client.id}>
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
            onNumberClick={onChangePage}
            onMaxResultsChange={onMaxResultsChange}
          />
        </Card>
      </Layout>

      <CRVModal isOpen={crvModalOpen} crv={crvToModal} onClose={onModalClose} />
    </>
  );
};
