import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import ReactLoading from 'react-loading';
import { Navigate, RouteProps } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { GlobalStyle } from '~/styles/global';
import { theme } from '~/styles/theme';

import { StyledToastContainer } from './components/StyledToastContainer';
import { useLocalStorage } from './hooks';
import { NotFoundErrorPage } from './pages/404';
import { CRVsPage } from './pages/CRVs';
import { HomePage } from './pages/Home';
import { Login } from './pages/Login';
import { isAuthenticated } from './services/isAuthenticated';

const PrivateRoute: React.FC<RouteProps> = ({ element, ...rest }) => {
  const storage = useLocalStorage();
  const [isAuth, setIsAuth] = useState(-1);

  useEffect(() => {
    const revalid = async () => {
      const response = await isAuthenticated(storage);

      setIsAuth(!response ? 0 : 1);
    };

    revalid();
  }, [storage]);

  if(isAuth === -1) {
    return (

      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
      >
        <ReactLoading type="bars" />
      </div>
    );
  }

  if(isAuth === 0) {
    return <><Navigate to="/login" replace /></>;
  }

  return <Route {...rest} element={element} />;
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <PrivateRoute path="/" element={<HomePage />} />
          <PrivateRoute path="/crvs" element={<CRVsPage />} />

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

render(<App />, document.getElementById('root'));
