import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import React, { useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from 'react-router-dom';
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

export const ResetPasswordPage: React.FC = () => {
  document.title = 'Recuperar Senha | Christino';

  /* - VARIABLES INSTANTIATE AND USER PERMISSIONS - */
  const { token } = useParams();
  const storage = useLocalStorage();
  const navigate = useNavigate();
  /* END VARIABLES INSTANTIATE AND USER PERMISSIONS */

  /* - DATA STATE AND REFS - */
  const formRef = useRef<FormHandles>(null);
  /* END DATA STATE AND REFS */

  /* - BOOLEAN STATES - */
  const [inLoading, setInLoading] = useState(false);
  /* END BOOLEAN STATES */

  const onSubmit: SubmitHandler<{ token: string; email: string; password: string; password2: string }> = async (data) => {
    setInLoading(true);

    try {
      const schema = yup.object().shape({
        token: yup.string().required('Token inválido!'),
        email: yup.string().email('E-mail inválido!').required('O e-mail é obrigatório!'),
        password: yup.string().required('A senha é obrigatória!'),
        password2: yup.string().required('A confirmação da senha é obrigatória!'),
      });
      await schema.validate(data, { abortEarly: false });

      if(data.password !== data.password2) {
        toast.error('As senhas não coincidem!');
        return;
      }

      await api.post<IUserAuth>('/users/resetPassword', data);
      storage.setItem('token', null);
      storage.setItem('userName', null);
      toast.success('Senha recuperada com sucesso!');
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
            <Input style={{ gridArea: 'HD' }} name="token" label="TOKEN" disabled defaultValue={token} />
            <Input style={{ gridArea: 'EM' }} name="email" label="E-MAIL" />
            <Input type="password" style={{ gridArea: 'P1' }} name="password" label="SENHA" />
            <Input type="password" style={{ gridArea: 'P2' }} name="password2" label="CONFIRMAÇÃO DA SENHA" />
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
