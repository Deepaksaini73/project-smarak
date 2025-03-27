'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { Form } from '@/components/ui/form';
import { RegistrationFormLayout } from '@/components/register/RegistrationFormLayout';
import { PersonalInfoStep } from '@/components/register/PersonalInfoStep';
import { AcademicInfoStep } from '@/components/register/AcademicInfoStep';
import { ReviewStep } from '@/components/register/ReviewStep';
import { FormNavigation } from '@/components/register/FormNavigation';
import { registrationSchema, type RegistrationFormValues } from '@/config/register/schema';
import { useApi } from '@/hooks/use-api';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const TOTAL_STEPS = 3;
  const { makeRequest, isLoading } = useApi();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: name,
      email: email,
      phone: '',
      gender: 'other',
      age: 18,
      institute: '',
      idCardImage: '',
      rollNo: '',
      yearOfStudy: 1,
    },
  });

  // Set the form values when query params change
  useEffect(() => {
    if (email) {
      form.setValue('email', email);
    }
    if (name) {
      form.setValue('name', name);
    }
  }, [email, name, form]);

  async function onSubmit(data: RegistrationFormValues) {
    if (step === TOTAL_STEPS) {
      // Register the user
      const result = await makeRequest('POST', '/api/register', {
        ...data,
        idCardImage: uploadedImageUrl || data.idCardImage,
      });
      console.log(result);
    } else {
      handleNext();
    }
  }

  function handleNext() {
    if (step === 1) setStep(2);
    else if (step === 2) setStep(3);
  }

  function handleBack() {
    if (step === 2) setStep(1);
    else if (step === 3) setStep(2);
  }

  return (
    <RegistrationFormLayout step={step} totalSteps={TOTAL_STEPS} title="Registration Form">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {step === 1 && <PersonalInfoStep form={form} />}

          {step === 2 && (
            <AcademicInfoStep
              form={form}
              uploadedImageUrl={uploadedImageUrl}
              setUploadedImageUrl={setUploadedImageUrl}
            />
          )}

          {step === 3 && <ReviewStep form={form} uploadedImageUrl={uploadedImageUrl} />}

          <FormNavigation
            step={step}
            totalSteps={TOTAL_STEPS}
            onBack={handleBack}
            onNext={handleNext}
            loading={isLoading}
          />
        </form>
      </Form>
    </RegistrationFormLayout>
  );
}
