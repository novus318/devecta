'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

export function withAuth(Component: React.ComponentType) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter();
    const [ok, setOk] = useState<boolean | null>(null);

    useEffect(() => {
      const checkAuth = async () => {
        const user = JSON.parse(localStorage.getItem('user') as any);

        if (!user) {
          setOk(false);
          return;
        }

        try {
          if (new Date().getTime() > user.expiry) {
            localStorage.removeItem('user');
            setOk(false);
          } else {
            setOk(true);
          }
        } catch (error) {
          console.error('Error during token verification:', error);
          setOk(false);
        }
      };

      checkAuth();
    }, [router]);

    if (ok === null) {
      return <Spinner />;
    }

    if (typeof window === 'undefined' || ok === false) {
      router.push('/auth');
      return null;
    }

    return <Component {...props} />;
  };
}
