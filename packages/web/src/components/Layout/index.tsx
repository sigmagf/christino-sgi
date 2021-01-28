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
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 75 }}>
          CHRISTINO SISTEMA DE GESTAO INTERNO v0.0.11r1
        </div>
      </AppContent>
    </AppMain>
  </>
);
