import React from 'react';

import { Appnav } from '../Appnav';
import { UserBar } from '../UserBar';
import { AppContent, AppMain } from './styles';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Appnav />
      <AppMain>
        <UserBar />
        <AppContent>
          { children }
        </AppContent>
      </AppMain>
    </>
  );
};
