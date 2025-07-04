import LoginForm from '@/components/auth/LoginForm';
import login from '@/lib/auth';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import React from 'react';

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>;
}


export default function LoginPage() {
  const { user } = useAuth();

  if (user) {
    redirect('/dashboard');
  }
  
  const handleLogin = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {
      await login(email, password);
      redirect('/dashboard');
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };
  {/*return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm authenticate={handleLogin} />
    </div>
  );*/}
}
