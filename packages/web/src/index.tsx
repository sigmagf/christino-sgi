import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import ReactLoading from 'react-loading';
import { Navigate, RouteProps } from 'react-router';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { GlobalStyle } from '~/styles/global';

import { useLocalStorage } from './hooks';
import { HomePage } from './pages/Home';
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
    <>
      <BrowserRouter>
        <Routes>

          <PrivateRoute path="/" element={<HomePage />} />

          <Route path="*" element={<h1>404 - not found </h1>} />
        </Routes>
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

render(<App />, document.getElementById('root'));
