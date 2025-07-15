import { useState, useEffect } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Events } from '@/components/events/Events';
import { Todos } from '@/components/todos/Todos';
import { Settings } from '@/components/settings/Settings';
import { SuccessPage } from '@/components/stripe/SuccessPage';
import { CancelPage } from '@/components/stripe/CancelPage';
import { useAuth } from '@/hooks/useAuth';

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState('/');

  useEffect(() => {
    // Set initial route from URL
    const path = window.location.pathname;
    setCurrentRoute(path);
    
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-taday-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-taday-accent mx-auto mb-4"></div>
          <p className="text-taday-secondary font-mono">Loading...</p>
        </div>
      </div>
    );
  }

  // Route rendering logic
  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/success':
        return <SuccessPage />;
      case '/cancel':
        return <CancelPage />;
      case '/events':
        return isAuthenticated ? <Events /> : <AuthPage />;
      case '/todos':
        return isAuthenticated ? <Todos /> : <AuthPage />;
      case '/settings':
        return isAuthenticated ? <Settings /> : <AuthPage />;
      default:
        return isAuthenticated ? <Dashboard /> : <AuthPage />;
    }
  };

  return (
    <div>
      {(currentRoute === '/success' || currentRoute === '/cancel') ? (
        // Show success/cancel pages without layout
        renderCurrentPage()
      ) : isAuthenticated ? (
        // Show main app with layout
        <Layout currentRoute={currentRoute} onNavigate={handleNavigate}>
          {renderCurrentPage()}
        </Layout>
      ) : (
        // Show auth page for unauthenticated users
        <AuthPage />
      )}
    </div>
  );
}

export default App;