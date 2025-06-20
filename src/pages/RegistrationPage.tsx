import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const registrationFormSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long." }),
  confirmPassword: z.string().min(8, { message: "Password must be at least 8 characters long." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // Set error on confirmPassword field
});

type RegistrationFormValues = z.infer<typeof registrationFormSchema>;

const RegistrationPage: React.FC = () => {
  console.log('RegistrationPage loaded');
  const navigate = useNavigate();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegistrationFormValues) => {
    console.log('Registration form submitted:', data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success/error
    const isSuccess = true; // Change to false to test error

    if (isSuccess) {
      toast.success("Account created successfully!", {
        description: "You can now log in with your new credentials.",
      });
      navigate('/'); // Navigate to LoginPage (path "/" from App.tsx)
    } else {
      // Example error handling, e.g., if email is already taken
      // form.setError("email", { type: "manual", message: "This email is already registered." });
      toast.error("Registration failed.", {
        description: "Please check your details and try again.",
      });
    }
  };

  // A simple no-op function for onLogout as it's not relevant here
  const handleLogout = () => {
    console.log("Logout action triggered (no-op on registration page)");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header isAuthenticated={false} onLogout={handleLogout} />
      <main className="flex flex-1 flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
        <AuthFormWrapper
          title="Create an Account"
          description="Enter your details below to register for AuthSecure."
          className="w-full max-w-md"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="yourname@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
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
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="********" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>
          </Form>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/" className="font-medium text-primary hover:underline">
              Log in
            </Link>
          </p>
        </AuthFormWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default RegistrationPage;