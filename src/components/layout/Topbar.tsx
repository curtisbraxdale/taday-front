import { useState } from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  PixelSettings, 
  PixelLogout, 
  PixelCalendar, 
  PixelCheckbox, 
  PixelHome,
  PixelMenu,
  PixelCellPhone
} from '@/components/icons/PixelIcons';
import { useAuth } from '@/hooks/useAuth';

interface TopbarProps {
  currentRoute: string;
  onNavigate: (route: string) => void;
}

const navigation = [
  { name: 'Home', href: '/', icon: PixelHome },
  { name: 'Events', href: '/events', icon: PixelCalendar },
  { name: 'Todos', href: '/todos', icon: PixelCheckbox },
];

export const Topbar = ({ currentRoute, onNavigate }: TopbarProps) => {
  const { user, logout } = useAuth();
  const [pressedButton, setPressedButton] = useState<string | null>(null);

  const handleNavigate = (href: string) => {
    onNavigate(href);
    window.history.pushState({}, '', href);
  };

  const handleMouseDown = (href: string) => {
    setPressedButton(href);
  };

  const handleMouseUp = () => {
    setPressedButton(null);
  };

  const handleMouseLeave = () => {
    setPressedButton(null);
  };

  // Format phone number for display (show full number or placeholder)
  const displayPhone = user?.phone || '+12345678';

  return (
    <header className="bg-taday-win98-gray border-b-2 border-taday-win98-darkGray px-6 h-16 flex items-center justify-between" style={{ borderStyle: 'inset' }}>
      <div className="flex items-center gap-8">
        <h1 className="text-lg font-header font-bold text-taday-primary">
          Taday
        </h1>
        
        <nav className="hidden md:flex items-center gap-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavigate(item.href)}
              onMouseDown={() => handleMouseDown(item.href)}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              className={`nav-button flex items-center gap-2 text-sm font-mono w-30 h-10 justify-center ${
                currentRoute === item.href ? 'active' : ''
              } ${pressedButton === item.href ? 'active' : ''}`}
            >
              <item.icon size="sm" />
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Mobile navigation */}
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="win98-button font-mono">
                <PixelMenu size="sm" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-taday-win98-gray border-2 border-taday-win98-darkGray">
              {navigation.map((item) => (
                <DropdownMenuItem 
                  key={item.name}
                  onClick={() => handleNavigate(item.href)}
                  className={`win98-dropdown-item flex items-center gap-2 font-mono ${currentRoute === item.href ? 'bg-taday-win98-darkGray' : ''}`}
                >
                  <item.icon size="sm" />
                  <span>{item.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User button with phone number and cell phone icon - 1.5x wider with navbar button style */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button 
              className={`nav-button flex items-center gap-2 text-sm font-mono w-45 h-10 justify-center ${
                pressedButton === 'phone' ? 'active' : ''
              }`}
              onMouseDown={() => handleMouseDown('phone')}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              <PixelCellPhone size="sm" />
              <span className="truncate">{displayPhone}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-taday-win98-gray border-2 border-taday-win98-darkGray" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2 border-b border-taday-win98-darkGray">
              <div className="flex flex-col space-y-1 leading-none">
                <p className="font-mono text-sm">{user?.name || 'User'}</p>
                <p className="w-[200px] truncate text-xs text-taday-secondary font-mono">
                  {user?.email}
                </p>
              </div>
            </div>
            <DropdownMenuItem 
              onClick={() => handleNavigate('/settings')}
              className="win98-dropdown-item flex items-center gap-2 font-mono"
            >
              <PixelSettings size="sm" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} className="win98-dropdown-item flex items-center gap-2 font-mono">
              <PixelLogout size="sm" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};