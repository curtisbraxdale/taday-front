// Custom Windows 98 style toast notification system
let toastContainer: HTMLElement | null = null;

interface ToastOptions {
  duration?: number;
  position?: 'top-center' | 'top-right' | 'bottom-center' | 'bottom-right';
}

export function showWin98Toast(
  message: string, 
  type: 'success' | 'error' | 'info' = 'info',
  options: ToastOptions = {}
) {
  const { duration = 3000, position = 'top-center' } = options;

  // Create container if it doesn't exist
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = getContainerClasses(position);
    document.body.appendChild(toastContainer);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = `win98-toast ${type} p-3 mb-2 animate-fade-in`;
  toast.textContent = message;

  // Add to container
  toastContainer.appendChild(toast);

  // Auto remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease-out';
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  }, duration);

  return toast;
}

function getContainerClasses(position: string): string {
  const baseClasses = 'fixed z-50 pointer-events-none';
  
  switch (position) {
    case 'top-center':
      return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2`;
    case 'top-right':
      return `${baseClasses} top-4 right-4`;
    case 'bottom-center':
      return `${baseClasses} bottom-4 left-1/2 transform -translate-x-1/2`;
    case 'bottom-right':
      return `${baseClasses} bottom-4 right-4`;
    default:
      return `${baseClasses} top-4 left-1/2 transform -translate-x-1/2`;
  }
}