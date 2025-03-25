import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from '@/config/register/schema';
import { Dispatch, SetStateAction, useState } from 'react';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

interface AcademicInfoStepProps {
  form: UseFormReturn<RegistrationFormValues>;
  uploadedImageUrl: string;
  setUploadedImageUrl: Dispatch<SetStateAction<string>>;
}

export function AcademicInfoStep({
  form,
  uploadedImageUrl,
  setUploadedImageUrl,
}: AcademicInfoStepProps) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading('Uploading image...', {
      description: 'Please wait while we upload your ID card image',
    });

    try {
      const url = await uploadToCloudinary(file);
      setUploadedImageUrl(url);
      form.setValue('idCardImage', url);
      toast.success('Image uploaded successfully', { id: toastId });
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image', {
        id: toastId,
        description: 'Please try again',
      });
    } finally {
      setIsUploading(false);
    }
  }

  return (
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
                <div className="flex flex-col gap-4">
                  <div>
                    <Input
                      type="file"
                      accept="image/*"
                      id="id-card-upload"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('id-card-upload')?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        'Upload ID Card'
                      )}
                    </Button>
                  </div>
                  {uploadedImageUrl && (
                    <div className="relative w-40 h-40 rounded-md overflow-hidden">
                      <Image
                        src={uploadedImageUrl}
                        alt="ID Card"
                        className="object-cover w-full h-full"
                        layout="fill"
                      />
                    </div>
                  )}
                </div>
                <Input type="text" placeholder="ID Card Image URL" {...field} className="hidden" />
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
  );
}
