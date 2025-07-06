import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useValidation } from '@/hooks/useValidation';
import { showWin98Toast } from '@/lib/win98-toast';

interface LoginFormProps {
  onToggleMode: () => void;
}

const validationRules = {
  email: { required: true, email: true },
  password: { required: true, minLength: 8 },
};

export const LoginForm = ({ onToggleMode }: LoginFormProps) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { errors, validateForm, clearFieldError } = useValidation(validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      showWin98Toast('Please fix the errors below', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        showWin98Toast('Welcome back!', 'success');
        // Redirect to dashboard after successful login
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
      // Error handling is done in the useAuth hook
    } catch (error) {
      showWin98Toast('Something went wrong. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      clearFieldError(field);
    }
  };

  return (
    <div className="animate-fade-in p-6">
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-header text-center font-bold">Welcome back</h1>
        <p className="text-center text-sm font-mono text-taday-secondary">
          Enter your credentials to access your account
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="win98-label">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`win98-input w-full ${errors.email ? 'border-taday-error' : ''}`}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="text-xs text-taday-error font-mono">{errors.email}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="win98-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`win98-input w-full ${errors.password ? 'border-taday-error' : ''}`}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-xs text-taday-error font-mono">{errors.password}</p>
          )}
        </div>

        <button 
          type="submit" 
          className="win98-button w-full py-3 font-mono"
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-taday-secondary font-mono">
          Don't have an account?{' '}
          <button
            onClick={onToggleMode}
            className="text-taday-primary hover:underline font-mono"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};