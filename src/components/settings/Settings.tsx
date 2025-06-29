import { useState, useEffect } from 'react';
import { TypewriterText } from '../dashboard/TypewriterText';
import { PixelUser } from '@/components/icons/PixelIcons';
import { useAuth } from '@/hooks/useAuth';
import { useValidation } from '@/hooks/useValidation';
import { showWin98Toast } from '@/lib/win98-toast';

const validationRules = {
  name: { required: true, minLength: 2 },
  email: { required: true, email: true },
  phone: { phone: true },
  password: { 
    minLength: 8,
    pattern: /^(?=.*[A-Z])(?=.*\d).{8,}$/,
  },
  confirmPassword: {},
};

export const Settings = () => {
  const { user, updateUser, deleteAccount } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [showSubtext, setShowSubtext] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [originalData, setOriginalData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { errors, validateForm, clearFieldError } = useValidation(validationRules);

  // Initialize form data with user information
  useEffect(() => {
    if (user) {
      const userData = {
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        password: '',
        confirmPassword: '',
      };
      setFormData(userData);
      setOriginalData(userData);
    }
  }, [user]);

  const handleHeaderComplete = () => {
    setShowSubtext(true);
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // If currently editing, this acts as cancel
      handleDiscardChanges();
    } else {
      // Start editing
      setIsEditing(true);
      setOriginalData({ ...formData });
      setIsPasswordChanged(false);
      setFormData(prev => ({
        ...prev,
        password: '',
        confirmPassword: '',
      }));
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Track if password field has been modified
    if (field === 'password') {
      setIsPasswordChanged(value !== '');
    }
    
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

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    handleInputChange('phone', formatted);
  };

  const handleSaveChanges = async () => {
    // Create validation data - exclude password validation if not changed
    const validationData = { ...formData };
    
    // If password wasn't changed, don't validate it
    if (!isPasswordChanged) {
      const { password, confirmPassword, ...dataWithoutPassword } = validationData;
      Object.assign(validationData, dataWithoutPassword);
    }

    // Custom validation for password confirmation only if password was changed
    if (isPasswordChanged) {
      if (!formData.password) {
        showWin98Toast('Password is required', 'error');
        return;
      }
      
      if (!formData.confirmPassword) {
        showWin98Toast('Please confirm your password', 'error');
        return;
      }
      
      if (formData.password !== formData.confirmPassword) {
        showWin98Toast('Passwords do not match', 'error');
        return;
      }

      // Validate password format
      if (formData.password.length < 8) {
        showWin98Toast('Password must be at least 8 characters', 'error');
        return;
      }

      if (!/^(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)) {
        showWin98Toast('Password must contain at least 1 uppercase letter and 1 number', 'error');
        return;
      }
    }

    // Validate other fields
    const fieldsToValidate = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
    };

    if (!validateForm(fieldsToValidate)) {
      showWin98Toast('Please fix the errors below', 'error');
      return;
    }

    setIsLoading(true);
    
    try {
      // Prepare update data
      const updateData: {
        name?: string;
        email?: string;
        password?: string;
        phone?: string;
      } = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
      };

      // Only include password if it was changed
      if (isPasswordChanged) {
        updateData.password = formData.password;
      }

      const success = await updateUser(updateData);
      
      if (success) {
        setIsEditing(false);
        setIsPasswordChanged(false);
        setOriginalData({ 
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: '',
          confirmPassword: '',
        });
        setFormData(prev => ({
          ...prev,
          password: '',
          confirmPassword: '',
        }));
        showWin98Toast('Settings saved successfully!', 'success');
      }
    } catch (error) {
      showWin98Toast('Failed to save settings', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDiscardChanges = () => {
    setFormData({ ...originalData });
    setIsEditing(false);
    setIsPasswordChanged(false);
    showWin98Toast('Changes discarded', 'info');
  };

  const handleDeleteAccount = async () => {
    if (!showDeleteConfirm) {
      setShowDeleteConfirm(true);
      return;
    }

    setIsLoading(true);
    try {
      await deleteAccount();
    } catch (error) {
      showWin98Toast('Failed to delete account', 'error');
    } finally {
      setIsLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  // Get display values for each field
  const getDisplayValue = (field: string) => {
    if (field === 'password') {
      if (!isEditing) {
        return '••••••••'; // Always show masked when not editing
      } else {
        return formData.password; // Show actual value when editing
      }
    }
    return formData[field as keyof typeof formData];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-header font-bold text-taday-primary mb-2">
          <TypewriterText text="Settings" speed={80} onComplete={handleHeaderComplete} />
        </h1>
        <div className="text-taday-secondary font-mono min-h-[1.5rem]">
          {showSubtext && (
            <TypewriterText 
              text="Manage your account information and preferences."
              speed={80}
            />
          )}
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="win98-card p-6 space-y-6">
          {/* Header with icon and edit toggle */}
          <div className="flex items-center justify-between border-b-2 border-taday-win98-darkGray pb-4" style={{ borderStyle: 'inset' }}>
            <div className="flex items-center gap-3">
              <PixelUser size="lg" />
              <h2 className="text-lg font-header font-bold text-taday-primary">Account Information</h2>
            </div>
            <button
              onClick={handleEditToggle}
              className={`win98-button font-mono ${isEditing ? 'bg-taday-error text-white' : ''}`}
              disabled={isLoading}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Name */}
            <div className="space-y-2">
              <label htmlFor="name" className="win98-label">Full Name</label>
              <input
                id="name"
                type="text"
                value={getDisplayValue('name')}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={`win98-input w-full ${errors.name ? 'border-taday-error' : ''} ${!isEditing ? 'bg-taday-win98-lightGray' : ''}`}
                disabled={!isEditing || isLoading}
                readOnly={!isEditing}
              />
              {errors.name && (
                <p className="text-xs text-taday-error font-mono">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="win98-label">Email Address</label>
              <input
                id="email"
                type="email"
                value={getDisplayValue('email')}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={`win98-input w-full ${errors.email ? 'border-taday-error' : ''} ${!isEditing ? 'bg-taday-win98-lightGray' : ''}`}
                disabled={!isEditing || isLoading}
                readOnly={!isEditing}
              />
              {errors.email && (
                <p className="text-xs text-taday-error font-mono">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label htmlFor="phone" className="win98-label">Phone Number</label>
              <input
                id="phone"
                type="tel"
                placeholder={!isEditing && !formData.phone ? "Not provided" : "XXX-XXX-XXXX"}
                value={getDisplayValue('phone')}
                onChange={(e) => handlePhoneChange(e.target.value)}
                className={`win98-input w-full ${errors.phone ? 'border-taday-error' : ''} ${!isEditing ? 'bg-taday-win98-lightGray' : ''}`}
                disabled={!isEditing || isLoading}
                readOnly={!isEditing}
                maxLength={12}
              />
              {errors.phone && (
                <p className="text-xs text-taday-error font-mono">{errors.phone}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label htmlFor="password" className="win98-label">Password</label>
              <input
                id="password"
                type={!isEditing ? "text" : "password"}
                value={getDisplayValue('password')}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className={`win98-input w-full ${errors.password ? 'border-taday-error' : ''} ${!isEditing ? 'bg-taday-win98-lightGray' : ''}`}
                disabled={!isEditing || isLoading}
                readOnly={!isEditing}
                placeholder={isEditing ? "Enter new password (leave empty to keep current)" : ""}
              />
              {errors.password && (
                <p className="text-xs text-taday-error font-mono">{errors.password}</p>
              )}
              {isEditing && (
                <p className="text-xs text-taday-secondary font-mono">
                  Leave empty to keep current password. If changing: 8+ characters with 1 uppercase letter and 1 number
                </p>
              )}
            </div>

            {/* Confirm Password - Only show when editing AND password has been changed */}
            {isEditing && isPasswordChanged && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="win98-label">Confirm New Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className={`win98-input w-full ${errors.confirmPassword ? 'border-taday-error' : ''}`}
                  disabled={isLoading}
                  placeholder="Confirm your new password"
                />
                {errors.confirmPassword && (
                  <p className="text-xs text-taday-error font-mono">{errors.confirmPassword}</p>
                )}
                {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <p className="text-xs text-taday-error font-mono">Passwords do not match</p>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons - Only show when editing */}
          {isEditing && (
            <div className="flex gap-3 pt-4 border-t-2 border-taday-win98-darkGray" style={{ borderStyle: 'inset' }}>
              <button
                onClick={handleSaveChanges}
                className="win98-button flex-1 font-mono bg-taday-accent text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                onClick={handleDiscardChanges}
                className="win98-button flex-1 font-mono"
                disabled={isLoading}
              >
                Discard Changes
              </button>
            </div>
          )}

          {/* Danger Zone */}
          {!isEditing && (
            <div className="pt-4 border-t-2 border-taday-win98-darkGray" style={{ borderStyle: 'inset' }}>
              <h3 className="text-sm font-header font-bold text-taday-error mb-3">Danger Zone</h3>
              <div className="space-y-2">
                <p className="text-xs text-taday-secondary font-mono">
                  Once you delete your account, there is no going back. Please be certain.
                </p>
                <button
                  onClick={handleDeleteAccount}
                  className={`win98-button w-full font-mono ${showDeleteConfirm ? 'bg-taday-error text-white' : ''}`}
                  disabled={isLoading}
                >
                  {showDeleteConfirm 
                    ? (isLoading ? 'Deleting...' : 'Click again to confirm deletion')
                    : 'Delete Account'
                  }
                </button>
                {showDeleteConfirm && (
                  <button
                    onClick={() => setShowDeleteConfirm(false)}
                    className="win98-button w-full font-mono"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};