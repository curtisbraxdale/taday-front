import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CheckSquare, Clock, Target } from 'lucide-react';

const stats = [
  {
    title: 'Today\'s Events',
    value: '3',
    icon: Calendar,
    color: 'text-taday-accent',
  },
  {
    title: 'Pending Todos',
    value: '7',
    icon: CheckSquare,
    color: 'text-taday-error',
  },
  {
    title: 'Hours Planned',
    value: '6',
    icon: Clock,
    color: 'text-taday-secondary',
  },
  {
    title: 'Goals This Week',
    value: '12',
    icon: Target,
    color: 'text-taday-accent',
  },
];

export const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => (
        <Card key={stat.title} className="card-hover animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-taday-secondary">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-header font-bold text-taday-primary">
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};