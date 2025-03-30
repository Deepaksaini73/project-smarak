import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UseFormReturn } from 'react-hook-form';
import { RegistrationFormValues } from '@/config/register/schema';
import { Loader2, Upload, Building, School, BookOpen } from 'lucide-react';
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
    <div className="space-y-6 rounded-lg p-6 border border-gray-100 shadow-sm font-outfit">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-[#685c18]">Academic Information</h2>
        <Separator className="flex-1 ml-4 bg-primary/20" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="institute"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Building className="h-4 w-4 text-[#685c18]" />
                Institute Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your institute or college name"
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
          name="rollNo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <School className="h-4 w-4 text-[#685c18]" />
                Roll Number
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Your roll or registration number"
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
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#685c18]" />
                Year of Study
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={1}
                  max={6}
                  placeholder="Example: 1st Year = 1"
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
          name="idCardImage"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel className="flex items-center gap-2">
                <Upload className="h-4 w-4 text-[#685c18]" />
                ID Card Image
              </FormLabel>
              <FormControl>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    <div className="flex items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 rounded-lg p-6 w-full sm:w-1/2 transition-colors hover:bg-gray-100">
                      <div className="flex flex-col items-center space-y-3">
                        <Input
                          type="file"
                          accept="image/*"
                          id="id-card-upload"
                          onChange={handleFileUpload}
                          className="hidden"
                        />

                        {!uploadedImageUrl ? (
                          <>
                            <Upload className="h-10 w-10 text-[#685c18]/60" />
                            <p className="text-sm text-gray-600 text-center">
                              Upload your student ID card for verification
                            </p>
                            <Button
                              type="button"
                              variant="outline"
                              className="border-primary/40 text-[#685c18] hover:bg-primary/5"
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
                            className="border-primary/40 text-[#685c18] hover:bg-primary/5"
                            onClick={() => document.getElementById('id-card-upload')?.click()}
                            disabled={isUploading}
                          >
                            {isUploading ? 'Uploading...' : 'Change Image'}
                          </Button>
                        )}
                      </div>
                    </div>

                    {uploadedImageUrl && (
                      <div className="relative w-full sm:w-1/2 h-48 rounded-md overflow-hidden border border-gray-200 shadow-sm">
                        <Image
                          src={uploadedImageUrl}
                          alt="ID Card"
                          className="object-contain"
                          fill
                        />
                        <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs py-1 px-2 text-center">
                          ID Card uploaded successfully
                        </div>
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
