import { NavLink } from '@/components/ui/nav-link';
import { Calendar, CheckSquare, BarChart3, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  isMobile: boolean;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: BarChart3 },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Todos', href: '/todos', icon: CheckSquare },
];

export const Sidebar = ({ isOpen, onClose, isMobile }: SidebarProps) => {
  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-border transition-transform duration-300 ease-in-out
          lg:relative lg:translate-x-0 lg:z-auto
          ${isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : ''}
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <h2 className="text-lg font-header font-semibold text-taday-primary">Menu</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              href={item.href}
              icon={item.icon}
              onClick={isMobile ? onClose : undefined}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};