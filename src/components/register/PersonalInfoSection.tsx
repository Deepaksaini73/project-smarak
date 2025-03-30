import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from '@/config/register/schema';
import { User, Mail, Phone, Calendar, Users } from 'lucide-react';

interface PersonalInfoSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
}

export function PersonalInfoSection({ form }: PersonalInfoSectionProps) {
  return (
    <div className="space-y-6  rounded-lg p-6 border border-gray-100 shadow-sm">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold font-outfit text-[#685c18]">Personal Information</h2>
        <Separator className="flex-1 ml-4 bg-primary/20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-outfit">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2 ">
                <User className="h-4 w-4 text-[#685c18]" />
                Full Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name"
                  {...field}
                  className="focus-visible:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#685c18]" />
                Email Address
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="your.email@example.com"
                  {...field}
                  className="focus-visible:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#685c18]" />
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your phone number"
                  {...field}
                  className="focus-visible:ring-primary"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#685c18]" />
                Age
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={16}
                  {...field}
                  className="focus-visible:ring-primary"
                  onChange={e => field.onChange(parseInt(e.target.value) || '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#685c18]" />
                Gender
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="text-[#685c18]" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="text-[#685c18]" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" className="text-[#685c18]" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
