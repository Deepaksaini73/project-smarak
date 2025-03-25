import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from '@/config/register/schema';

interface ReviewStepProps {
  form: UseFormReturn<RegistrationFormValues>;
  uploadedImageUrl: string;
}

export function ReviewStep({ form, uploadedImageUrl }: ReviewStepProps) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-semibold">Thank You!</h2>
      <p className="text-gray-600">Please review your information and submit the form.</p>

      <div className="bg-gray-50 p-4 rounded-md text-left">
        <h3 className="font-medium mb-2">Personal Information:</h3>
        <p>Name: {form.getValues('name')}</p>
        <p>Email: {form.getValues('email')}</p>
        <p>Phone: {form.getValues('phone')}</p>
        <p>Gender: {form.getValues('gender')}</p>
        <p>Age: {form.getValues('age')}</p>

        <h3 className="font-medium mb-2 mt-4">Academic Information:</h3>
        <p>Institute: {form.getValues('institute')}</p>
        <p>Roll No: {form.getValues('rollNo')}</p>
        <p>Year of Study: {form.getValues('yearOfStudy')}</p>

        {uploadedImageUrl && (
          <div className="mt-2">
            <p className="font-medium">ID Card:</p>
            <div className="mt-1 w-32 h-32">
              <img
                src={uploadedImageUrl}
                alt="ID Card"
                className="object-cover w-full h-full rounded-md"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
