import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '~/styles/global';
import { theme } from '~/styles/theme';

import { StyledToastContainer } from './components/StyledToastContainer';
import { NotFoundErrorPage } from './pages/404';
import { ClientsPage } from './pages/Clients';
import { HomePage } from './pages/Home';
import { LoginPage } from './pages/Login';
import { ResetPasswordPage } from './pages/ResetPassword';
import { VehiclesPage } from './pages/Vehicles';
import { WorksPage } from './pages/Works';
import { SecureRoute } from './utils/secureRoute';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/resetPassword/:token" element={<ResetPasswordPage />} />

          <SecureRoute path="/" element={<HomePage />} />
          <SecureRoute path="/vehicles" element={<VehiclesPage />} />
          <SecureRoute path="/clients" element={<ClientsPage />} />
          <SecureRoute path="/works" element={<WorksPage />} />

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
};
