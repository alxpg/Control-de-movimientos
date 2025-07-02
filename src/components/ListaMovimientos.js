import { useRef } from 'react';
import { usePDF } from 'react-to-pdf';;
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } 
from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ListaMovimientos({ movimientos }) {
  const targetRef = useRef();
  const { toPDF, targetRef: pdfTargetRef } = usePDF({ filename: 'movimientos-uti.pdf' });

  return (
     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button 
        variant="contained" 
        onClick={() => toPDF()} 
        sx={{ alignSelf: 'flex-end', mb: 2 }}
      >
        Exportar a PDF
      </Button>

    <TableContainer component={Paper} ref={pdfTargetRef} sx={{ mt: 4 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Credencial</TableCell>
            <TableCell>Tipo Movimiento</TableCell>
            <TableCell>Fecha</TableCell>
            <TableCell>Periodo Vac.</TableCell>
            <TableCell>Riesgo</TableCell>
            <TableCell>Registro</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         {movimientos.map((movimiento, index) => (
              <TableRow key={index}>
                <TableCell>{movimiento.nombre}</TableCell>
                <TableCell>{movimiento.credencial}</TableCell>
                <TableCell>
                  {movimiento.tipoMovimiento === 'vacaciones' && 'Vacaciones'}
                  {movimiento.tipoMovimiento === 'pase_salida' && 'Pase de Salida'}
                  {movimiento.tipoMovimiento === 'dias_administrativos' && 'Días Administrativos'} 
                </TableCell>
              <TableCell>
                {format(new Date(movimiento.fecha), 'dd/MM/yyyy', { locale: es })}
              </TableCell>

              <TableCell>{movimiento.periodoVacaciones || '-'}</TableCell>
              <TableCell>{movimiento.riesgoVacaciones || '-'}</TableCell>
              <TableCell>
                  {movimiento.riesgoVacaciones === 'bajo' && 'Bajo'}
                  {movimiento.riesgoVacaciones === 'medio' && 'Medio'}
                  {movimiento.riesgoVacaciones === 'alto' && 'Alto'}
                  {!movimiento.riesgoVacaciones && '-'}
                </TableCell>
                <TableCell>
                  {format(new Date(movimiento.fechaRegistro), 'dd/MM/yyyy HH:mm', { locale: es })}
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
  );
}
