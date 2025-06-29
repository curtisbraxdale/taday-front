import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useValidation } from '@/hooks/useValidation';
import { showWin98Toast } from '@/lib/win98-toast';

interface RegisterFormProps {
  onToggleMode: () => void;
}

const validationRules = {
  name: { required: true, minLength: 2 },
  email: { required: true, email: true },
  phone: { phone: true },
  password: { 
    required: true, 
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  },
};

export const RegisterForm = ({ onToggleMode }: RegisterFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { errors, validateForm, clearFieldError } = useValidation(validationRules);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm(formData)) {
      showWin98Toast('Please fix the errors below', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      const success = await register(formData);
      if (success) {
        showWin98Toast('Account created successfully!', 'success');
        // The useAuth hook will handle the state update and trigger re-render
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

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) return numbers;
    if (numbers.length <= 6) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`;
  };

  return (
    <div className="animate-fade-in p-6">
      <div className="space-y-1 mb-6">
        <h1 className="text-2xl font-header text-center font-bold">Create account</h1>
        <p className="text-center text-sm font-mono text-taday-secondary">
          Enter your information to get started
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="win98-label">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`win98-input w-full ${errors.name ? 'border-taday-error' : ''}`}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-xs text-taday-error font-mono">{errors.name}</p>
          )}
        </div>

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
          <label htmlFor="phone" className="win98-label">Phone (optional)</label>
          <input
            id="phone"
            type="tel"
            placeholder="XXX-XXX-XXXX"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
            className={`win98-input w-full ${errors.phone ? 'border-taday-error' : ''}`}
            disabled={isLoading}
            maxLength={12}
          />
          {errors.phone && (
            <p className="text-xs text-taday-error font-mono">{errors.phone}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="win98-label">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className={`win98-input w-full ${errors.password ? 'border-taday-error' : ''}`}
            disabled={isLoading}
          />
          {errors.password && (
            <p className="text-xs text-taday-error font-mono">{errors.password}</p>
          )}
          <p className="text-xs text-taday-secondary font-mono">
            Must be 8+ characters with 1 uppercase letter and 1 number
          </p>
        </div>

        <button 
          type="submit" 
          className="win98-button w-full py-3 font-mono"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-xs text-taday-secondary font-mono">
          Already have an account?{' '}
          <button
            onClick={onToggleMode}
            className="text-taday-primary hover:underline font-mono"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};