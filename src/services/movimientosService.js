import { db } from '../firebase/config';
import {  collection,   addDoc,   getDocs,   query,  orderBy,  where,  serverTimestamp } from 'firebase/firestore';

export const obtenerMovimientosUsuario = async () => {
  if (!auth.currentUser) {
    throw new Error("Usuario no autenticado");
  }
  const q = query(
    collection(db, "movimientos"),
    where("userId", "==", auth.currentUser.uid)
  );
  
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const agregarMovimiento = async (movimientoData) => {
  if (!auth.currentUser) {
    throw new Error("Usuario no autenticado");
  }

  const movimientoConUsuario = {
    ...movimientoData,
    userId: auth.currentUser.uid,
    fechaRegistro: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, "movimientos"), movimientoConUsuario);
  return { id: docRef.id, ...movimientoConUsuario };
};
// Referencia a la colección de movimientos
//const movimientosRef = collection(db, 'movimientos');

// Agregar un nuevo movimiento
/*export const agregarMovimiento = async (movimiento) => {
  try {
    const docRef = await addDoc(movimientosRef, {
      ...movimiento,
      fechaRegistro: serverTimestamp()
    });
    return { id: docRef.id, ...movimiento };
  } catch (error) {
    console.error("Error al agregar movimiento:", error);
    throw error;
  }
};*/

// Obtener todos los movimientos
export const obtenerMovimientos = async () => {
  try {
    const q = query(movimientosRef, orderBy('fechaRegistro', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convertir Firestore Timestamp a Date si existe
      fechaRegistro: doc.data().fechaRegistro?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error al obtener movimientos:", error);
    throw error;
  }
};

// Obtener movimientos por usuario (si implementas autenticación)
export const obtenerMovimientosPorUsuario = async (userId) => {
  try {
    const q = query(
      movimientosRef, 
      where('userId', '==', userId),
      orderBy('fechaRegistro', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      fechaRegistro: doc.data().fechaRegistro?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error al obtener movimientos por usuario:", error);
    throw error;
  }
};