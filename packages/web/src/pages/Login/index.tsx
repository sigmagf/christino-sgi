import { SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input } from '~/components/Form';
import { usePersistedState } from '~/hooks';
import { IUser, IUserAuth } from '~/interfaces';
import { api } from '~/services/api';

import { LoginContainer } from './styles';

export const Login: React.FC = () => {
  document.title = 'Login | Christino';

  const [token, setToken] = usePersistedState('token', '');
  const navigate = useNavigate();

  useEffect(() => {
    if(token !== '') {
      navigate('/');
    }
  }, [navigate, token]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    try {
      const request = await api.post<IUserAuth>('/users/login', {
        email: data.email,
        password: data.password,
      });

      setToken(request.data.token);
      navigate('/');
    } catch(err) {
      console.log(err);
    }
  };

  return (
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
          <Button style={{ gridArea: 'RT' }} type="reset" apparence="error">
            X
          </Button>
        </Form>
      </Card>
    </LoginContainer>
  );
};
