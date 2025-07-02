import { useState } from 'react';
import FormMovimiento from '../components/FormMovimiento';
import ListaMovimientos from '../components/ListaMovimientos';
import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [movimientos, setMovimientos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarMovimiento = (nuevoMovimiento) => {
    setMovimientos([...movimientos, { ...nuevoMovimiento, id: Date.now() }]);
  };

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1>Sistema de Control de Movimientos - UTI</h1>
        
        <button 
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
          className={styles.button}
        >
          {mostrarFormulario ? 'Ocultar Formulario' : 'Nuevo Movimiento'}
        </button>

        {mostrarFormulario && (
          <FormMovimiento 
            agregarMovimiento={agregarMovimiento} 
            setMostrarFormulario={setMostrarFormulario}
          />
        )}

        <ListaMovimientos movimientos={movimientos} />
      </main>
    </div>
  );
}