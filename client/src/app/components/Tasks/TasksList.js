'use client';
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'

import { revalidatePath } from 'next/cache'
import TaskItem from './TaskItem';
const TasksList = ({ tasks, setTaskToEdit, setTaskId, setRefetchTasks }) => {
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [filter, setFilter] = useState('all'); // Filter state: "all", "complete", "not-complete"

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks])

  useEffect(() => {
    let filtered = tasks;
    if (filter === 'complete') {
      filtered = tasks?.filter(task => task.complete);
    } else if (filter === 'not-complete') {
      filtered = tasks?.filter(task => !task.complete);
    }
    setFilteredTasks(filtered);
  }, [filter, tasks]);


  const deleteTasks = async (taskId) => {
    const response = await fetch(`http://localhost:4000/api/tasks/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    console.log(response);
    if (!response.ok) {
      throw new Error('Failed to delete task');
    }
    setRefetchTasks((prev) => !prev)
  }

  return (
    <div className="space-y-1">
      {/* Filter Buttons */}
      <div className="flex gap-2 mb-2 mt-4">
        <button
          className={`px-2 py-.5 rounded text-white ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-600 hover:bg-gray-500'} text-sm`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`px-2 py-0.5 rounded text-white ${filter === 'complete' ? 'bg-green-600' : 'bg-gray-600 hover:bg-gray-500'} text-sm`}
          onClick={() => setFilter('complete')}
        >
          Complete
        </button>
        <button
          className={`px-2 py-.5 rounded text-white ${filter === 'not-complete' ? 'bg-red-500' : 'bg-gray-600 hover:bg-gray-600'} text-sm`}
          onClick={() => setFilter('not-complete')}
        >
          Not Complete
        </button>
      </div>

      {/* Task List */}
      <div>
        {filteredTasks?.map(task => (
          <TaskItem setRefetchTasks={setRefetchTasks}
            key={task._id}
            task={task}
            setTaskToEdit={setTaskToEdit}
            setTaskId={setTaskId}
            deleteTasks={deleteTasks}
          />
        ))}
      </div>
    </div>
  );
};




export default TasksList;