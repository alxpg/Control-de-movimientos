import { useState, useEffect } from 'react';
import { auth } from '../firebase/config';
import { obtenerMovimientosUsuario } from '../services/movimientosService';

export const useMovimientos = () => {
  const [movimientos, setMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setLoading(true);
        
        if (!auth.currentUser) {
          throw new Error('Usuario no autenticado');
        }

        const datos = await obtenerMovimientosUsuario();
        setMovimientos(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    cargarDatos();
  }, []);

  return { movimientos, loading, error };
};