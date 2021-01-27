import React from 'react';

import { Appnav } from '../Appnav';
import { UserBar } from '../UserBar';
import { AppContent, AppMain } from './styles';

export const Layout: React.FC = ({ children }) => (
  <>
    <Appnav />
    <AppMain>
      <UserBar />
      <AppContent>
        { children }
        <div style={{ marginTop: 15, textAlign: 'center', height: 30 }}>
          CHRISTINO SISTEMA DE GESTAO INTERNO v0.0.1
        </div>
      </AppContent>
    </AppMain>
  </>
);
