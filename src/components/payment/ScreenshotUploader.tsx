import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader2, Upload } from 'lucide-react';
import Image from 'next/image';
import { uploadToCloudinary } from '@/utils/uploadToCloudinary';
import { toast } from 'sonner';

interface ScreenshotUploaderProps {
  screenshotUrl: string;
  setScreenshotUrl: React.Dispatch<React.SetStateAction<string>>;
}

export function ScreenshotUploader({ screenshotUrl, setScreenshotUrl }: ScreenshotUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const url = await uploadToCloudinary(file);
      setScreenshotUrl(url);
      toast.success('Screenshot uploaded successfully');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Failed to upload screenshot');
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">Upload Payment Screenshot</label>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 w-full sm:w-auto">
            <div className="flex flex-col items-center space-y-2">
              <Input
                type="file"
                accept="image/*"
                id="payment-screenshot-upload"
                onChange={handleFileUpload}
                className="hidden"
              />

              {!screenshotUrl ? (
                <>
                  <Upload className="h-8 w-8 text-gray-500" />
                  <p className="text-sm text-gray-500">Upload payment proof</p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => document.getElementById('payment-screenshot-upload')?.click()}
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
                  onClick={() => document.getElementById('payment-screenshot-upload')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? 'Uploading...' : 'Change Image'}
                </Button>
              )}
            </div>
          </div>

          {screenshotUrl && (
            <div className="relative w-full sm:w-48 h-40 rounded-md overflow-hidden border border-gray-200">
              <Image src={screenshotUrl} alt="Payment Screenshot" className="object-cover" fill />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
