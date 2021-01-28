import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import { Button } from '~/components/Button';
import { Card } from '~/components/Card';
import { Input } from '~/components/Form';
import { useLocalStorage } from '~/hooks';
import { IUser, IUserAuth } from '~/interfaces';
import { api } from '~/utils/api';

import { LoginContainer } from './styles';

export const Login: React.FC = () => {
  document.title = 'Login | Christino';

  const formRef = useRef<FormHandles>(null);
  const storage = useLocalStorage();
  const [inLoading, setInLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(storage.getItem('token')) {
      navigate('/');
    }
  }, [navigate, storage]);

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setInLoading(true);

    try {
      const schema = yup.object().shape({
        email: yup.string().required('O e-mail é obrigatório!'),
        password: yup.string().required('A senha é obrigatória!'),
      });
      await schema.validate(data, { abortEarly: false });

      const request = await api.post<IUserAuth>('/users/auth', data);
      storage.setItem('token', request.data.token);
      storage.setItem('userName', request.data.user.name);
      navigate('/');
    } catch(err) {
      if(err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          toast.error(error.message);
        });
      } else if(err.message === 'Network Error') {
        toast.error('Verifique sua conexão com a internet.');
      } else if(err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error('Ocorreu um erro inesperado');
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

              <Form ref={formRef} onSubmit={onSubmit}>
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
