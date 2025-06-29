export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
}

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: Date;
  time: string;
  priority: boolean; // Changed from 'low' | 'medium' | 'high' to boolean
  tags: string[];
  completed: boolean;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: boolean; // Changed from 'low' | 'medium' | 'high' to boolean
  dueDate?: Date;
  tags: string[];
}

export interface AuthData {
  email: string;
  password: string;
  name?: string;
  phone?: string;
}

export interface FormErrors {
  [key: string]: string;
}

export type ViewMode = 'table' | 'grid';
export type FilterOption = 'all' | 'today' | 'week' | 'month';
export type TimePeriod = 'day' | 'week' | 'month' | 'year';