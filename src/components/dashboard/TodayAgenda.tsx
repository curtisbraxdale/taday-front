import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin } from 'lucide-react';

const todayEvents = [
  {
    id: '1',
    title: 'Team Standup',
    time: '09:00',
    duration: '30 min',
    location: 'Conference Room A',
    priority: 'medium' as const,
  },
  {
    id: '2',
    title: 'Client Presentation',
    time: '14:00',
    duration: '1 hour',
    location: 'Zoom Meeting',
    priority: 'high' as const,
  },
  {
    id: '3',
    title: 'Code Review',
    time: '16:30',
    duration: '45 min',
    location: 'Dev Room',
    priority: 'low' as const,
  },
];

const priorityColors = {
  high: 'priority-high',
  medium: 'priority-medium',
  low: 'priority-low',
};

export const TodayAgenda = () => {
  return (
    <Card className="animate-slide-in">
      <CardHeader>
        <CardTitle className="font-header text-taday-primary">Today's Agenda</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {todayEvents.map((event, index) => (
          <div 
            key={event.id} 
            className="flex items-start space-x-3 p-3 rounded-md border border-border hover:bg-muted/50 transition-colors duration-200"
            style={{ animationDelay: `${index * 100 + 200}ms` }}
          >
            <div className="flex-shrink-0">
              <Badge className={`${priorityColors[event.priority]} text-xs`}>
                {event.priority}
              </Badge>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-taday-primary font-header text-sm">
                {event.title}
              </h4>
              <div className="mt-1 space-y-1">
                <div className="flex items-center text-xs text-taday-secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  {event.time} • {event.duration}
                </div>
                <div className="flex items-center text-xs text-taday-secondary">
                  <MapPin className="h-3 w-3 mr-1" />
                  {event.location}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {todayEvents.length === 0 && (
          <div className="text-center py-8">
            <p className="text-taday-secondary">No events scheduled for today</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};