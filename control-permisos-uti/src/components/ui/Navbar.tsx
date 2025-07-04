import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { logout } from '@/lib/auth';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/dashboard">Inicio</Link>
          <Link href="/permisos/nuevo">Nuevo Permiso</Link>
          <Link href="/permisos/historial">Historial</Link>
          <Link href="/permisos/reportes">Reportes</Link>
          <Link href="/permisos/pase-salida">Pase de Salida</Link>
          <Link href="/permisos/vacaciones">Vacaciones</Link>
          <Link href="/permisos/dias-31">Días 31</Link>
          <Link href="/permisos/dias-economicos">Días Económicos</Link>
        </div>
        
        {user && (
          <div className="flex items-center space-x-4">
            <span>{user.email}</span>
            <button onClick={logout}>Cerrar Sesión</button>
          </div>
        )}
      </div>
    </nav>
  );
}