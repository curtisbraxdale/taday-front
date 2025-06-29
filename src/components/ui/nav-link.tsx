import { DivideIcon as LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
  onClick?: () => void;
}

export const NavLink = ({ href, icon: Icon, children, onClick }: NavLinkProps) => {
  const isActive = window.location.pathname === href;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.history.pushState({}, '', href);
    window.dispatchEvent(new PopStateEvent('popstate'));
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200',
        isActive
          ? 'bg-taday-accent text-white'
          : 'text-taday-secondary hover:bg-taday-background hover:text-taday-primary'
      )}
    >
      <Icon className="h-4 w-4" />
      {children}
    </a>
  );
};