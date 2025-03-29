'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Form } from '@/components/ui/form';

import { registrationSchema, type RegistrationFormValues } from '@/config/register/schema';
import { useApi } from '@/hooks/use-api';
import { FormLayout } from '@/components/register/FormLayout';
import { PersonalInfoSection } from '@/components/register/PersonalInfoSection';
import { AcademicInfoSection } from '@/components/register/AcademicInfoSection';
import { SubmitButton } from '@/components/register/SubmitButton';

export default function RegisterPage() {
  const session = useSession();
  const email = session.data?.user?.email || '';
  const name = session.data?.user?.name || '';
  const router = useRouter();

  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const { makeRequest, isLoading } = useApi();
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: name,
      email: email,
      phone: '',
      gender: 'male',
      age: 18,
      institute: '',
      idCardImage: '',
      rollNo: '',
      yearOfStudy: 1,
    },
  });

  useEffect(() => {
    if (email) {
      form.setValue('email', email);
    }
    if (name) {
      form.setValue('name', name);
    }
  }, [email, name, form]);

  const checkRegistrationStatus = async () => {
    try {
      const result = await makeRequest('GET', '/user');
      if (result.status === 'success') {
        setIsRegistered(true);
      }
    } catch (error) {
      console.error('Error checking registration status:', error);
    } finally {
      setIsLoadingUser(false);
    }
  };

  useEffect(() => {
    checkRegistrationStatus();
  }, []);

  useEffect(() => {
    if (isRegistered && !isLoadingUser) {
      router.push('/profile');
    }
  }, [isRegistered, isLoadingUser, router]);

  async function onSubmit(data: RegistrationFormValues) {
    const result = await makeRequest('POST', '/user/register', {
      ...data,
      idCardImage: uploadedImageUrl || data.idCardImage,
    });

    if (result.status === 'success') {
      toast.success('Registration successful!');
      router.push('/profile');
    }
  }

  if (isLoadingUser || isRegistered) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="loader">Loading...</div>
      </div>
    );
  }

  return (
    <FormLayout
      title="Registration Form"
      description="Please complete all fields to finalize your registration"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <PersonalInfoSection form={form} />

          <AcademicInfoSection
            form={form}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            isUploading={isUploading}
            setIsUploading={setIsUploading}
          />

          <SubmitButton isLoading={isLoading} isUploading={isUploading} />
        </form>
      </Form>
    </FormLayout>
  );
}
