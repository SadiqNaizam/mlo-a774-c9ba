import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import AuthFormWrapper from '@/components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";

const passwordResetFormSchema = z.object({
  newPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // Show error on confirmPassword field
});

type PasswordResetFormValues = z.infer<typeof passwordResetFormSchema>;

const PasswordResetPage: React.FC = () => {
  console.log('PasswordResetPage loaded');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [resetToken, setResetToken] = useState<string | null>(null);
  const [isTokenInvalid, setIsTokenInvalid] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      setResetToken(token);
      // In a real app, you might validate the token with the backend here
      // For this example, we'll assume it's valid if present
      setIsTokenInvalid(false);
    } else {
      setIsTokenInvalid(true);
      toast.error("Invalid or missing password reset token.");
    }
  }, [searchParams]);

  const form = useForm<PasswordResetFormValues>({
    resolver: zodResolver(passwordResetFormSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PasswordResetFormValues) => {
    if (!resetToken || isTokenInvalid) {
      toast.error("Cannot reset password without a valid token.");
      return;
    }
    setIsLoading(true);
    console.log("Password Reset Submitted:", { token: resetToken, ...data });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success/failure
    const isSuccess = Math.random() > 0.2; // 80% chance of success for demo

    if (isSuccess) {
      toast.success("Your password has been reset successfully! You can now log in.", {
        duration: 5000,
      });
      navigate('/login'); // Navigate to login page - path from App.tsx
    } else {
      toast.error("Failed to reset password. The token might be invalid or expired. Please request a new link.", {
        duration: 5000,
      });
    }
    setIsLoading(false);
  };

  const handleLogout = () => {
    // No active session on this page, but Header expects it
    console.log("Logout triggered (no-op on PasswordResetPage)");
    navigate('/login');
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/20">
      <Header isAuthenticated={false} onLogout={handleLogout} />
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormWrapper
          title="Reset Your Password"
          description="Enter and confirm your new password below."
          className="w-full max-w-md"
        >
          {isTokenInvalid ? (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Invalid Link</AlertTitle>
              <AlertDescription>
                The password reset link is invalid or has expired. Please <Link to="/forgot-password" className="font-medium text-primary hover:underline">request a new one</Link>.
              </AlertDescription>
            </Alert>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
              </form>
            </Form>
          )}
        </AuthFormWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default PasswordResetPage;