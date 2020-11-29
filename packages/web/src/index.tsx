import React from 'react';
import { render } from 'react-dom';
import { Navigate, RouteProps } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '~/styles/global';
import { theme } from '~/styles/theme';

import { useAuthentication } from './hooks';
import { NotFoundError } from './pages/404';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Receipts } from './pages/Receipts';

const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  return <Route {...rest} element={useAuthentication() ? element : <Navigate to="/login" replace />} />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <PrivateRoute path="/" element={<Home />} />
          <PrivateRoute path="/recibos" element={<Receipts />} />

          <Route path="*" element={<NotFoundError />} />
        </Routes>
      </BrowserRouter>

      <GlobalStyle />
    </ThemeProvider>
  );
};

render(<App />, document.getElementById('root'));
