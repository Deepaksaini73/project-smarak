'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/profile';
  const [error, setError] = useState<string | null>(null);

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl });
    } catch (error) {
      console.error('Error signing in with Google', error);
      setError('An error occurred during sign in. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-sm">
        <div className="text-center relative">
          <h2 className="text-4xl font-bold tracking-tight text-[#554400] font-outfit mb-2">
            Sign in to Smarak
          </h2>
          <div className="mx-auto w-28 h-1.5 bg-[#554400] mt-1 mb-6"></div>
          <p className="text-gray-600 font-outfit">Annual Civil Engineering Fest NIT Rourkela</p>
        </div>

        {error && (
          <div className="rounded-md bg-red-50 p-4 border border-red-100">
            <div className="text-sm text-red-700 font-outfit">{error}</div>
          </div>
        )}

        <div className="mt-8 space-y-6">
          <button
            onClick={handleGoogleSignIn}
            className="button-primary w-full flex items-center justify-center"
          >
            <FaGoogle className="inline-block mr-2" />
            Sign in with Google
          </button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 font-outfit">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
