import { useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  delay?: number;
  onComplete?: () => void;
}

export const TypewriterText = ({ 
  text, 
  speed = 100, 
  className = '', 
  delay = 0,
  onComplete 
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(delay === 0);

  // Handle delay before starting
  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);

      return () => clearTimeout(delayTimeout);
    }
  }, [delay]);

  // Typewriter effect
  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (hasStarted && currentIndex >= text.length) {
      setIsTypingComplete(true);
      onComplete?.();
    }
  }, [currentIndex, text, speed, hasStarted, onComplete]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayText}
      {hasStarted && !isTypingComplete && (
        <span className={`inline-block w-0.5 h-6 bg-taday-primary ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          |
        </span>
      )}
    </span>
  );
};