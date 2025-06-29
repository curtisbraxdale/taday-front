import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PixelClose, PixelPlus, PixelStar } from '@/components/icons/PixelIcons';
import { Event } from '@/types';
import { showWin98Toast } from '@/lib/win98-toast';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (event: Omit<Event, 'id'>) => void;
}

type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export const AddEventModal = ({ isOpen, onClose, onAdd }: AddEventModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    priority: false,
    recurrence: 'none' as RecurrenceType,
    tags: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      showWin98Toast('Event title is required', 'error');
      return;
    }

    if (!formData.startDate) {
      showWin98Toast('Start date is required', 'error');
      return;
    }

    // Validate end date is not before start date
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      showWin98Toast('End date cannot be before start date', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const newEvent: Omit<Event, 'id'> = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        date: new Date(formData.startDate),
        time: '09:00', // Default time since we removed time inputs
        priority: formData.priority,
        tags: formData.tags ? formData.tags.split(',').map(tag => tag.trim()).filter(Boolean) : [],
        completed: false,
      };

      onAdd(newEvent);
      showWin98Toast('Event added successfully!', 'success');
      handleClose();
    } catch (error) {
      showWin98Toast('Failed to add event', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: '',
      priority: false,
      recurrence: 'none',
      tags: '',
    });
    onClose();
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Get today's date in YYYY-MM-DD format for min date
  const today = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none max-w-md w-full mx-4" style={{ borderStyle: 'outset' }}>
        <DialogHeader className="border-b-2 border-taday-win98-darkGray pb-3 mb-4" style={{ borderStyle: 'inset' }}>
          <div className="flex items-center justify-between">
            <DialogTitle className="font-header text-lg text-taday-primary">Add New Event</DialogTitle>
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
            <label htmlFor="title" className="win98-label">Event Title *</label>
            <input
              id="title"
              type="text"
              placeholder="Enter event title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="win98-input w-full"
              disabled={isLoading}
              maxLength={100}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="win98-label">Description</label>
            <textarea
              id="description"
              placeholder="Enter event description (optional)"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="win98-textarea w-full h-20"
              disabled={isLoading}
              maxLength={500}
            />
          </div>

          {/* Date Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label htmlFor="startDate" className="win98-label">Start Date *</label>
              <input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange('startDate', e.target.value)}
                className="win98-input w-full"
                disabled={isLoading}
                min={today}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="endDate" className="win98-label">End Date</label>
              <input
                id="endDate"
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange('endDate', e.target.value)}
                className="win98-input w-full"
                disabled={isLoading}
                min={formData.startDate || today}
              />
            </div>
          </div>

          {/* Priority and Recurrence Row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="win98-label">Priority</label>
              <div className="flex items-center space-x-2 p-2 border-2 border-taday-win98-darkGray bg-white" style={{ borderStyle: 'inset' }}>
                <Checkbox
                  checked={formData.priority}
                  onCheckedChange={(checked) => handleInputChange('priority', checked as boolean)}
                  className="rounded-none border-2 border-black"
                  disabled={isLoading}
                />
                <div className="flex items-center gap-1">
                  <PixelStar size="sm" />
                  <span className="win98-label text-xs">High Priority</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="recurrence" className="win98-label">Recurrence</label>
              <Select value={formData.recurrence} onValueChange={(value) => handleInputChange('recurrence', value)} disabled={isLoading}>
                <SelectTrigger className="win98-input bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none font-mono" style={{ borderStyle: 'outset' }}>
                  <SelectValue placeholder="Select recurrence" />
                </SelectTrigger>
                <SelectContent className="bg-taday-win98-gray border-2 border-taday-win98-darkGray rounded-none">
                  <SelectItem value="none" className="win98-dropdown-item font-mono">Non-recurring</SelectItem>
                  <SelectItem value="daily" className="win98-dropdown-item font-mono">Daily</SelectItem>
                  <SelectItem value="weekly" className="win98-dropdown-item font-mono">Weekly</SelectItem>
                  <SelectItem value="monthly" className="win98-dropdown-item font-mono">Monthly</SelectItem>
                  <SelectItem value="yearly" className="win98-dropdown-item font-mono">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <label htmlFor="tags" className="win98-label">Tags</label>
            <input
              id="tags"
              type="text"
              placeholder="Enter tags separated by commas (e.g., work, meeting, important)"
              value={formData.tags}
              onChange={(e) => handleInputChange('tags', e.target.value)}
              className="win98-input w-full"
              disabled={isLoading}
            />
            <p className="text-xs text-taday-secondary font-mono">Separate multiple tags with commas</p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t-2 border-taday-win98-darkGray" style={{ borderStyle: 'inset' }}>
            <button
              type="submit"
              className="win98-button flex items-center gap-2 flex-1 justify-center font-mono"
              disabled={isLoading}
            >
              <PixelPlus size="sm" />
              {isLoading ? 'Adding...' : 'Add Event'}
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