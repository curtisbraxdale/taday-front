import { useState, useEffect } from 'react';
import { Event, TimePeriod } from '@/types';
import { eventsApi, eventTagsApi, tagsApi, ApiError } from '@/lib/api';
import { transformApiEvent, transformEventToApi, transformEventUpdateToApi } from '@/lib/transformers';
import { showWin98Toast } from '@/lib/win98-toast';

export const useEvents = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load events from API
  const loadEvents = async (params?: {
    range?: TimePeriod;
    tag?: string;
    sort?: 'desc';
  }) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const apiEvents = await eventsApi.getEvents(params);
      
      // Transform API events and load tags for each
      const eventsWithTags = await Promise.all(
        apiEvents.map(async (apiEvent) => {
          const event = transformApiEvent(apiEvent);
          
          try {
            // Load tags for this event
            const eventTags = await eventTagsApi.getEventTags(apiEvent.id);
            event.tags = eventTags.map(tag => tag.name);
          } catch (error) {
            // If loading tags fails, just use empty array
            event.tags = [];
          }
          
          return event;
        })
      );
      
      setEvents(eventsWithTags);
    } catch (error) {
      if (error instanceof ApiError) {
        setError(`Failed to load events: ${error.message}`);
        showWin98Toast('Failed to load events', 'error');
      } else {
        setError('Network error while loading events');
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create new event
  const createEvent = async (eventData: Omit<Event, 'id'>, endDate?: Date): Promise<boolean> => {
    try {
      const apiEventData = transformEventToApi(eventData, endDate);
      const createdEvent = await eventsApi.createEvent(apiEventData);
      
      // Transform back to frontend format
      const newEvent = transformApiEvent(createdEvent);
      newEvent.tags = eventData.tags; // Preserve tags from input
      
      // Add tags to the event if any
      if (eventData.tags.length > 0) {
        try {
          // First, get all available tags to find IDs
          const allTags = await tagsApi.getTags();
          
          for (const tagName of eventData.tags) {
            const existingTag = allTags.find(tag => tag.name === tagName);
            let tagId: string;
            
            if (existingTag) {
              tagId = existingTag.id;
            } else {
              // Create new tag with random color
              const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              const newTag = await tagsApi.createTag({ name: tagName, color: randomColor });
              tagId = newTag.id;
            }
            
            // Associate tag with event
            await eventTagsApi.addTagToEvent(createdEvent.id, tagId);
          }
        } catch (error) {
          console.warn('Failed to add tags to event:', error);
        }
      }
      
      setEvents(prev => [newEvent, ...prev]);
      showWin98Toast('Event created successfully!', 'success');
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        showWin98Toast('Failed to create event', 'error');
      } else {
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
      return false;
    }
  };

  // Update event
  const updateEvent = async (eventData: Event, endDate?: Date): Promise<boolean> => {
    try {
      const apiEventData = transformEventUpdateToApi(eventData, endDate);
      const updatedEvent = await eventsApi.updateEvent(eventData.id, apiEventData);
      
      // Transform back to frontend format
      const newEvent = transformApiEvent(updatedEvent);
      newEvent.tags = eventData.tags; // Preserve tags from input
      
      // Update tags (simplified approach - remove all and re-add)
      try {
        // Get current tags
        const currentTags = await eventTagsApi.getEventTags(eventData.id);
        
        // Remove all current tags
        for (const tag of currentTags) {
          await eventTagsApi.removeTagFromEvent(eventData.id, tag.id);
        }
        
        // Add new tags
        if (eventData.tags.length > 0) {
          const allTags = await tagsApi.getTags();
          
          for (const tagName of eventData.tags) {
            const existingTag = allTags.find(tag => tag.name === tagName);
            let tagId: string;
            
            if (existingTag) {
              tagId = existingTag.id;
            } else {
              const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
              const randomColor = colors[Math.floor(Math.random() * colors.length)];
              const newTag = await tagsApi.createTag({ name: tagName, color: randomColor });
              tagId = newTag.id;
            }
            
            await eventTagsApi.addTagToEvent(eventData.id, tagId);
          }
        }
      } catch (error) {
        console.warn('Failed to update tags for event:', error);
      }
      
      setEvents(prev => prev.map(event => 
        event.id === eventData.id ? newEvent : event
      ));
      showWin98Toast('Event updated successfully!', 'success');
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        showWin98Toast('Failed to update event', 'error');
      } else {
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
      return false;
    }
  };

  // Delete event
  const deleteEvent = async (eventId: string): Promise<boolean> => {
    try {
      await eventsApi.deleteEvent(eventId);
      
      const deletedEvent = events.find(event => event.id === eventId);
      setEvents(prev => prev.filter(event => event.id !== eventId));
      
      if (deletedEvent) {
        showWin98Toast(`"${deletedEvent.title}" deleted successfully`, 'success');
      }
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        showWin98Toast('Failed to delete event', 'error');
      } else {
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
      return false;
    }
  };

  // Load events on mount
  useEffect(() => {
    loadEvents();
  }, []);

  return {
    events,
    isLoading,
    error,
    loadEvents,
    createEvent,
    updateEvent,
    deleteEvent,
  };
};