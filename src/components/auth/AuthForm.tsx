
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LogIn, UserPlus, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { supabase } from '@/utils/supabase';
import { toast } from '@/hooks/use-toast';
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
import { cn } from '@/lib/utils';
import { useAppContext } from '@/context/AppContext';

type AuthMode = 'signin' | 'signup';

const emailSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

const AuthForm = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAppContext();

  // Redirect if already authenticated
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSignIn = async (data: z.infer<typeof emailSchema>) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;
      
      toast({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: 'Sign in failed',
        description: error.message || 'Please check your credentials and try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: z.infer<typeof emailSchema>) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) throw error;
      
      toast({
        title: 'Account created!',
        description: 'Please check your email to confirm your account.',
      });
      
      // Switch to sign-in mode after successful signup
      setMode('signin');
    } catch (error: any) {
      toast({
        title: 'Sign up failed',
        description: error.message || 'There was a problem creating your account.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    if (mode === 'signin') {
      await handleSignIn(data);
    } else {
      await handleSignUp(data);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    form.reset();
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6 p-6 bg-card rounded-lg border shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {mode === 'signin' ? 'Sign In' : 'Create an Account'}
        </h1>
        <p className="text-muted-foreground">
          {mode === 'signin'
            ? 'Enter your credentials to access your account'
            : 'Fill in the details below to create your account'}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="you@example.com"
                      className="pl-10"
                      {...field}
                      disabled={loading}
                    />
                  </div>
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
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      {...field}
                      disabled={loading}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {mode === 'signin' && (
            <div className="flex justify-end">
              <Button
                variant="link"
                className="px-0 font-normal"
                type="button"
                onClick={() => toast({
                  title: "Password reset",
                  description: "This feature is coming soon. Please contact support for assistance."
                })}
              >
                Forgot password?
              </Button>
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <span className="mr-2">Loading...</span>
              </span>
            ) : (
              <span className="flex items-center justify-center">
                {mode === 'signin' ? (
                  <>
                    <LogIn className="mr-2 h-4 w-4" />
                    Sign In
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Create Account
                  </>
                )}
              </span>
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        {mode === 'signin' ? (
          <p>
            Don't have an account?{' '}
            <Button variant="link" onClick={toggleMode} className="px-0 font-normal">
              Sign up
            </Button>
          </p>
        ) : (
          <p>
            Already have an account?{' '}
            <Button variant="link" onClick={toggleMode} className="px-0 font-normal">
              Sign in
            </Button>
          </p>
        )}
      </div>

      {!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY && (
        <div className="p-3 bg-destructive/10 rounded-md flex items-start mt-6">
          <AlertCircle className="h-5 w-5 text-destructive mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-destructive">
            Supabase credentials are missing. Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> environment variables to enable authentication.
          </p>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
