'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './taskform.module.css'

const TaskForm = ({ taskToEdit, setTaskToEdit, isAddingTask, setIsAddingTask, taskId, setRefetchTasks
}) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  // If taskToEdit is passed, populate the form with existing task data
  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title || '');
      setDueDate(taskToEdit.dueDate || '');
      setIsUpdating(true);
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      dueDate: dueDate || new Date().toISOString().split('T')[0], // Ensure date format is 'YYYY-MM-DD'
    };
    try {
      const method = isUpdating ? 'PATCH' : 'POST';
      const url = isUpdating
        ? `http://localhost:4000/api/tasks/${taskId}`
        : 'http://localhost:4000/api/tasks/';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
        credentials: 'include',

      });

      if (!res.ok) {
        throw new Error('Failed to save task');
      }

      // Reset the form and close the modal
      setTitle('');
      setDueDate('');
      setIsUpdating(false);
      setTaskToEdit(false);
      setIsAddingTask(false);
      setRefetchTasks((prev) => !prev)
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    (isAddingTask || taskToEdit) && <div>
      <div className="fixed top-0 left-0 w-full h-[100vh] bg-black bg-opacity-80"></div>
      <dialog open className='overflow-hidden top-20 w-[90%] max-w-lg bg-[#433352] rounded-md shadow-lg p-4 text-left'>
        <h2>{isUpdating ? 'Update Task' : 'Add Task'}</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="error">{error}</p>} {/* Display error message */}
          <p className='mt-2'>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
          </p>
          <p className='mt-2'>
            <label htmlFor="due-date">Due Date</label>
            <input className={styles.input}
              type="date"
              id="due-date"
              name="due-date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </p>

          <p className="mt-4">
            <button
              type="button"
              onClick={() => {
                setIsAddingTask(false);
                setTaskToEdit(false);
              }}
              className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 shadow-md text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ms-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 shadow-md text-sm"
            >
              {isUpdating ? 'Update' : 'Create'}
            </button>
          </p>

        </form>
      </dialog>
    </div >
  );
};

export default TaskForm;
