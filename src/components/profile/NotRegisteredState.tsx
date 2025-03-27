import Link from 'next/link';
import { ArrowRight, User as UserIcon } from 'lucide-react';

export function NotRegisteredState() {
  return (
    <div className="bg-white shadow-md rounded-lg p-8 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <UserIcon className="h-12 w-12 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold mb-2">User Not Registered</h2>
      <p className="text-gray-600 mb-6">You need to register to Smarak 2025.</p>
      <Link
        href="/register"
        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
      >
        Register Now <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </div>
  );
}
