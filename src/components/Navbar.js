import React from 'react';

const Navbar = () => {
  return (
    <nav style={{ 
      padding: '1rem', 
      background: '#0070f3', 
      color: 'white',
      marginBottom: '2rem',
      display: 'flex',      
    }}>
      <h1 style={{ margin: 0 }}>Control de Movimientos UTI</h1>
    </nav>
  );
};

export default Navbar;