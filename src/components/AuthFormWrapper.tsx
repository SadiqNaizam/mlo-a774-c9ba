import React, { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldCheck } from 'lucide-react'; // Using ShieldCheck as a placeholder logo icon
import { cn } from "@/lib/utils"; // For combining classNames

interface AuthFormWrapperProps {
  title: string;
  description?: string;
  children: ReactNode;
  logoSrc?: string;
  logoAlt?: string;
  className?: string; // To allow additional Tailwind classes for the Card
}

const AuthFormWrapper: React.FC<AuthFormWrapperProps> = ({
  title,
  description,
  children,
  logoSrc,
  logoAlt = "Application Logo",
  className,
}) => {
  console.log('AuthFormWrapper loaded with title:', title);

  return (
    <Card className={cn("w-full max-w-md", className)}>
      <CardHeader className="space-y-2 text-center p-6">
        {logoSrc ? (
          <img 
            src={logoSrc} 
            alt={logoAlt} 
            className="mx-auto h-12 w-auto mb-4" // Logo above title
          />
        ) : (
          <ShieldCheck 
            className="mx-auto h-10 w-10 text-primary mb-4" // Placeholder icon
            aria-label={logoAlt} 
          />
        )}
        <CardTitle className="text-2xl font-bold tracking-tight">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-muted-foreground pt-1">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="p-6 pt-0"> {/* pt-0 to reduce space if header already has padding */}
        {children}
      </CardContent>
    </Card>
  );
};

export default AuthFormWrapper;