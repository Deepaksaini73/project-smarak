import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
      <p className="mt-4 text-gray-600">Loading your profile...</p>
    </div>
  );
}
