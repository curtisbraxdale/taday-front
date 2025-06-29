import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PixelClose, PixelPlus } from '@/components/icons/PixelIcons';
import { Todo } from '@/types';
import { showWin98Toast } from '@/lib/win98-toast';

interface AddTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: Omit<Todo, 'id'>) => void;
}

export const AddTodoModal = ({ isOpen, onClose, onAdd }: AddTodoModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      showWin98Toast('Todo title is required', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const newTodo: Omit<Todo, 'id'> = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        completed: false,
        priority: false,
        dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
        tags: [],
      };

      onAdd(newTodo);
      showWin98Toast('Todo added successfully!', 'success');
      handleClose();
    } catch (error) {
      showWin98Toast('Failed to add todo', 'error');
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none max-w-md w-full mx-4" style={{ borderStyle: 'outset' }}>
        <DialogHeader className="border-b-2 border-taday-win98-darkGray pb-3 mb-4" style={{ borderStyle: 'inset' }}>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-header text-lg text-taday-primary">Add New Todo</DialogTitle>
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
              {isLoading ? 'Adding...' : 'Add Todo'}
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