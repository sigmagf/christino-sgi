import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input } from '~/components/Form';
import { useLocalStorage, usePersistedState } from '~/hooks';
import { IUser, IUserAuth } from '~/interfaces';
import { api } from '~/utils/api';

import { LoginContainer } from './styles';

export const Login: React.FC = () => {
  document.title = 'Login | Christino';

  const storage = useLocalStorage();

  const { value: token, setValue: setToken } = usePersistedState('token', '');
  const [inLoading, setInLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(token && token.length > 1) {
      navigate('/');
    }
  }, [navigate, token]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setInLoading(true);

    try {
      const request = await api.post<IUserAuth>('/users/auth', {
        email: data.email,
        password: data.password,
      }, {
        headers: {
          authorization: `Bearer ${storage.getItem('token')}`,
        },
      });

      setToken(request.data.token);
      navigate('/');
    } catch(err) {
      if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else {
        toast.error(err.response.data.message);
      }
    }

    setInLoading(false);
  };

  return (
    <>
      <LoginContainer>
        <Card>
          {!inLoading ? (
            <>
              <img src="assets/logo-texto.png" alt="" />
              <div className="divider" />

              <Form onSubmit={onSubmit}>
                <Input style={{ gridArea: 'EM' }} name="email" label="E-MAIL" />
                <Input style={{ gridArea: 'PW' }} type="password" name="password" label="SENHA" />
                <Button style={{ gridArea: 'SB' }} type="submit" variant="success">
                  Entrar
                </Button>
              </Form>
            </>
          ) : (
            <ReactLoading type="bars" />
          )}
        </Card>
      </LoginContainer>
    </>
  );
};
