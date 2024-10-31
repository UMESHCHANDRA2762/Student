import React from 'react';
import Navbar from './navbar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;
