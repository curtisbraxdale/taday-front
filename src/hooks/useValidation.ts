import { useState } from 'react';
import { FormErrors } from '@/types';

interface ValidationRules {
  [key: string]: {
    required?: boolean;
    email?: boolean;
    phone?: boolean;
    minLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean;
  };
}

export const useValidation = (rules: ValidationRules) => {
  const [errors, setErrors] = useState<FormErrors>({});

  const validateField = (name: string, value: string): string => {
    const rule = rules[name];
    if (!rule) return '';

    if (rule.required && !value.trim()) {
      return `${name} is required`;
    }

    if (rule.email && value && !isValidEmail(value)) {
      return 'Please enter a valid email address';
    }

    if (rule.phone && value && !isValidPhone(value)) {
      return 'Please enter a valid phone number (XXX-XXX-XXXX)';
    }

    if (rule.minLength && value && value.length < rule.minLength) {
      return `${name} must be at least ${rule.minLength} characters`;
    }

    if (rule.pattern && value && !rule.pattern.test(value)) {
      if (name === 'password') {
        return 'Password must contain at least 1 uppercase letter and 1 number';
      }
      return `${name} format is invalid`;
    }

    if (rule.custom && value && !rule.custom(value)) {
      return `${name} is invalid`;
    }

    return '';
  };

  const validateForm = (data: Record<string, string>): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    Object.keys(rules).forEach(field => {
      const error = validateField(field, data[field] || '');
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const clearErrors = () => setErrors({});

  const clearFieldError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return {
    errors,
    validateField,
    validateForm,
    clearErrors,
    clearFieldError,
  };
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
};