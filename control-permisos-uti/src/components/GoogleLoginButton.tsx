// src/components/GoogleLoginButton.tsx
'use client'; // ¡Esto es crucial!

import { signIn } from 'next-auth/react';

export default function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    signIn('google');
  };

  return (
    <button 
      onClick={handleGoogleLogin}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Iniciar sesión con Google
    </button>
  );
}