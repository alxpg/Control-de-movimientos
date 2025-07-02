//Agrega al inicio las importaciones necesarias
import FormatoImpresion from './FormatoImpresion';

//Dentro del componenete FormMovimiento, añade un estado


import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import esLocale from 'date-fns/locale/es';

import { TIPOS_MOVIMIENTO, CATEGORIAS, TIPOS_PLAZA, PERIODOS_VACACIONES } from '../utils/constants';

export default function FormMovimiento({ agregarMovimiento, setMostrarFormulario }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [fecha, setFecha] = useState(new Date());
  const [fechaFinal, setFechaFinal] = useState(new Date());
  const [tipoMovimiento, setTipoMovimiento] = useState('');
  const [mostrarPeriodoVacaciones, setMostrarPeriodoVacaciones] = useState(false);
  const [mostrarRiesgoVacaciones, setMostrarRiesgoVacaciones] = useState(false);
  const [movimientoGuardado, setMovimientoGuardado] = useState(null);

  const onSubmit = (data) => {
    const movimiento = {
    ...data,
    fecha,
    tipoMovimiento,
    periodoVacaciones: data.periodoVacaciones || null,
    riesgoVacaciones: data.riesgoVacaciones || null,
    fechaRegistro: new Date().toISOString()
  };
  agregarMovimiento(movimiento);
  setMovimientoGuardado(movimiento);
};

  const handleTipoMovimientoChange = (e) => {
    const value = e.target.value;
    setTipoMovimiento(value);
    setMostrarPeriodoVacaciones(value === 'vacaciones');
    setMostrarRiesgoVacaciones(value === 'vacaciones');
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <TextField
        fullWidth
        label="Nombre Completo"
        {...register("nombre", { required: true })}
        error={!!errors.nombre}
        helperText={errors.nombre && "Este campo es requerido"}
        sx={{ mb: 2 }}
      />

      <TextField
        fullWidth
        label="Número del trabajador"
        {...register("credencial", { required: true })}
        error={!!errors.credencial}
        helperText={errors.credencial && "Este campo es requerido"}
        sx={{ mb: 2 }}
      />

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="categoria-label">Categoría</InputLabel>
        <Select
          labelId="categoria-label"
          label="Categoría"
          {...register("categoria", { required: true })}
          error={!!errors.categoria}
        >
          {CATEGORIAS.map((categoria) => (
            <MenuItem key={categoria} value={categoria}>
              {categoria}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="plaza-label">Tipo de Plaza</InputLabel>
        <Select
          labelId="plaza-label"
          label="Tipo de Plaza"
          {...register("tipoPlaza", { required: true })}
          error={!!errors.tipoPlaza}
        >
          {TIPOS_PLAZA.map((plaza) => (
            <MenuItem key={plaza} value={plaza}>
              {plaza}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
        <DatePicker
          label="Fecha inicial del movimiento"
          value={fecha}
          onChange={(newValue) => setFecha(newValue)}
          renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
        />
      </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
        <DatePicker
          label="Fecha final del movimiento"
          value={fechaFinal}
          onChange={(Value) => setFechaFinal(Value)}
          renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
        />
      </LocalizationProvider>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="movimiento-label">Tipo de Movimiento</InputLabel>
        <Select
          labelId="movimiento-label"
          label="Tipo de Movimiento"
          value={tipoMovimiento}
          onChange={handleTipoMovimientoChange}
          error={!!errors.tipoMovimiento}
        >
          {TIPOS_MOVIMIENTO.map((movimiento) => (
            <MenuItem key={movimiento} value={movimiento}>
              {movimiento}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {mostrarPeriodoVacaciones && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="periodo-label">Periodo de Vacaciones</InputLabel>
          <Select
            labelId="periodo-label"
            label="Periodo de Vacaciones"
            {...register("periodoVacaciones", { required: tipoMovimiento === 'vacaciones' })}
            error={!!errors.periodoVacaciones}
          >
            {PERIODOS_VACACIONES.map((periodo) => (
              <MenuItem key={periodo} value={periodo}>
                {periodo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      {mostrarRiesgoVacaciones && (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="riesgo-label">Nivel de Riesgo</InputLabel>
          <Select
            labelId="riesgo-label"
            label="Nivel de Riesgo"
            {...register("riesgoVacaciones", { required: tipoMovimiento === 'vacaciones' })}
            error={!!errors.riesgoVacaciones}
          >
            <MenuItem value="bajo">Bajo Riesgo</MenuItem>
            <MenuItem value="medio">Mediano Riesgo</MenuItem>
            <MenuItem value="alto">Alto Riesgo</MenuItem>
          </Select>
        </FormControl>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button variant="contained" color="error" onClick={() => setMostrarFormulario(false)}>
          Cancelar
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Guardar Movimiento
        </Button>
            {movimientoGuardado && (
        <Box sx={{ mt: 4 }}>
            <FormatoImpresion movimiento={movimientoGuardado} />
        </Box>
        )}
      </Box>
    </Box>
  );
}
