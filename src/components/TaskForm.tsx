import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus } from 'lucide-react';
import type { Task, Priority } from '../types';

interface TaskFormProps {
  onAdd: (task: Task) => void;
}

export function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd({
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      priority,
      createdAt: Date.now(),
    });

    setTitle('');
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg border border-purple-100 mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="O que você precisa fazer?"
          className="flex-1 bg-purple-50 text-gray-800 placeholder-purple-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all"
        />
        <div className="flex gap-2 items-center">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="bg-purple-50 text-purple-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-purple-500 transition-all cursor-pointer appearance-none"
          >
            <option value="low">Baixa</option>
            <option value="medium">Média</option>
            <option value="high">Alta</option>
          </select>
          <button
            type="submit"
            disabled={!title.trim()}
            className="bg-purple-600 hover:bg-purple-700 text-white p-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md shadow-purple-200"
          >
            <Plus size={24} />
          </button>
        </div>
      </div>
    </form>
  );
}
