import React, { useState } from 'react';
import type { Task } from '../types';
import { Check, Trash2, Pencil, X } from 'lucide-react';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, newTitle: string) => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-700 border-blue-200',
  medium: 'bg-purple-100 text-purple-700 border-purple-200',
  high: 'bg-pink-100 text-pink-700 border-pink-200',
};

const priorityLabels = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
};

export function TaskItem({ task, onToggle, onDelete, onUpdate }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleUpdate = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, editTitle.trim());
    } else {
      setEditTitle(task.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUpdate();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(task.title);
    }
  };

  return (
    <div
      className={`group flex items-center gap-4 p-4 rounded-xl border transition-all ${
        task.completed
          ? 'bg-purple-50/50 border-purple-100'
          : 'bg-white border-purple-100 hover:shadow-md hover:border-purple-300'
      }`}
    >
      <button
        onClick={() => onToggle(task.id)}
        className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
          task.completed
            ? 'bg-purple-500 border-purple-500'
            : 'border-purple-300 hover:border-purple-500'
        }`}
      >
        {task.completed && <Check size={14} className="text-white" />}
      </button>

      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full bg-purple-50 px-2 py-1 rounded outline-none border border-purple-300 focus:ring-1 focus:ring-purple-500"
          />
        ) : (
          <span
            className={`block truncate ${
              task.completed ? 'text-gray-400 line-through' : 'text-gray-700'
            }`}
          >
            {task.title}
          </span>
        )}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span
          className={`text-xs px-2 py-1 rounded-md border ${
            priorityColors[task.priority]
          } ${task.completed ? 'opacity-50' : ''}`}
        >
          {priorityLabels[task.priority]}
        </span>

        <div className="flex opacity-0 group-hover:opacity-100 transition-opacity gap-1">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
            >
              <X size={16} />
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="p-1.5 text-purple-400 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors"
            >
              <Pencil size={16} />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
