import React from 'react';
import { InfoIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PaymentWillStartSoonProps {
  message?: string;
  className?: string;
}

export const PaymentWillStartSoon: React.FC<PaymentWillStartSoonProps> = ({
  message = 'Payment process will begin shortly',
  className,
}) => {
  return (
    <Card
      className={cn(
        'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200',
        'shadow-sm hover:shadow-md transition-all duration-300',
        'px-4 py-3 md:px-5 md:py-4',
        className
      )}
    >
      <CardContent className="p-0">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-2.5 rounded-full shadow-inner flex-shrink-0">
            <InfoIcon className="h-5 w-5 text-amber-600" strokeWidth={2.5} />
          </div>
          <div className="flex-1 space-y-0.5">
            <CardTitle className="font-outfit font-semibold text-amber-800 text-base md:text-lg">
              Payment Will Start Soon
            </CardTitle>
            <p className="text-amber-700 font-outfit text-sm md:text-base leading-relaxed">
              {message}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
