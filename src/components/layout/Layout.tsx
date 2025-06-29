import { Topbar } from './Topbar';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const Layout = ({ children, currentRoute, onNavigate }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-taday-background">
      <Topbar currentRoute={currentRoute} onNavigate={onNavigate} />
      
      <main className="p-6">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};