"use client"

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

const publicRoutes = ['/login', '/register'];

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!loading && !isRedirecting) {
      if (!isAuthenticated && !publicRoutes.includes(pathname)) {
        setIsRedirecting(true);
        router.push('/login');
      } else if (isAuthenticated && publicRoutes.includes(pathname)) {
        setIsRedirecting(true);
        router.push('/');
      }
    }
  }, [isAuthenticated, loading, pathname, router, isRedirecting]);

  // Mostrar loading apenas durante a verificação inicial
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não há usuário e a rota não é pública, não renderiza nada (será redirecionado)
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return null;
  }

  // Se há usuário e está em uma rota pública, não renderiza nada (será redirecionado)
  if (isAuthenticated && publicRoutes.includes(pathname)) {
    return null;
  }

  return <>{children}</>;
} 