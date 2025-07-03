import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import FormMovimiento from '../components/FormMovimiento';
import ListaMovimientos from '../components/ListaMovimientos';
import Navbar from '../components/Navbar';
import { obtenerMovimientos } from '@/services/movimientosService';
import styles from '../styles/Home.module.css';
import { obtenerMovimientosUsuario } from '../services/movimientosService';
//import { agregarMovimiento } from './services/movimientosService'

export default function Home() {
  const [movimientos, setMovimientos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Cargar los movimientos al iniciar la aplicación
  // Aquí podrías agregar un spinner o mensaje de carga si lo deseas

/*export default function ListaMovimientos() {
  const [movimientos, setMovimientos] = useState([]);
  const [error, setError] = useState('');*/
  
  useEffect(() => {
    const cargarMovimientos = async () => {
      try {
        if (!auth.currentUser) {
          setError("Debe iniciar sesión para ver los movimientos");
          setCargando(false);
          return;
        }

        const datos= await obtenerMovimientosUsuario();
        setCargando(false);
        setMovimientos(datos);
      } catch (error) {
        console.error("Error al cargar los movimientos:", error);
        setError("Error al cargar los movimientos");
      } finally {
        setCargando(false);
      }
    };
    cargarMovimientos();
  }, []);
        /*const movimientosData = await obtenerMovimientos();
        setMovimientos(movimientosData);
      } catch (error) {
        console.error("Error al cargar los movimientos:", error);
      } finally {
        setCargando(false);
      }*/
    };
    const fetchMovimientos = async () => {
      const movimientosData = await obtenerMovimientos();
      setMovimientos(movimientosData);
      setCargando(false);
    };

    //fetchMovimientos();
    /*cargarMovimientos();
  }, []);*/

 /* const agregarMovimiento = (nuevoMovimiento) => {
    setMovimientos([...movimientos, { ...nuevoMovimiento, id: Date.now() }]);
  };*/

    const handleAgregarMovimiento = async (nuevoMovimiento) => {
    try {
      const movimientoGuardado = await agregarMovimiento(nuevoMovimiento);
      setMovimientos([movimientoGuardado, ...movimientos]);
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error al guardar movimiento:", error);
    }
  };

  /*if (cargando) {
    return <div className={styles.container}>Cargando...</div>;
  }*/

  return (
    <div className={styles.container}>
      <Navbar />
      <main className={styles.main}>
        <h1>Sistema de Control de Movimientos</h1>
        <h1>Unidad de Tecnologias de la Información - HRAEM</h1>
        
        <button 
          className={styles.button}
          onClick={() => setMostrarFormulario(!mostrarFormulario)}
        >
          { mostrarFormulario ? 'Ocultar Formulario' : 'Nuevo Movimiento' }
          </button>

        {mostrarFormulario && (
          <FormMovimiento 
            agregarMovimiento={agregarMovimiento} 
            setMostrarFormulario={setMostrarFormulario}
            onClose={() => setMostrarFormulario(false)} 
          />
        )}

        <ListaMovimientos movimientos={movimientos} />
      </main>
    </div>
  );

