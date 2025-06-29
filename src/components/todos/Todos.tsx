import { useState } from 'react';
import { TodoItem } from './TodoItem';
import { AddTodoModal } from './AddTodoModal';
import { EditTodoModal } from './EditTodoModal';
import { TypewriterText } from '../dashboard/TypewriterText';
import { Todo } from '@/types';
import { PixelPlus } from '@/components/icons/PixelIcons';
import { useTodos } from '@/hooks/useTodos';

export const Todos = () => {
  const [showSubtext, setShowSubtext] = useState(false);
  const [isAddTodoModalOpen, setIsAddTodoModalOpen] = useState(false);
  const [isEditTodoModalOpen, setIsEditTodoModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const { todos, isLoading, error, createTodo, updateTodo, deleteTodo, completeTodo } = useTodos();

  const handleToggleTodo = async (id: string) => {
    // Complete the todo (delete it since API treats completion as deletion)
    await completeTodo(id);
  };

  const handleAddTodo = async (todo: Omit<Todo, 'id'>) => {
    const success = await createTodo(todo);
    if (success) {
      setIsAddTodoModalOpen(false);
    }
  };

  const handleEditTodo = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditTodoModalOpen(true);
  };

  const handleUpdateTodo = async (updatedTodo: Todo) => {
    const success = await updateTodo(updatedTodo);
    if (success) {
      setIsEditTodoModalOpen(false);
      setEditingTodo(null);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    await deleteTodo(todoId);
  };

  const handleHeaderComplete = () => {
    setShowSubtext(true);
  };

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-header font-bold text-taday-primary mb-2">Todos</h1>
          <div className="text-taday-secondary font-mono">
            Track tasks and stay organized.
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-taday-error mb-4 font-mono">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
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
            <TypewriterText text="Todos" speed={80} onComplete={handleHeaderComplete} />
          </h1>
          <div className="text-taday-secondary font-mono min-h-[1.5rem]">
            {showSubtext && (
              <TypewriterText 
                text="Track tasks and stay organized."
                speed={80}
              />
            )}
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setIsAddTodoModalOpen(true)}
            className="win98-button w-full justify-center text-taday-primary flex items-center gap-2 py-3"
          >
            <PixelPlus size="sm" />
            Add a todo...
          </button>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-taday-accent mx-auto mb-4"></div>
              <p className="text-taday-secondary font-mono">Loading todos...</p>
            </div>
          ) : (
            <div className="space-y-2">
              {todos.map((todo, index) => (
                <div key={todo.id} style={{ animationDelay: `${index * 50}ms` }}>
                  <TodoItem 
                    todo={todo} 
                    onToggle={handleToggleTodo}
                    onEdit={handleEditTodo}
                    onDelete={handleDeleteTodo}
                  />
                </div>
              ))}
            </div>
          )}

          {!isLoading && todos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-taday-secondary mb-4 font-mono">
                No todos yet
              </p>
              <button onClick={() => setIsAddTodoModalOpen(true)} className="win98-button flex items-center gap-2 mx-auto font-mono">
                <PixelPlus size="sm" />
                Add your first todo
              </button>
            </div>
          )}
        </div>
      </div>

      <AddTodoModal
        isOpen={isAddTodoModalOpen}
        onClose={() => setIsAddTodoModalOpen(false)}
        onAdd={handleAddTodo}
      />

      <EditTodoModal
        isOpen={isEditTodoModalOpen}
        onClose={() => setIsEditTodoModalOpen(false)}
        onUpdate={handleUpdateTodo}
        todo={editingTodo}
      />
    </>
  );
};