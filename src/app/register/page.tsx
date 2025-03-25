'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CldUploadWidget } from 'next-cloudinary';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

import { registrationSchema, type RegistrationFormValues } from '@/config/register/schema';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: 'other',
      age: 18,
      institute: '',
      idCardImage: '',
      rollNo: '',
      yearOfStudy: 1,
    },
  });

  async function onSubmit(data: RegistrationFormValues) {
    if (step === 3) {
      try {
        const response = await fetch('/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          router.push('/register/success');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      // Move to next section
      setStep(step === 1 ? 2 : 3);
    }
  }

  function handleStepChange() {
    setStep(step === 1 ? 2 : 3);
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Registration Form</CardTitle>
          <CardDescription>Please fill out the registration form. Step {step} of 3</CardDescription>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Personal Information</h2>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your name" {...field} />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your.email@example.com" {...field} />
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
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="flex flex-row space-x-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="male" id="male" />
                              <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="female" id="female" />
                              <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="other" id="other" />
                              <Label htmlFor="other">Other</Label>
                            </div>
                          </RadioGroup>
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
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={16}
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Academic Information</h2>

                  <FormField
                    control={form.control}
                    name="institute"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Institute</FormLabel>
                        <FormControl>
                          <Input placeholder="Your institute name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idCardImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ID Card Image</FormLabel>
                        <FormControl>
                          <div className="flex flex-col gap-2">
                            <CldUploadWidget
                              uploadPreset="registration_uploads"
                              onUpload={(result: any) => {
                                if (result.info) {
                                  const url = result.info.secure_url;
                                  setUploadedImageUrl(url);
                                  field.onChange(url);
                                }
                              }}
                            >
                              {({ open }) => (
                                <div className="flex flex-col gap-4">
                                  <Button type="button" variant="outline" onClick={() => open()}>
                                    Upload ID Card
                                  </Button>
                                  {uploadedImageUrl && (
                                    <div className="relative w-40 h-40 rounded-md overflow-hidden">
                                      <img
                                        src={uploadedImageUrl}
                                        alt="ID Card"
                                        className="object-cover w-full h-full"
                                      />
                                    </div>
                                  )}
                                </div>
                              )}
                            </CldUploadWidget>
                            <Input
                              type="text"
                              placeholder="ID Card Image URL"
                              {...field}
                              className="hidden"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rollNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Roll Number</FormLabel>
                        <FormControl>
                          <Input placeholder="Your roll number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="yearOfStudy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Year of Study</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={6}
                            {...field}
                            onChange={e => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4 text-center">
                  <h2 className="text-xl font-semibold">Thank You!</h2>
                  <p className="text-gray-600">
                    Please review your information and submit the form.
                  </p>

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
              )}

              <CardFooter className="flex justify-between px-0 pb-0">
                {step > 1 ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(step === 2 ? 1 : 2)}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                {step !== 3 ? (
                  <Button onClick={handleStepChange}>Next</Button>
                ) : (
                  <Button type="submit">Submit</Button>
                )}
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
