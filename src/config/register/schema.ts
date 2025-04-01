import * as z from 'zod';

export const registrationSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  phone: z.string().regex(/^\d{10}$/, {
    message: 'Phone number must be exactly 10 numeric characters.',
  }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select a gender.',
  }),
  age: z.coerce.number().min(16, {
    message: 'You must be at least 16 years old.',
  }),
  institute: z.string().min(2, {
    message: 'Institute name must be at least 2 characters.',
  }),
  idCardImage: z.string().url({
    message: 'Please upload an ID card image.',
  }),
  rollNo: z.string().min(1, {
    message: 'Roll number is required.',
  }),
  yearOfStudy: z.coerce.number().min(1).max(6, {
    message: 'Year of study must be between 1 and 6.',
  }),
  referralCode: z.string().optional().nullable(),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
