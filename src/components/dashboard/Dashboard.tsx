import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PixelCalendar, PixelCheckbox, PixelPlus } from '@/components/icons/PixelIcons';
import { TypewriterText } from './TypewriterText';
import { CountdownTimer } from './CountdownTimer';
import { AddEventModal } from '@/components/events/AddEventModal';
import { AddTodoModal } from '@/components/todos/AddTodoModal';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';
import { useTodos } from '@/hooks/useTodos';
import { Event, Todo } from '@/types';

export const Dashboard = () => {
  const { user } = useAuth();
  const { createEvent } = useEvents();
  const { createTodo } = useTodos();
  const [showReadyText, setShowReadyText] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
  
  const handleQuickAction = (action: string) => {
    if (action === 'add-event') {
      setIsAddEventModalOpen(true);
    } else if (action === 'add-todo') {
      setIsAddTodoModalOpen(true);
    } else {
      console.log(`Quick action: ${action}`);
    }
  };

  const handleAddEvent = async (event: Omit<Event, 'id'>) => {
    const success = await createEvent(event);
    if (success) {
      setIsAddEventModalOpen(false);
    }
  };

  const handleAddTodo = async (todo: Omit<Todo, 'id'>) => {
    const success = await createTodo(todo);
    if (success) {
      setIsAddTodoModalOpen(false);
    }
  };

  const welcomeText = `Welcome back ${user?.name || 'User'}`;
  const readyText = "Ready to focus on what matters today?";

  const handleWelcomeComplete = () => {
    setShowReadyText(true);
  };

  const handleReadyComplete = () => {
    setShowCountdown(true);
  };

  return (
    <>
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-header font-bold text-taday-primary mb-3">
            <TypewriterText 
              text={welcomeText} 
              speed={80} 
              onComplete={handleWelcomeComplete}
            />
          </h1>
          <div className="text-taday-secondary text-lg font-mono mb-4 min-h-[1.75rem]">
            {showReadyText && (
              <TypewriterText 
                text={readyText}
                speed={80}
                onComplete={handleReadyComplete}
              />
            )}
          </div>
          <div className="min-h-[1.75rem]">
            {showCountdown && <CountdownTimer />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg mx-auto">
          <Card className="win98-card win98-card-hover animate-fade-in aspect-square flex flex-col">
            <CardHeader className="text-center pb-4 flex-1 flex flex-col justify-center">
              <div className="mx-auto mb-3">
                <PixelCalendar size="lg" />
              </div>
              <CardTitle className="font-header text-taday-primary">Events</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-taday-secondary mb-4 text-sm font-mono">
                Manage your calendar and schedule
              </p>
              <button 
                onClick={() => handleQuickAction('add-event')}
                className="win98-button w-full flex items-center justify-center gap-2 font-mono"
              >
                <PixelPlus size="sm" />
                Add Event
              </button>
            </CardContent>
          </Card>

          <Card className="win98-card win98-card-hover animate-fade-in aspect-square flex flex-col" style={{ animationDelay: '100ms' }}>
            <CardHeader className="text-center pb-4 flex-1 flex flex-col justify-center">
              <div className="mx-auto mb-3">
                <PixelCheckbox size="lg" />
              </div>
              <CardTitle className="font-header text-taday-primary">Todos</CardTitle>
            </CardHeader>
            <CardContent className="text-center pb-6">
              <p className="text-taday-secondary mb-4 text-sm font-mono">
                Track tasks and stay organized
              </p>
              <button 
                onClick={() => handleQuickAction('add-todo')}
                className="win98-button w-full flex items-center justify-center gap-2 font-mono"
              >
                <PixelPlus size="sm" />
                Add Todo
              </button>
            </CardContent>
          </Card>
        </div>
      </div>

      <AddEventModal
        isOpen={isAddEventModalOpen}
        onClose={() => setIsAddEventModalOpen(false)}
        onAdd={handleAddEvent}
      />

      <AddTodoModal
        isOpen={isAddTodoModalOpen}
        onClose={() => setIsAddTodoModalOpen(false)}
        onAdd={handleAddTodo}
      />
    </>
  );
};