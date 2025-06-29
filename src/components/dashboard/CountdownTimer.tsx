import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetHour?: number;
  className?: string;
  delay?: number;
}

export const CountdownTimer = ({ targetHour = 8, className = '', delay = 0 }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [hasStarted, setHasStarted] = useState(delay === 0);

  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date();
    target.setHours(targetHour, 0, 0, 0);

    // If current time is past 8 AM today, set target to 8 AM tomorrow
    if (now >= target) {
      target.setDate(target.getDate() + 1);
    }

    const diff = target.getTime() - now.getTime();
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle delay before starting
  useEffect(() => {
    if (delay > 0) {
      const delayTimeout = setTimeout(() => {
        setHasStarted(true);
      }, delay);

      return () => clearTimeout(delayTimeout);
    }
  }, [delay]);

  // Update time every second
  useEffect(() => {
    const updateTimer = () => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetHour]);

  const staticText = "Next agenda text: ";
  const fullText = `${staticText}${timeLeft}`;

  // Initial typewriter effect (only runs once)
  useEffect(() => {
    if (hasStarted && !hasAnimated && timeLeft && currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else if (hasStarted && !hasAnimated && timeLeft && currentIndex >= fullText.length) {
      setIsTypingComplete(true);
      setHasAnimated(true);
    }
  }, [currentIndex, fullText, hasAnimated, timeLeft, hasStarted]);

  // Update only the time part after animation is complete
  useEffect(() => {
    if (hasAnimated && timeLeft) {
      setDisplayText(`${staticText}${timeLeft}`);
    }
  }, [timeLeft, hasAnimated, staticText]);

  // Cursor blinking
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <p className={`text-taday-secondary text-lg font-mono ${className}`}>
      {displayText}
      {hasStarted && !isTypingComplete && (
        <span className={`inline-block w-0.5 h-5 bg-taday-secondary ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
          |
        </span>
      )}
    </p>
  );
};