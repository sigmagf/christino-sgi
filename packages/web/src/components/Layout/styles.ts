import styled from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';

export const AppMain = styled.main`
  height: 100%;
  width: 100%;
  transition: width 250ms ease;
  padding: 30px;
  overflow-y: auto;
`;

export const AppContent = styled.section`
  height: calc(100% - 85px);
  width: 100%;
  max-width: 1080px;
  margin: 15px auto 0 auto;
`;
