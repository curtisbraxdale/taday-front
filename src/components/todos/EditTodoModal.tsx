import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { PixelClose, PixelPlus } from '@/components/icons/PixelIcons';
import { Todo } from '@/types';
import { showWin98Toast } from '@/lib/win98-toast';

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (todo: Todo) => void;
  todo: Todo | null;
}

export const EditTodoModal = ({ isOpen, onClose, onUpdate, todo }: EditTodoModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  // Pre-fill form when todo changes
  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title,
        description: todo.description || '',
        dueDate: todo.dueDate ? todo.dueDate.toISOString().split('T')[0] : '',
      });
    }
  }, [todo]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!todo) return;
    
    if (!formData.title.trim()) {
      showWin98Toast('Todo title is required', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const updatedTodo: Todo = {
        ...todo,
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      };

      onUpdate(updatedTodo);
      showWin98Toast('Todo updated successfully!', 'success');
      handleClose();
    } catch (error) {
      showWin98Toast('Failed to update todo', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      dueDate: '',
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  if (!todo) return null;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none max-w-md w-full mx-4" style={{ borderStyle: 'outset' }}>
        <DialogHeader className="border-b-2 border-taday-win98-darkGray pb-3 mb-4" style={{ borderStyle: 'inset' }}>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-header text-lg text-taday-primary">Edit Todo</DialogTitle>
            <button
              onClick={handleClose}
              className="win98-button p-1 font-mono"
              disabled={isLoading}
            >
              <PixelClose size="sm" />
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="win98-label">Todo Title *</label>
            <input
              id="title"
              type="text"
              placeholder="What do you need to do?"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="win98-input w-full"
              disabled={isLoading}
              maxLength={100}
              autoFocus
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="win98-label">Description</label>
            <textarea
              id="description"
              placeholder="Add more details (optional)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="win98-textarea w-full h-20"
              disabled={isLoading}
              maxLength={500}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <label htmlFor="dueDate" className="win98-label">Due Date (optional)</label>
            <input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange('dueDate', e.target.value)}
              className="win98-input w-full"
              disabled={isLoading}
              min={today}
            />
            <p className="text-xs text-taday-secondary font-mono">Leave empty if no specific due date</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t-2 border-taday-win98-darkGray" style={{ borderStyle: 'inset' }}>
            <button
              type="submit"
              className="win98-button flex items-center gap-2 flex-1 justify-center font-mono"
              disabled={isLoading}
            >
              <PixelPlus size="sm" />
              {isLoading ? 'Updating...' : 'Update Todo'}
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="win98-button px-4 font-mono"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};