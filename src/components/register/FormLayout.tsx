import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ReactNode } from 'react';

interface FormLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function FormLayout({ title, description, children }: FormLayoutProps) {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 md:py-12">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
          <CardDescription className="text-center">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
}
