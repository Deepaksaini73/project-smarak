'use client';
import React, { useEffect, useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { logout } from '@/actions/auth';

const LogoutPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function signOutUser() {
      try {
        const res = await logout();
        const redirectTimeout = setTimeout(() => {
          window.location.href = '/';
        }, 2000);

        return () => clearTimeout(redirectTimeout);
      } catch (error) {
        console.error('Error signing out:', error);
        setError('Failed to sign out. Please try again.');
        const errorTimeout = setTimeout(() => {
          window.location.href = '/';
        }, 3000);

        return () => clearTimeout(errorTimeout);
      }
    }

    signOutUser();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div className="space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight font-syne">
                {error ? 'Sign out issue' : 'Signing out...'}
              </h1>
              {error && <p className="text-destructive">{error}</p>}
              {!error && <p className="text-muted-foreground">You will be redirected shortly</p>}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LogoutPage;
