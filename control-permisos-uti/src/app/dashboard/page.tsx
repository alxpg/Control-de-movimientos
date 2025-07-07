// src/app/dashboard/page.tsx
'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  if (status === 'unauthenticated') {
    redirect('/login');
  }

  if (status === 'loading') {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bienvenido, {session?.user?.name}</p>
    </div>
  );
}