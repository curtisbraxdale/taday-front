import { cn } from '@/lib/utils';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
  onClick?: () => void;
  className?: string;
}

export const NavLink = ({ href, children, icon: Icon, onClick, className }: NavLinkProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
        'text-taday-secondary hover:text-taday-primary hover:bg-muted',
        className
      )}
    >
      {Icon && <Icon className="h-4 w-4" />}
      {children}
    </a>
  );
};