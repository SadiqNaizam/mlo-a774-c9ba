import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Mail } from 'lucide-react';

import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import AuthFormWrapper from '../../components/AuthFormWrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordPage = () => {
  console.log('ForgotPasswordPage loaded');
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordFormValues) => {
    console.log('Password reset requested for:', data.email);
    // Simulate API call
    toast.success(`Password reset link sent to ${data.email}`, {
      description: "Please check your inbox (and spam folder).",
    });
    // Optionally, redirect or clear form
    // form.reset();
    // navigate('/'); // Navigate back to login after a delay or on user action
  };

  const handleLogout = () => {
    // This function is required by Header but not strictly used on auth pages
    // If there was a "logout" action even for a non-authenticated state (e.g. clear session remnants)
    console.log("Logout action triggered from Forgot Password page header");
    navigate("/"); // Redirect to login page
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      <Header isAuthenticated={false} onLogout={handleLogout} />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <AuthFormWrapper
          title="Forgot Your Password?"
          description="No problem. Enter your email address below and we'll send you a link to reset it."
          logoSrc="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" // Example logo
          logoAlt="AuthSecure System"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email Address</FormLabel>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="you@example.com" 
                          {...field} 
                          className="pl-10" // Add padding for the icon
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send Reset Link'}
              </Button>
            </form>
          </Form>
          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Remember your password?{' '}
              <Link to="/" className="font-medium text-primary hover:text-primary/80">
                Log in here
              </Link>
            </p>
          </div>
        </AuthFormWrapper>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPasswordPage;