import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LoginForm from '@/components/auth/LoginForm';

export default async function Home() {
  const session = await getServerSession(authOptions);

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Hospital de la Mujer</h1>
          <h2 className="text-xl text-blue-600 mt-2">Unidad de Tecnologías de la Información</h2>
          <p className="text-gray-600 mt-4">Sistema de Control de Permisos del Personal</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <LoginForm onLogin={async (email: string, password: string) => {
            // Implement your login logic here, e.g., call an API or handle authentication
            // For now, just log the credentials (remove this in production)
            console.log('Login attempt:', email, password);
          }} />
        </div>
      </div>
    </main>
  );
}