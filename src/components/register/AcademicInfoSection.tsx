import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from '@/config/register/schema';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';

interface AcademicInfoSectionProps {
  form: UseFormReturn<RegistrationFormValues>;
  uploadedImageUrl: string;
  setUploadedImageUrl: (url: string) => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
}

export function AcademicInfoSection({
  form,
  uploadedImageUrl,
  setUploadedImageUrl,
  isUploading,
  setIsUploading,
}: AcademicInfoSectionProps) {
  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setUploadedImageUrl(url);
      form.setValue('idCardImage', url);
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-4 pt-2">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold">Academic Information</h2>
        <Separator className="flex-1 ml-3" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institute Name</FormLabel>
              <FormControl>
                <Input placeholder="Your institute or college name" {...field} />
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
                <Input placeholder="Your roll or registration number" {...field} />
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
              <FormLabel>Year of Study (example: 1st Year &gt; 1)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  {...field}
                  onChange={e => field.onChange(parseInt(e.target.value) || '')}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idCardImage"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>ID Card Image</FormLabel>
              <FormControl>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full sm:w-auto">
                      <div className="flex flex-col items-center space-y-2">
                        <Input
                          type="file"
                          accept="image/*"
                          id="id-card-upload"
                          onChange={handleFileUpload}
                          className="hidden"
                        />

                        {!uploadedImageUrl ? (
                          <>
                            <Upload className="h-8 w-8 text-gray-500" />
                            <p className="text-sm text-gray-500">Upload your ID card</p>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => document.getElementById('id-card-upload')?.click()}
                              disabled={isUploading}
                            >
                              {isUploading ? (
                                <>
                                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                  Uploading...
                                </>
                              ) : (
                                'Select Image'
                              )}
                            </Button>
                          </>
                        ) : (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById('id-card-upload')?.click()}
                            disabled={isUploading}
                          >
                            {isUploading ? 'Uploading...' : 'Change Image'}
                          </Button>
                        )}
                      </div>
                    </div>

                    {uploadedImageUrl && (
                      <div className="relative w-full sm:w-48 h-40 rounded-md overflow-hidden border border-gray-200">
                        <Image src={uploadedImageUrl} alt="ID Card" className="object-cover" fill />
                      </div>
                    )}
                  </div>
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
      </div>
    </div>
  );
}
