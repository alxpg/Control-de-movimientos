import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import LoginForm from '@/components/auth/LoginForm';
import React from 'react';
import GoogleLoginButton from '@/components/GoogleLoginButton';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  // Si el usuario ya está autenticado, redirigir al dashboard
  if (session) {
    redirect('./app/dashboard');
  }

  // The authenticate function for form submission will be passed to LoginForm
  // It needs to be defined as a server action if it's to be used directly in a server component
  // For now, let's assume LoginForm handles its own server action or client-side authentication
  async function authenticate() {
    // This function will be implemented in LoginForm or as a separate server action
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gray-50">
      <GoogleLoginButton />
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