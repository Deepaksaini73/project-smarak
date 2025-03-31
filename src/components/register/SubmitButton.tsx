import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  isUploading: boolean;
}

export function SubmitButton({ isLoading, isUploading }: SubmitButtonProps) {
  return (
    <div className="pt-6 flex justify-end font-outfit">
      <button
        type="submit"
        disabled={isLoading || isUploading}
        className="button-primary w-full sm:w-auto flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          'Complete Registration'
        )}
      </button>
    </div>
  );
}
