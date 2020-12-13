import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export const AppMain = styled.main`
  height: 100%;
  width: 100%;
  transition: width 250ms ease;
  overflow-y: auto;
`;

export const AppContent = styled.section`
  height: calc(100% - 60px - 85px);
  width: 100%;
  max-width: 1140px;
  margin: 15px auto 30px auto;
  padding: 0 30px;
`;

export const AlertContent = styled.section`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
