import { useState, useEffect } from 'react';
import { EventCard } from './EventCard';
import { AddEventModal } from './AddEventModal';
import { EditEventModal } from './EditEventModal';
import { EventDetailsModal } from './EventDetailsModal';
import { TimePeriodSelector } from './TimePeriodSelector';
import { TypewriterText } from '../dashboard/TypewriterText';
import { Event, TimePeriod } from '@/types';
import { PixelPlus, PixelSearch } from '@/components/icons/PixelIcons';
import { useEvents } from '@/hooks/useEvents';
import { isToday, isThisWeek, isThisMonth, isThisYear } from 'date-fns';

export const Events = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [selectedTimePeriod, setSelectedTimePeriod] = useState<TimePeriod>('month');
  const [showSubtext, setShowSubtext] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [viewingEvent, setViewingEvent] = useState<Event | null>(null);

  const { events, isLoading, error, loadEvents, createEvent, updateEvent, deleteEvent } = useEvents();

  // Reload events when time period changes
  useEffect(() => {
    loadEvents({ range: selectedTimePeriod });
  }, [selectedTimePeriod]);

  const handleAddEvent = async (newEvent: Omit<Event, 'id'>) => {
    const success = await createEvent(newEvent);
    if (success) {
      setIsAddEventModalOpen(false);
    }
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsEditEventModalOpen(true);
  };

  const handleViewDetails = (event: Event) => {
    setViewingEvent(event);
    setIsDetailsModalOpen(true);
  };

  const handleUpdateEvent = async (updatedEvent: Event) => {
    const success = await updateEvent(updatedEvent);
    if (success) {
      setIsEditEventModalOpen(false);
      setEditingEvent(null);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    await deleteEvent(eventId);
  };

  const handleHeaderComplete = () => {
    setShowSubtext(true);
  };

  const filterEventsByTimePeriod = (events: Event[], period: TimePeriod): Event[] => {
    return events.filter(event => {
      switch (period) {
        case 'day':
          return isToday(event.date);
        case 'week':
          return isThisWeek(event.date, { weekStartsOn: 1 }); // Week starts on Monday
        case 'month':
          return isThisMonth(event.date);
        case 'year':
          return isThisYear(event.date);
        default:
          return true;
      }
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === 'all' || 
                           (selectedPriority === 'priority' && event.priority) ||
                           (selectedPriority === 'normal' && !event.priority);
    
    return matchesSearch && matchesPriority;
  });

  const timePeriodFilteredEvents = filterEventsByTimePeriod(filteredEvents, selectedTimePeriod);

  const getTimePeriodText = (period: TimePeriod): string => {
    switch (period) {
      case 'day':
        return 'today';
      case 'week':
        return 'this week';
      case 'month':
        return 'this month';
      case 'year':
        return 'this year';
      default:
        return 'in the selected period';
    }
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-taday-primary mb-2">Events</h1>
          <div className="text-taday-secondary font-mono">
            Manage your calendar and upcoming events.
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-taday-error mb-4 font-mono">{error}</p>
          <button 
            onClick={() => loadEvents({ range: selectedTimePeriod })} 
            className="win98-button font-mono"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-taday-primary mb-2">
            <TypewriterText text="Events" speed={80} onComplete={handleHeaderComplete} />
          </h1>
          <div className="text-taday-secondary font-mono min-h-[1.5rem]">
            {showSubtext && (
              <TypewriterText 
                text="Manage your calendar and upcoming events."
                speed={80}
              />
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <PixelSearch size="sm" />
            </div>
            <input
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-2 border-taday-win98-darkGray rounded-none font-mono win98-input w-full"
              style={{ borderStyle: 'inset' }}
            />
          </div>

          <div className="flex items-center gap-4">
            {/* Priority Toggle */}
            <div className="flex items-center border-2 border-taday-win98-darkGray rounded-none" style={{ borderStyle: 'inset' }}>
              {['all', 'priority', 'normal'].map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedPriority(option)}
                  className={`nav-button rounded-none font-mono ${
                    selectedPriority === option ? 'active' : ''
                  }`}
                  style={{
                    border: selectedPriority === option ? '2px inset #c0c0c0' : '2px outset #c0c0c0',
                    background: selectedPriority === option 
                      ? '#a0a0a0'
                      : '#c0c0c0'
                  }}
                >
                  {option === 'all' ? 'All' : option === 'priority' ? 'Priority' : 'Normal'}
                </button>
              ))}
            </div>

            {/* Time Period Toggle */}
            <TimePeriodSelector
              selectedPeriod={selectedTimePeriod}
              onPeriodChange={setSelectedTimePeriod}
            />

            <button onClick={() => setIsAddEventModalOpen(true)} className="win98-button flex items-center gap-2 font-mono">
              <PixelPlus size="sm" />
              Add Event
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-taday-accent mx-auto mb-4"></div>
            <p className="text-taday-secondary font-mono">Loading events...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {timePeriodFilteredEvents.map((event, index) => (
                <div 
                  key={event.id}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EventCard 
                    event={event} 
                    onEdit={handleEditEvent}
                    onDelete={handleDeleteEvent}
                    onViewDetails={handleViewDetails}
                  />
                </div>
              ))}
            </div>

            {timePeriodFilteredEvents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-taday-secondary mb-4 font-mono">
                  No events found {getTimePeriodText(selectedTimePeriod)}
                </p>
                <button onClick={() => setIsAddEventModalOpen(true)} className="win98-button flex items-center gap-2 mx-auto font-mono">
                  <PixelPlus size="sm" />
                  Add your first event
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAdd={handleAddEvent}
      />

      <EditEventModal
        isOpen={isEditEventModalOpen}
        onClose={() => setIsEditEventModalOpen(false)}
        onUpdate={handleUpdateEvent}
        event={editingEvent}
      />

      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        event={viewingEvent}
      />
    </>
  );
};