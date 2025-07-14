import { useEffect, useState } from 'react';
import { TypewriterText } from '../dashboard/TypewriterText';
import { PixelStar } from '@/components/icons/PixelIcons';

export const SuccessPage = () => {
  const [showRedirectMessage, setShowRedirectMessage] = useState(false);

  useEffect(() => {
    // Redirect to dashboard after 2 seconds
    const redirectTimer = setTimeout(() => {
      window.location.href = '/';
    }, 2000);

    return () => clearTimeout(redirectTimer);
  }, []);

  const handleThankYouComplete = () => {
    setShowRedirectMessage(true);
  };

  return (
    <div className="min-h-screen bg-taday-background flex items-center justify-center p-4">
      <div className="text-center max-w-md mx-auto">
        <div className="win98-card p-8 space-y-6">
          {/* Success Icon */}
          <div className="mx-auto mb-6">
            <PixelStar size="lg" />
          </div>

          {/* Thank You Message */}
          <div>
            <h1 className="text-2xl font-header font-bold text-taday-primary mb-4">
              <TypewriterText 
                text="Thanks for your support!" 
                speed={80} 
                onComplete={handleThankYouComplete}
              />
            </h1>
            
            <div className="text-taday-secondary font-mono min-h-[1.5rem]">
              {showRedirectMessage && (
                <TypewriterText 
                  text="Redirecting you to the dashboard..."
                  speed={80}
                />
              )}
            </div>
          </div>

          {/* Loading indicator */}
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-taday-accent"></div>
          </div>
        </div>
      </div>
    </div>
  );
};