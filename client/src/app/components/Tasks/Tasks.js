'use client';
import React from 'react'
import { useState, useEffect } from 'react'
import TaskForm from './TaskForm/TaskForm'
import TasksList from './TasksList';

const Tasks = () => {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(false);
  const [taskId, setTaskId] = useState('');
  const [tasks, setTasks] = useState([]);
  const [refetchTasks, setRefetchTasks] = useState(true)
  const fetchTask = async () => {
    const response = await fetch('http://localhost:4000/api/tasks', {
      method: 'GET',
      credentials: 'include', // Ensures cookies are included
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { tasks } = await response.json();
    setTasks(tasks);
  }
  useEffect(() => {
    fetchTask()
  }, [refetchTasks])

  return <section className='flex flex-col p-4 rounded-lg bg-[#3a2c54] w-3/6 text-center'>
    <header className='flex items-start justify-between'>
      <h2>Mostafa's Tasks</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md text-sm"
        onClick={() => setIsAddingTask(true)}>Add Task</button>
    </header>
    <TaskForm isAddingTask={isAddingTask} setIsAddingTask={setIsAddingTask} taskToEdit={taskToEdit} setTaskToEdit={setTaskToEdit} taskId={taskId} setRefetchTasks={setRefetchTasks} />
    <TasksList tasks={tasks} setTaskToEdit={setTaskToEdit} setTaskId={setTaskId} setRefetchTasks={setRefetchTasks} />
  </section >

}

export default Tasks