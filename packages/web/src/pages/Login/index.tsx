import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input } from '~/components/Form';
import { usePersistedState } from '~/hooks';
import { IUser, IUserAuth } from '~/interfaces';
import { api } from '~/services/api';
import { translateTranslateMessages } from '~/utils/translateBackendMessages';

import { LoginContainer } from './styles';

export const Login: React.FC = () => {
  document.title = 'Login | Christino';

  const [token, setToken] = usePersistedState('token', '');
  const navigate = useNavigate();

  useEffect(() => {
    if(token && token.length > 1) {
      navigate('/');
    }
  }, [navigate, token]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const request = await api.post<IUserAuth>('/users/auth', {
        email: data.email,
        password: data.password,
      });

      if(request.status < 300 && request.status >= 200) {
        setToken(request.data.token);
        navigate('/');
      }
    } catch(err) {
      toast.error(translateTranslateMessages(err.response.data.message || 'Erro inesperado.'));
    }
  };

  return (
    <>
      <LoginContainer>
        <Card>
          <img src="assets/logo-texto.png" alt="" />
          <div className="divider" />

          <Form onSubmit={onSubmit}>
            <Input style={{ gridArea: 'EM' }} name="email" label="E-MAIL" />
            <Input style={{ gridArea: 'PW' }} type="password" name="password" label="SENHA" />
            <Button style={{ gridArea: 'SB' }} type="submit" apparence="success">
              Entrar
            </Button>
          </Form>
        </Card>
      </LoginContainer>
    </>
  );
};
