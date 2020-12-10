import React from 'react';

import { Appnav } from '../Appnav';
import { AppContent, AppMain } from './styles';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Appnav />
      <AppMain>
        <AppContent>
          { children }
        </AppContent>
      </AppMain>
    </>
  );
};
