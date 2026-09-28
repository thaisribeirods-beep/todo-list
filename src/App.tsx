import React, { useState, useMemo } from 'react';
import { Sparkles, ListTodo, CheckCircle2, CircleDashed } from 'lucide-react';
import { useTasks } from './hooks/useTasks';
import { TaskForm } from './components/TaskForm';
import { TaskItem } from './components/TaskItem';

type FilterType = 'all' | 'active' | 'completed';

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask } = useTasks();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    }).sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
  }, [tasks, filter]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  }, [tasks]);

  return (
    <div className="min-h-screen font-sans selection:bg-purple-200 selection:text-purple-900 pb-12">
      {/* Header com gradiente roxo */}
      <header className="bg-gradient-to-r from-purple-600 via-purple-500 to-purple-600 pt-16 pb-32 px-4 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-center gap-3">
          <Sparkles className="text-white w-8 h-8" />
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Tarefas
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 -mt-20">
        <TaskForm onAdd={addTask} />

        {/* Filters and Stats */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <div className="flex bg-white rounded-xl p-1 shadow-sm border border-purple-100">
            <FilterButton
              active={filter === 'all'}
              onClick={() => setFilter('all')}
              icon={<ListTodo size={16} />}
              label={`Todas (${stats.total})`}
            />
            <FilterButton
              active={filter === 'active'}
              onClick={() => setFilter('active')}
              icon={<CircleDashed size={16} />}
              label={`Ativas (${stats.active})`}
            />
            <FilterButton
              active={filter === 'completed'}
              onClick={() => setFilter('completed')}
              icon={<CheckCircle2 size={16} />}
              label={`Concluídas (${stats.completed})`}
            />
          </div>
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))
          ) : (
            <div className="text-center py-12 px-4 border-2 border-dashed border-purple-200 rounded-2xl bg-white/50">
              <p className="text-purple-400 text-lg">
                {filter === 'completed'
                  ? 'Nenhuma tarefa concluída ainda.'
                  : filter === 'active'
                  ? 'Oba! Nenhuma tarefa pendente.'
                  : 'Nenhuma tarefa encontrada. Adicione uma acima!'}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

function FilterButton({ active, onClick, icon, label }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
        active
          ? 'bg-purple-100 text-purple-700 shadow-sm'
          : 'text-gray-500 hover:text-purple-600 hover:bg-purple-50'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export default App;
