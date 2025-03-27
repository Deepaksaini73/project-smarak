import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  isLoading: boolean;
  isUploading: boolean;
}

export function SubmitButton({ isLoading, isUploading }: SubmitButtonProps) {
  return (
    <div className="pt-2 flex justify-end">
      <Button type="submit" disabled={isLoading || isUploading} className="min-w-[150px]">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Complete Registration'
        )}
      </Button>
    </div>
  );
}
