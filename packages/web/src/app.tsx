import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '~/styles/global';
import { theme } from '~/styles/theme';

import { StyledToastContainer } from './components/StyledToastContainer';
import { NotFoundErrorPage } from './pages/404';
import { HomePage } from './pages/Home';
import { Login } from './pages/Login';
import { VehiclesPage } from './pages/Vehicles';
import { SecureRoute } from './utils/secureRoute';

export const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <SecureRoute path="/" element={<HomePage />} />
        <SecureRoute path="/vehicles" element={<VehiclesPage />} />

        <Route path="*" element={<NotFoundErrorPage />} />
      </Routes>
    </BrowserRouter>

    <StyledToastContainer
      pauseOnHover
      newestOnTop
      position="top-center"
      limit={5}
      autoClose={10000}
    />
    <GlobalStyle />
  </ThemeProvider>
);
