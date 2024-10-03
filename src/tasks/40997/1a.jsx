// App.jsx
import React, { useState, useEffect } from 'react';
//import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const COLORS = {
  stories: 'bg-red-100 text-red-800',
  inProgress: 'bg-blue-100 text-blue-800',
  peerReview: 'bg-yellow-100 text-yellow-800',
  inTesting: 'bg-purple-100 text-purple-800',
  done: 'bg-green-100 text-green-800'
};

const initialTasks = [
  { id: '1', title: 'Example Task', description: 'This is a task in stories', status: 'stories' },
];

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('kanbanTasks');
    return savedTasks ? JSON.parse(savedTasks) : initialTasks;
  });
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  useEffect(() => {
    localStorage.setItem('kanbanTasks', JSON.stringify(tasks));
  }, [tasks]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(tasks);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, { ...reorderedItem, status: result.destination.droppableId });

    setTasks(items.map((task, index) => ({ ...task, color: COLORS[task.status] })));
  };

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: String(Date.now()), status: 'stories' }]);
    setOpen(false);
    setNewTask({ title: '', description: '' });
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const columns = ['stories', 'inProgress', 'peerReview', 'inTesting', 'done'];

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Kanban Board</h1>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <Input 
            value={newTask.title} 
            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
            placeholder="Task Title" 
          />
          <Textarea 
            className="mt-2"
            value={newTask.description} 
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            placeholder="Task Description" 
          />
          <DialogFooter>
            <Button type="button" onClick={addTask}>Add Task</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <DialogTrigger asChild>
        <Button className="mb-4">Create Task</Button>
      </DialogTrigger>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {columns.map(status => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div 
                  {...provided.droppableProps} 
                  ref={provided.innerRef}
                  className="rounded bg-white shadow-md p-4 transition-all duration-300"
                >
                  <h2 className="text-xl font-semibold mb-4">{status.replace(/([A-Z])/g, ' $1').trim()}</h2>
                  {tasks.filter(task => task.status === status).map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div 
                          ref={provided.innerRef} 
                          {...provided.draggableProps} 
                          {...provided.dragHandleProps}
                          className={`${task.color} mb-2 p-3 rounded shadow-sm transition-colors duration-300`}
                        >
                          <Card>
                            <CardHeader>
                              <CardTitle>{task.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p>{task.description}</p>
                            </CardContent>
                            {status === 'stories' && (
                              <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
                            )}
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;