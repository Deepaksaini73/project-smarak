import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface FormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function FormLayout({ title, description, children }: FormLayoutProps) {
  return (
    <Card className="max-w-4xl mx-auto shadow-xl border border-gray-200 overflow-hidden bg-[#fefbed]">
      <CardHeader className="space-y-1 py-6">
        <CardTitle className="text-2xl font-bold text-center text-gray-800 font-outfit">
          {title}
        </CardTitle>
        <CardDescription className="text-center text-gray-600 font-quicksand">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="px-6 sm:px-8 pb-10">{children}</CardContent>
    </Card>
  );
}
