import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export const AppMain = styled.main`
  height: calc(100%);
  width: 100%;
  transition: width 250ms ease;
  padding: 30px;  
  overflow-y: auto;
`;

export const AppContent = styled.section`
  height: 100%;
  width: 100%;
  max-width: 1140px;
  margin: 15px auto 0 auto;
  padding: 0 30px;
`;
