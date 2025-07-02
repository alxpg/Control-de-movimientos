import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function ListaMovimientos({ movimientos }) {
  return (
    <TableContainer component={Paper} sx={{ mt: 4 }}>
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
              <TableCell>{movimiento.tipoMovimiento}</TableCell>
              <TableCell>
                {format(new Date(movimiento.fecha), 'dd/MM/yyyy', { locale: es })}
              </TableCell>
              <TableCell>{movimiento.periodoVacaciones || '-'}</TableCell>
              <TableCell>{movimiento.riesgoVacaciones || '-'}</TableCell>
              <TableCell>
                {format(new Date(movimiento.fechaRegistro), 'dd/MM/yyyy HH:mm', { locale: es })}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
