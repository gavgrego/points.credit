'use client';

import { AuthCard } from '@daveyplate/better-auth-ui';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function AuthView({ pathname }: { pathname: string }) {
  const router = useRouter();

  useEffect(() => {
    // Clear router cache (protected routes)
    router.refresh();
  }, [router]);

  return (
    <main className="flex flex-col grow p-4 items-center justify-center">
      <AuthCard
        localization={{
          signUp: 'Sign up for points.credit',
          signUpDescription:
            'Sign up to dynamically see your currently available transfer bonuses based on cards held.',
        }}
        pathname={pathname}
      />
    </main>
  );
}
