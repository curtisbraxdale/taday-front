import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PixelClose, PixelCalendar, PixelTag, PixelStar } from '@/components/icons/PixelIcons';
import { Event } from '@/types';
import { format } from 'date-fns';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: Event | null;
}

export const EventDetailsModal = ({ isOpen, onClose, event }: EventDetailsModalProps) => {
  if (!event) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none max-w-md w-full mx-4" style={{ borderStyle: 'outset' }}>
        <DialogHeader className="border-b-2 border-taday-win98-darkGray pb-3 mb-4" style={{ borderStyle: 'inset' }}>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-header text-lg text-taday-primary">Event Details</DialogTitle>
            <button
              onClick={onClose}
              className="win98-button p-1 font-mono"
            >
              <PixelClose size="sm" />
            </button>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label className="win98-label">Event Title</label>
            <div className="win98-input w-full bg-taday-win98-lightGray font-mono">
              {event.title}
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="space-y-2">
              <label className="win98-label">Description</label>
              <div className="win98-textarea w-full h-20 bg-taday-win98-lightGray font-mono overflow-y-auto">
                {event.description}
              </div>
            </div>
          )}

          {/* Date */}
          <div className="space-y-2">
            <label className="win98-label">Date</label>
            <div className="win98-input w-full bg-taday-win98-lightGray font-mono flex items-center gap-2">
              <PixelCalendar size="sm" />
              {format(event.date, 'MMM dd, yyyy')}
            </div>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="win98-label">Priority</label>
            <div className="flex items-center space-x-2 p-2 border-2 border-taday-win98-darkGray bg-taday-win98-lightGray" style={{ borderStyle: 'inset' }}>
              <div className="flex items-center gap-2">
                <PixelStar size="sm" />
                <span className="win98-label text-sm">
                  {event.priority ? 'High Priority' : 'Normal Priority'}
                </span>
              </div>
            </div>
          </div>

          {/* Recurrence */}
          <div className="space-y-2">
            <label className="win98-label">Recurrence</label>
            <div className="win98-input w-full bg-taday-win98-lightGray font-mono">
              Non-recurring
            </div>
          </div>

          {/* Tags */}
          {event.tags.length > 0 && (
            <div className="space-y-2">
              <label className="win98-label">Tags</label>
              <div className="win98-input w-full bg-taday-win98-lightGray font-mono flex items-center gap-2">
                <PixelTag size="sm" />
                {event.tags.join(', ')}
              </div>
            </div>
          )}

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t-2 border-taday-win98-darkGray" style={{ borderStyle: 'inset' }}>
            <button
              onClick={onClose}
              className="win98-button px-6 font-mono"
            >
              Close
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};