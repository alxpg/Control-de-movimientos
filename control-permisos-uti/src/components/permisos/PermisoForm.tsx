import { useState, useEffect } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import CalendarInput from '../ui/CalendarInput';
import ShiftSelector from '../ui/ShiftSelector';

export default function PermisoForm() {
  const [formData, setFormData] = useState({
    fecha: new Date().toISOString().split('T')[0],
    folio: generateFolio(),
    nombreCompleto: '',
    credencial: '',
    turno: '',
    tipoPlaza: '',
    periodoVacacional: '',
    riesgo: '',
    fechaInicial: '',
    fechaFinal: '',
    dia31: false,
    diasGozadosAnteriores: 0,
    guardia: false,
    devolucionDia: false,
    diaDevolucion: '',
    tipoPermiso: ''
  });

  function generateFolio() {
    const date = new Date();
    return `HM-${date.getFullYear()}${(date.getMonth()+1).toString().padStart(2,'0')}${date.getDate().toString().padStart(2,'0')}-${Math.floor(Math.random()*10000).toString().padStart(4,'0')}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'permisos'), formData);
      alert('Permiso registrado exitosamente');
      // Reset form or redirect
    } catch (error) {
      console.error('Error al registrar permiso:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campos del formulario */}
      <div>
        <label>Nombre Completo</label>
        <input 
          type="text" 
          value={formData.nombreCompleto}
          onChange={(e) => setFormData({...formData, nombreCompleto: e.target.value})}
          required
        />
      </div>
      
      <ShiftSelector 
        value={formData.turno}
        onChange={(value) => setFormData({...formData, turno: value})}
      />
      
      <CalendarInput 
        label="Fecha Inicial"
        value={formData.fechaInicial}
        onChange={(date) => setFormData({...formData, fechaInicial: date})}
      />
      
      {/* Más campos según requerimientos */}
      
      <button type="submit">Guardar Permiso</button>
    </form>
  );
}