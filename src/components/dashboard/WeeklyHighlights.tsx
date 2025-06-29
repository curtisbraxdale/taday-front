import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Circle } from 'lucide-react';

const weeklyGoals = [
  {
    id: '1',
    title: 'Complete project wireframes',
    completed: true,
    dueDate: 'Mon',
  },
  {
    id: '2',
    title: 'Client feedback review',
    completed: true,
    dueDate: 'Tue',
  },
  {
    id: '3',
    title: 'Team retrospective meeting',
    completed: false,
    dueDate: 'Wed',
  },
  {
    id: '4',
    title: 'Deploy staging environment',
    completed: false,
    dueDate: 'Thu',
  },
  {
    id: '5',
    title: 'Documentation update',
    completed: false,
    dueDate: 'Fri',
  },
];

export const WeeklyHighlights = () => {
  const completedGoals = weeklyGoals.filter(goal => goal.completed).length;
  const progressPercentage = (completedGoals / weeklyGoals.length) * 100;

  return (
    <Card className="animate-slide-in" style={{ animationDelay: '100ms' }}>
      <CardHeader>
        <CardTitle className="font-header text-taday-primary">Weekly Highlights</CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-taday-secondary">Progress</span>
            <span className="text-taday-primary font-medium">
              {completedGoals}/{weeklyGoals.length} completed
            </span>
          </div>
          <Progress 
            value={progressPercentage} 
            className="h-2"
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {weeklyGoals.map((goal, index) => (
          <div 
            key={goal.id}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted/50 transition-colors duration-200"
            style={{ animationDelay: `${index * 100 + 300}ms` }}
          >
            {goal.completed ? (
              <CheckCircle className="h-4 w-4 text-taday-accent flex-shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-taday-secondary flex-shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-medium ${
                goal.completed ? 'text-taday-secondary line-through' : 'text-taday-primary'
              }`}>
                {goal.title}
              </p>
              <p className="text-xs text-taday-secondary mt-1">Due {goal.dueDate}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};