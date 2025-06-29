import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { PixelCalendar, PixelMapPin, PixelTag, PixelMoreHorizontal, PixelStar } from '@/components/icons/PixelIcons';
import { Event } from '@/types';
import { format } from 'date-fns';

interface EventCardProps {
  event: Event;
  onEdit?: (event: Event) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (event: Event) => void;
}

export const EventCard = ({ event, onEdit, onDelete, onViewDetails }: EventCardProps) => {
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on the dropdown menu
    if ((e.target as HTMLElement).closest('[data-dropdown-trigger]')) {
      return;
    }
    onViewDetails?.(event);
  };

  const handleEdit = () => {
    onEdit?.(event);
  };

  const handleDelete = () => {
    onDelete?.(event.id);
  };

  return (
    <Card 
      className="win98-card win98-card-hover animate-fade-in cursor-pointer"
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-header font-semibold text-taday-primary mb-1">
              {event.title}
            </h3>
            {event.description && (
              <p className="text-sm text-taday-secondary mb-2 line-clamp-2 font-mono">
                {event.description}
              </p>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                className="win98-button ml-2 p-1 font-mono"
                data-dropdown-trigger
                onClick={(e) => e.stopPropagation()}
              >
                <PixelMoreHorizontal size="sm" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none" align="end">
              <DropdownMenuItem onClick={handleEdit} className="win98-dropdown-item flex items-center gap-2 font-mono">
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleDelete} className="win98-dropdown-item flex items-center gap-2 font-mono text-taday-error">
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="space-y-2 mb-3">
          <div className="flex items-center text-sm text-taday-secondary">
            <PixelCalendar size="sm" className="mr-2" />
            <span className="font-mono">{format(event.date, 'MMM dd, yyyy')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {event.priority && (
              <div className="flex items-center gap-1">
                <PixelStar size="sm" />
                <span className="text-xs text-taday-secondary font-mono">Priority</span>
              </div>
            )}
            {event.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <PixelTag size="sm" />
                <span className="text-xs text-taday-secondary font-mono">
                  {event.tags.slice(0, 2).join(', ')}
                  {event.tags.length > 2 && ` +${event.tags.length - 2}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};