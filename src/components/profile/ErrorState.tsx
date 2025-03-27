import { AlertCircle, RefreshCw } from 'lucide-react';

type ErrorStateProps = {
  error: string;
};

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div
      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 mr-2" />
        <p className="font-medium">Error</p>
      </div>
      <p className="text-sm mt-1">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 bg-red-100 hover:bg-red-200 text-red-800 font-medium py-1 px-3 rounded text-sm flex items-center"
      >
        <RefreshCw className="h-3 w-3 mr-1" /> Try Again
      </button>
    </div>
  );
}
