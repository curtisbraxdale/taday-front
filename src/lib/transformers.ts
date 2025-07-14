// Data transformation utilities to convert between API and frontend types
import { User, Event, Todo } from '@/types';
import { ApiUser, ApiEvent, ApiTodo } from './api';

// Transform API user to frontend user
export function transformApiUser(apiUser: ApiUser): User {
  return {
    id: apiUser.id,
    email: apiUser.email,
    name: apiUser.username,
    phone: apiUser.phone_number || undefined,
  };
}

// Transform frontend user to API user for creation
export function transformUserToApi(userData: {
  name: string;
  email: string;
  password: string;
  phone?: string;
}): {
  username: string;
  email: string;
  password: string;
  phone_number?: string;
} {
  return {
    username: userData.name,
    email: userData.email,
    password: userData.password,
    phone_number: userData.phone || undefined,
  };
}

// Transform frontend user to API user for updates
export function transformUserUpdateToApi(userData: {
  name?: string;
  email?: string;
  password?: string;
  phone?: string;
}): {
  username?: string;
  email?: string;
  password?: string;
  phone_number?: string;
} {
  return {
    username: userData.name,
    email: userData.email,
    password: userData.password,
    phone_number: userData.phone,
  };
}

// Transform API event to frontend event
export function transformApiEvent(apiEvent: ApiEvent): Event {
  return {
    id: apiEvent.id,
    title: apiEvent.title,
    description: apiEvent.description,
    date: new Date(apiEvent.start_date),
    time: new Date(apiEvent.start_date).toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    }),
    priority: apiEvent.priority,
    tags: [], // Will be populated separately via event tags API
    completed: false, // API doesn't have completed field for events
  };
}

// Transform frontend event to API event
export function transformEventToApi(event: Omit<Event, 'id'>, endDate?: Date): {
  start_date: string;
  end_date: string;
  title: string;
  description?: string;
  priority: boolean;
  recur_d: boolean;
  recur_w: boolean;
  recur_m: boolean;
  recur_y: boolean;
} {
  // Combine date and time for start_date
  const startDateTime = new Date(event.date);
  if (event.time) {
    const [hours, minutes] = event.time.split(':');
    startDateTime.setHours(parseInt(hours), parseInt(minutes));
  }

  // Default end date to 1 hour after start if not provided
  const endDateTime = endDate || new Date(startDateTime.getTime() + 60 * 60 * 1000);

  return {
    start_date: startDateTime.toISOString(),
    end_date: endDateTime.toISOString(),
    title: event.title,
    description: event.description,
    priority: event.priority,
    recur_d: false, // Default recurrence settings
    recur_w: false,
    recur_m: false,
    recur_y: false,
  };
}

// Transform API todo to frontend todo
export function transformApiTodo(apiTodo: ApiTodo): Todo {
  return {
    id: apiTodo.id,
    title: apiTodo.title,
    description: apiTodo.description,
    completed: false, // API doesn't have completed field, todos are deleted when done
    priority: false, // API doesn't have priority field for todos
    dueDate: apiTodo.date ? new Date(apiTodo.date) : undefined,
    tags: [], // API doesn't have tags for todos directly
  };
}

// Transform frontend todo to API todo - only send date if dueDate exists
export function transformTodoToApi(todo: Omit<Todo, 'id'>): {
  date: string;
  title: string;
  description?: string;
} {
  return {
    date: todo.dueDate ? todo.dueDate.toISOString() : new Date('1970-01-01').toISOString(), // Use epoch date as placeholder when no due date
    title: todo.title,
    description: todo.description,
  };
}

// Transform update data for todos - only send date if dueDate exists
export function transformTodoUpdateToApi(todo: Todo): {
  date?: string;
  title?: string;
  description?: string;
} {
  return {
    date: todo.dueDate ? todo.dueDate.toISOString() : new Date('1970-01-01').toISOString(), // Use epoch date as placeholder when no due date
    title: todo.title,
    description: todo.description,
  };
}

// Transform update data for events
export function transformEventUpdateToApi(event: Event, endDate?: Date): {
  start_date?: string;
  end_date?: string;
  title?: string;
  description?: string;
  priority?: boolean;
  recur_d?: boolean;
  recur_w?: boolean;
  recur_m?: boolean;
  recur_y?: boolean;
} {
  // Combine date and time for start_date
  const startDateTime = new Date(event.date);
  if (event.time) {
    const [hours, minutes] = event.time.split(':');
    startDateTime.setHours(parseInt(hours), parseInt(minutes));
  }

  // Default end date to 1 hour after start if not provided
  const endDateTime = endDate || new Date(startDateTime.getTime() + 60 * 60 * 1000);

  return {
    start_date: startDateTime.toISOString(),
    end_date: endDateTime.toISOString(),
    title: event.title,
    description: event.description,
    priority: event.priority,
    recur_d: false,
    recur_w: false,
    recur_m: false,
    recur_y: false,
  };
}