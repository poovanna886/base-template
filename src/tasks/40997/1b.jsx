import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useTransition } from 'react';

const COLORS = {
  'stories': 'bg-red-100 border-red-500',
  'in progress': 'bg-blue-100 border-blue-500',
  'peer review': 'bg-yellow-100 border-yellow-500',
  'in testing': 'bg-purple-100 border-purple-500',
  'done': 'bg-green-100 border-green-500',
};

const TaskCard = ({ task, column, onDelete, onMove }) => {
  const [, startTransition] = useTransition();

  const handleDragStart = (e) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ id: task.id, from: column }));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData('text'));
    if (data.from !== column) {
      startTransition(() => {
        onMove(data.id, data.from, column);
      });
    }
  };

  return (
    <Card className={`mb-4 transition-all duration-300 ease-in-out ${COLORS[column]}`} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{task.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        {column === 'stories' && <Button variant="destructive" onClick={() => onDelete(task.id)}>Delete</Button>}
      </CardFooter>
    </Card>
  );
};

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : {};
  });
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleCreateTask = () => {
    const id = Date.now().toString();
    setTasks(prev => ({
      ...prev,
      [id]: { ...newTask, id, column: 'stories' }
    }));
    setNewTask({ title: '', description: '' });
    setOpen(false);
  };

  const handleMoveTask = (id, from, to) => {
    setTasks(prev => {
      const task = prev[id];
      return { ...prev, [id]: { ...task, column: to } };
    });
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => {
      const { [id]: _, ...rest } = prev;
      return rest;
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Kanban Board</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="mb-4">Create Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Task</DialogTitle>
          </DialogHeader>
          <Input 
            value={newTask.title} 
            onChange={e => setNewTask(prev => ({...prev, title: e.target.value}))} 
            placeholder="Task Title" 
            className="mb-2"
          />
          <Textarea 
            value={newTask.description} 
            onChange={e => setNewTask(prev => ({...prev, description: e.target.value}))} 
            placeholder="Task Description"
          />
          <Button onClick={handleCreateTask} className="mt-4">Add Task</Button>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {['stories', 'in progress', 'peer review', 'in testing', 'done'].map(column => (
          <div key={column} className="flex flex-col bg-white p-4 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2 capitalize">{column.replace(' ', ' ')}</h2>
            {Object.values(tasks).filter(task => task.column === column).map(task => (
              <div key={task.id} draggable onDragStart={handleDragStart}>
                <TaskCard 
                  task={task} 
                  column={column} 
                  onDelete={handleDeleteTask} 
                  onMove={handleMoveTask}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;