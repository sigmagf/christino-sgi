import React from 'react';

import { Sidenav } from '../Sidenav';
import { UserBar } from '../UserBar';

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Sidenav />
      <main>
        <UserBar />
        <section>
          { children }
        </section>
      </main>
    </>
  );
};
