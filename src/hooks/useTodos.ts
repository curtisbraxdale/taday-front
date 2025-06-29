import { useState, useEffect } from 'react';
import { Todo } from '@/types';
import { todosApi, ApiError } from '@/lib/api';
import { transformApiTodo, transformTodoToApi, transformTodoUpdateToApi } from '@/lib/transformers';
import { showWin98Toast } from '@/lib/win98-toast';

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API
  const loadTodos = async (sort?: 'desc') => {
    try {
      setIsLoading(true);
      setError(null);
      
      const apiTodos = await todosApi.getTodos(sort);
      const transformedTodos = apiTodos.map(transformApiTodo);
      
      setTodos(transformedTodos);
    } catch (error) {
      if (error instanceof ApiError) {
        setError(`Failed to load todos: ${error.message}`);
        showWin98Toast('Failed to load todos', 'error');
      } else {
        setError('Network error while loading todos');
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Create new todo
  const createTodo = async (todoData: Omit<Todo, 'id'>): Promise<boolean> => {
    try {
      const apiTodoData = transformTodoToApi(todoData);
      const createdTodo = await todosApi.createTodo(apiTodoData);
      
      const newTodo = transformApiTodo(createdTodo);
      setTodos(prev => [newTodo, ...prev]);
      
      showWin98Toast('Todo created successfully!', 'success');
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        showWin98Toast('Failed to create todo', 'error');
      } else {
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
      return false;
    }
  };

  // Update todo
  const updateTodo = async (todoData: Todo): Promise<boolean> => {
    try {
      const apiTodoData = transformTodoUpdateToApi(todoData);
      const updatedTodo = await todosApi.updateTodo(todoData.id, apiTodoData);
      
      const newTodo = transformApiTodo(updatedTodo);
      setTodos(prev => prev.map(todo => 
        todo.id === todoData.id ? newTodo : todo
      ));
      
      showWin98Toast('Todo updated successfully!', 'success');
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        showWin98Toast('Failed to update todo', 'error');
      } else {
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
      return false;
    }
  };

  // Delete todo (used for both completion and deletion)
  const deleteTodo = async (todoId: string, isCompletion = false): Promise<boolean> => {
    try {
      await todosApi.deleteTodo(todoId);
      
      const deletedTodo = todos.find(todo => todo.id === todoId);
      setTodos(prev => prev.filter(todo => todo.id !== todoId));
      
      if (deletedTodo) {
        const message = isCompletion 
          ? `"${deletedTodo.title}" completed and removed!`
          : `"${deletedTodo.title}" deleted successfully`;
        showWin98Toast(message, 'success');
      }
      return true;
    } catch (error) {
      if (error instanceof ApiError) {
        showWin98Toast('Failed to delete todo', 'error');
      } else {
        showWin98Toast('Network error. Please check your connection.', 'error');
      }
      return false;
    }
  };

  // Complete todo (delete it since API treats completion as deletion)
  const completeTodo = async (todoId: string): Promise<boolean> => {
    return deleteTodo(todoId, true);
  };

  // Load todos on mount
  useEffect(() => {
    loadTodos();
  }, []);

  return {
    todos,
    isLoading,
    error,
    loadTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    completeTodo,
  };
};