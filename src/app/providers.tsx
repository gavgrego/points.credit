'use client';

import { authClient } from '@/auth-client';
import { AuthUIProvider } from '@daveyplate/better-auth-ui';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <AuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      providers={['discord']}
      onSessionChange={() => {
        // Clear router cache (protected routes)
        router.refresh();
      }}
      LinkComponent={Link}
    >
      {children}
    </AuthUIProvider>
  );
}
