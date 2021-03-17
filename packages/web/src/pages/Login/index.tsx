import { IUser } from '@christino-sgi/common';
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useEffect, useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import ChristinoLogo from '~/assets/logo-texto.png';
import { useLocalStorage } from '~/hooks';
import { Button } from '~/components/UI/Button';
import { Card } from '~/components/UI/Card';
import { Input } from '~/components/UI/Form';
import { IUserAuth } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

import { LoginContainer } from './styles';

export const LoginPage: React.FC = () => {
  document.title = 'Login | Christino';

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const storage = useLocalStorage();
  const navigate = useNavigate();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const formRef = useRef<FormHandles>(null);
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoading, setInLoading] = useState(false);
  /* END BOOLEAN STATES */

  const onSubmit: SubmitHandler<IUser> = async (data) => {
    setInLoading(true);

    try {
      const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido!').required('O e-mail é obrigatório!'),
        password: yup.string().required('A senha é obrigatória!'),
      });
      await schema.validate(data, { abortEarly: false });

      const request = await api.post<IUserAuth>('/users/login', data);
      storage.setItem('token', request.data.token);
      storage.setItem('userName', request.data.user.name);
      navigate('/');
    } catch(err) {
      if(err instanceof yup.ValidationError) {
        err.inner.forEach((error) => toast.error(error.message));
      } else {
        handleHTTPRequestError(err);
      }
    }

    setInLoading(false);
  };

  useEffect(() => {
    if(storage.getItem('token')) {
      navigate('/');
    }
  }, [navigate, storage]);

  return (
    <LoginContainer>
      {!inLoading ? (
        <Card>
          <img src={ChristinoLogo} alt="" />
          <div className="divider" />

          <Form ref={formRef} onSubmit={onSubmit}>
            <Input style={{ gridArea: 'EM' }} name="email" label="E-MAIL" />
            <Input style={{ gridArea: 'PW' }} type="password" name="password" label="SENHA" />
            <Button style={{ gridArea: 'SB' }} type="submit" variant="success">
              Entrar
            </Button>
          </Form>
          <div className="forgot-password">
            <Button type="button" onClick={() => navigate('/forgotPassword')}>ESQUECI MINHA SENHA</Button>
          </div>
        </Card>
      ) : (
        <ReactLoading type="bars" />
      )}
    </LoginContainer>
  );
};
