import { useRef } from 'react';
import { usePDF } from 'react-to-pdf';
import { Button, Box, Typography, Paper } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const FormatoImpresion = ({ movimiento }) => {
  const { toPDF, targetRef } = usePDF({ 
    filename: `movimiento-${movimiento.tipoMovimiento}-${format(new Date(), 'yyyyMMdd')}.pdf`
  });

  const getTitulo = () => {
    switch(movimiento.tipoMovimiento) {
      case 'vacaciones':
        return 'SOLICITUD DE VACACIONES';
      case 'pase_salida':
        return 'AUTORIZACIÓN DE PASE DE SALIDA';
      case 'dias_administrativos':
        return 'SOLICITUD DE DÍAS ADMINISTRATIVOS';
      default:
        return 'DOCUMENTO OFICIAL';
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button variant="contained" onClick={() => toPDF()}>
        Imprimir Formato
      </Button>

      <Paper ref={targetRef} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          {getTitulo()}
        </Typography>

        <Typography variant="body1">
          <strong>Nombre:</strong> {movimiento.nombre}
        </Typography>
        <Typography variant="body1">
          <strong>Número de Credencial:</strong> {movimiento.credencial}
        </Typography>
        <Typography variant="body1">
          <strong>Categoría:</strong> {movimiento.categoria}
        </Typography>
        <Typography variant="body1">
          <strong>Tipo de Plaza:</strong> {movimiento.tipoPlaza}
        </Typography>

        {movimiento.tipoMovimiento === 'vacaciones' && (
          <>
            <Typography variant="body1">
              <strong>Periodo:</strong> {movimiento.periodoVacaciones}
            </Typography>
            <Typography variant="body1">
              <strong>Nivel de Riesgo:</strong> {movimiento.riesgoVacaciones}
            </Typography>
          </>
        )}

        {movimiento.tipoMovimiento === 'pase_salida' && (
          <Typography variant="body1">
            <strong>Duración:</strong> 6 horas
          </Typography>
        )}

        <Typography variant="body1">
          <strong>Fecha del Movimiento:</strong> {format(new Date(movimiento.fecha), 'dd/MM/yyyy', { locale: es })}
        </Typography>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="body1">_________________________</Typography>
            <Typography variant="body1">Firma del Solicitante</Typography>
          </Box>
          <Box>
            <Typography variant="body1">_________________________</Typography>
            <Typography variant="body1">Autorización</Typography>
          </Box>
        </Box>

        <Typography variant="caption" sx={{ mt: 4, alignSelf: 'flex-end' }}>
          Generado el: {format(new Date(), 'dd/MM/yyyy HH:mm', { locale: es })}
        </Typography>
      </Paper>
    </Box>
  );
};

export default FormatoImpresion;