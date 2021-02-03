import React from 'react';
import { isMobile } from 'react-device-detect';
import { FaExclamationTriangle } from 'react-icons/fa';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '~/styles/global';
import { theme } from '~/styles/theme';

import { StyledToastContainer } from './components/StyledToastContainer';
import { NotFoundErrorPage } from './pages/404';
import { ClientsPage } from './pages/Clients';
import { HomePage } from './pages/Home';
import { Login } from './pages/Login';
import { VehiclesPage } from './pages/Vehicles';
import { WorksPage } from './pages/Works';
import { SecureRoute } from './utils/secureRoute';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      {isMobile ? (
        <div className="in-mobile">
          <div>
            <FaExclamationTriangle size={200} />
            <h1>
              SISTEMA NÃO DISPONIVEL
            </h1>
            <h6>
              O sistema deve ser acessado pelo computador, agradecemos a compreenção!
            </h6>
          </div>
        </div>
      ) : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />

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
        </>
      )}
      <GlobalStyle />
    </ThemeProvider>
  );
};
