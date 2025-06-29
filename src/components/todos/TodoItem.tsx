import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { PixelMoreHorizontal } from '@/components/icons/PixelIcons';
import { Todo } from '@/types';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: string) => void;
}

export const TodoItem = ({ todo, onToggle, onEdit, onDelete }: TodoItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleEdit = () => {
    onEdit?.(todo);
    setIsDropdownOpen(false);
  };

  const handleDelete = () => {
    onDelete?.(todo.id);
    setIsDropdownOpen(false);
  };

  return (
    <div 
      className="win98-card-hover flex items-start space-x-3 p-4 mb-3 rounded-none border-2 border-taday-win98-darkGray bg-white transition-all duration-200 animate-fade-in"
      style={{ borderStyle: 'inset' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Checkbox 
        checked={false}
        onCheckedChange={() => onToggle(todo.id)}
        className="mt-1 rounded-none border-2 border-black"
      />
      
      <div className="flex-1 min-w-0">
        <h4 className="font-medium font-header text-sm text-taday-primary">
          {todo.title}
        </h4>
        
        {todo.description && (
          <p className="text-sm text-taday-secondary mt-1 font-mono">
            {todo.description}
          </p>
        )}
        
        {todo.dueDate && (
          <div className="mt-2">
            <span className="text-xs text-taday-secondary font-mono">
              Due {format(todo.dueDate, 'MMM dd, yyyy')}
            </span>
          </div>
        )}
      </div>
      
      <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <button className="win98-button p-1 font-mono">
            <PixelMoreHorizontal size="sm" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none" align="end">
          <DropdownMenuItem onClick={handleEdit} className="win98-dropdown-item flex items-center gap-2 font-mono">
            <span>Edit</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete} className="win98-dropdown-item flex items-center gap-2 font-mono text-taday-error">
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};