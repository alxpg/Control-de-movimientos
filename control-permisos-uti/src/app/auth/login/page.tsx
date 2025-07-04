import LoginForm from '@/components/auth/LoginForm';
import { login } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { user } = useAuth();

  if (user) {
    redirect('/dashboard');
  }

  const handleLogin = async (email: string, password: string) => {
    try {
      await login(email, password);
      redirect('/dashboard');
    } catch (error) {
      console.error('Error de autenticación:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
}