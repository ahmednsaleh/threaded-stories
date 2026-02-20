import * as React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// A simple Google icon component to avoid external dependencies
const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.51H18.35C18.04 16.1 17.22 17.43 16.05 18.27V21.09H20.2C21.73 19.33 22.56 16.99 22.56 14.08V12.25Z" fill="#4285F4"/>
    <path d="M12 23C15.24 23 17.95 21.92 19.78 20.19L15.6 17.37C14.53 18.11 13.31 18.52 12 18.52C9.45 18.52 7.27 16.92 6.53 14.61H2.25V17.42C4.09 20.86 7.72 23 12 23Z" fill="#34A853"/>
    <path d="M6.53 14.61C6.27 13.88 6.13 13.1 6.13 12.31C6.13 11.52 6.27 10.73 6.53 10L2.25 7.18C1.47 8.71 1 10.45 1 12.31C1 14.17 1.47 15.91 2.25 17.42L6.53 14.61Z" fill="#FBBC05"/>
    <path d="M12 6.13C13.43 6.13 14.66 6.6 15.54 7.4L19.86 3.08C17.95 1.32 15.24 0 12 0C7.72 0 4.09 2.14 2.25 5.58L6.53 8.39C7.27 6.08 9.45 4.48 12 4.48V6.13Z" fill="#EA4335"/>
  </svg>
);


export default function Auth() {
  const navigate = useNavigate();
  const { user, loading, signInWithGoogle } = useAuth();
  const [isSigningIn, setIsSigningIn] = useState(false);

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [user, loading, navigate]);

  const handleLogin = async () => {
    setIsSigningIn(true);
    const { error } = await signInWithGoogle();
    
    if (error) {
      toast.error('Failed to sign in', {
        description: error.message,
      });
      setIsSigningIn(false);
    }
    // Don't reset isSigningIn on success - we're redirecting to OAuth
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FAFAFA] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#C2410C]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#FAFAFA] flex flex-col items-center justify-center p-4 selection:bg-[#C2410C]/20">
      
      {/* Logo */}
      <div 
        onClick={() => navigate('/')} 
        className="flex-shrink-0 cursor-pointer mb-8"
      >
        <Logo />
      </div>

      <Card className="w-full max-w-sm border-[#E2E8F0] shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 rounded-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-[#2C3E50] text-2xl font-bold tracking-tight">Access Your Dashboard</CardTitle>
          <CardDescription className="text-slate-600 text-base pt-2 font-medium">
            Sign in to start finding high-intent leads.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6 pb-8">
          
          {/* Social Login */}
          <Button 
            className="w-full h-12 bg-[#C2410C] hover:bg-[#9A3412] text-white font-medium rounded-full transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 text-base"
            onClick={handleLogin}
            disabled={isSigningIn}
          >
            {isSigningIn ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <div className="bg-white p-1 rounded-full mr-3 flex items-center justify-center">
                  <GoogleIcon />
                </div>
                <span>Sign in with Google</span>
              </>
            )}
          </Button>

        </CardContent>
      </Card>
      
      <p className="text-center text-sm text-slate-500 mt-8 max-w-xs font-medium">
        By continuing, you agree to the Threaddits <a href="/terms" className="text-slate-700 underline hover:text-slate-900">Terms of Service</a> and <a href="/privacy" className="text-slate-700 underline hover:text-slate-900">Privacy Policy</a>.
      </p>

    </div>
  );
}
