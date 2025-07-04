import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LoginForm from '@/components/auth/LoginForm';
import { useRouter } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session) {
    redirect('/dashboard');
  }

  async function authenticate(formData: FormData): Promise<void> {
    'use server';
    const email = formData.get('email')?.valueOf();
    const password = formData.get('password')?.valueOf();

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid form data');
    }

    // Aquí puedes agregar la lógica de autenticación si es necesario
    // Por ejemplo, llamar a una API o manejar la autenticación
    // Si la autenticación es exitosa, puedes redirigir al dashboard
    // redirect('/dashboard');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <LoginForm authenticate={authenticate} />
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800">Hospital de la Mujer</h1>
          <h2 className="text-xl text-blue-600 mt-2">Unidad de Tecnologías de la Información</h2>
          <p className="text-gray-600 mt-4">Sistema de Control de Permisos del Personal</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <LoginForm authenticate={authenticate} />
        </div>
      </div>
    </main>
  );
}