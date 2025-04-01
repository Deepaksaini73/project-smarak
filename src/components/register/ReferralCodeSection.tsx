import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from '@/config/register/schema';

interface ReferralCodeSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function ReferralCodeSection({ form }: ReferralCodeSectionProps) {
  return (
    <div className="space-y-8 font-outfit">
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-3">Referral</h2>
        <p className="text-sm text-gray-600">Have a referral code? Enter it here</p>
      </div>

      <FormField
        control={form.control}
        name="referralCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Referral Code (optional)</FormLabel>
            <FormControl>
              <Input placeholder="Enter referral code" {...field} value={field.value || ''} />
            </FormControl>
            <FormDescription>
              Enter a valid referral code if you were referred by someone
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
