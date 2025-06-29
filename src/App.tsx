import { useState, useEffect } from 'react';
import { AuthPage } from '@/components/auth/AuthPage';
import { Layout } from '@/components/layout/Layout';
import { Dashboard } from '@/components/dashboard/Dashboard';
import { Events } from '@/components/events/Events';
import { Todos } from '@/components/todos/Todos';
import { Settings } from '@/components/settings/Settings';
import { useAuth } from '@/hooks/useAuth';

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState('/');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
  };

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

  if (!isAuthenticated) {
    return <AuthPage />;
  }

  const renderCurrentPage = () => {
    switch (currentRoute) {
      case '/events':
        return <Events />;
      case '/todos':
        return <Todos />;
      case '/settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentRoute={currentRoute} onNavigate={handleNavigate}>
      {renderCurrentPage()}
    </Layout>
  );
}

export default App;