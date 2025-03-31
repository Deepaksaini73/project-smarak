import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface FormNavigationProps {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  loading?: boolean;
}

export function FormNavigation({
  step,
  totalSteps,
  onBack,
  onNext,
  loading,
  onSubmit,
}: FormNavigationProps) {
  const isFirstStep = step === 1;
  const isLastStep = step === totalSteps;

  return (
    <CardFooter className="flex justify-between px-0 pb-0">
      {!isFirstStep ? (
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
      ) : (
        <div></div>
      )}

      {!isLastStep ? (
        <Button type="button" onClick={onNext} className="cursor-pointer">
          Next
        </Button>
      ) : (
        <Button className="cursor-pointer" disabled={loading} onClick={onSubmit}>
          {loading ? 'Loading...' : 'Submit'}
        </Button>
      )}
    </CardFooter>
  );
}
