
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Mail, Lock, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const navigate = useNavigate();
  const { login, signup } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || (mode === 'signup' && !name)) {
      toast.error('Please fill in all fields');
      return;
    }
    
    try {
      setIsLoading(true);
      
      if (mode === 'login') {
        await login(email, password);
        toast.success('Logged in successfully!');
      } else {
        await signup(email, password, name);
        toast.success('Account created successfully!');
      }
      
      navigate('/');
    } catch (error) {
      toast.error(mode === 'login' ? 'Login failed' : 'Signup failed');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-card rounded-3xl p-8 w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-pawblue-400 text-white p-4 rounded-full animate-float">
            <PawPrint size={40} />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-center mb-2">Pawnder</h1>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8">
          {mode === 'login' ? 'Sign in to your account' : 'Create a new account'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-pawblue-500 hover:bg-pawblue-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === 'login' ? 'Signing in...' : 'Creating account...'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate('/signup')} 
                className="p-0 text-pawblue-500 hover:text-pawblue-700"
              >
                Sign up
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Button 
                variant="link" 
                onClick={() => navigate('/login')} 
                className="p-0 text-pawblue-500 hover:text-pawblue-700"
              >
                Sign in
              </Button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
