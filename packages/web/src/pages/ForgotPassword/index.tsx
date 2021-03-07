import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';

import ChristinoLogo from '~/assets/logo-texto.png';
import { useLocalStorage } from '~/hooks';
import { Button } from '~/interface/Button';
import { Card } from '~/interface/Card';
import { Input } from '~/interface/Form';
import { IUserAuth } from '~/interfaces';
import { api } from '~/utils/api';
import { handleHTTPRequestError } from '~/utils/handleHTTPRequestError';

import { LoginContainer } from './styles';

export const ForgotPasswordPage: React.FC = () => {
  document.title = 'Recuperar Senha | Christino';

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

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    setInLoading(true);

    try {
      const schema = yup.object().shape({
        email: yup.string().email('E-mail inválido!').required('O e-mail é obrigatório!'),
      });
      await schema.validate(data, { abortEarly: false });

      await api.post<IUserAuth>('/users/forgotPassword', data);
      storage.setItem('token', null);
      storage.setItem('userName', null);
      toast.success('Verifique seu e-mail para dar continuidade a recuperação de senha!');
      navigate('/login');
    } catch(err) {
      if(err instanceof yup.ValidationError) {
        err.inner.forEach((error) => toast.error(error.message));
      } else {
        handleHTTPRequestError(err);
      }
    }

    setInLoading(false);
  };

  return (
    <LoginContainer>
      {!inLoading ? (
        <Card>
          <img src={ChristinoLogo} alt="" />
          <div className="divider" />

          <Form ref={formRef} onSubmit={onSubmit}>
            <Input style={{ gridArea: 'EM' }} name="email" label="E-MAIL" />
            <Button style={{ gridArea: 'BB' }} type="button" variant="warning" onClick={() => navigate('/login')}>
              Voltar
            </Button>
            <Button style={{ gridArea: 'SB' }} type="submit" variant="success">
              Enviar
            </Button>
          </Form>
        </Card>
      ) : (
        <ReactLoading type="bars" />
      )}
    </LoginContainer>
  );
};
