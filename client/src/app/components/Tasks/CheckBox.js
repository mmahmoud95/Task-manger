'use client';
import { redirect } from 'next/navigation'
import React, { useState } from 'react'

const CheckBox = ({ task, setRefetchTasks }) => {
  const [checked, setChecked] = useState(task.complete)
  const [error, setError] = useState(null);

  const toggleTaskCompletion = async (isComplete) => {
    try {
      const response = await fetch(`http://localhost:4000/api/tasks/${task._id}`, {
        method: 'PATCH',
        credentials: 'include', // Ensures cookies are included
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ complete: isComplete }),
      });
      setRefetchTasks((prev) => !prev)
      if (!response.ok) {
        throw new Error('Failed to update task status');
      }
    } catch (err) {
      setError(err.message);
      // Rollback on error
      setChecked((prev) => !prev);
    }
    redirect('/');
  };

  const handleCheckboxChange = () => {
    setChecked((prev) => {
      const newState = !prev;
      toggleTaskCompletion(newState);
      return newState;
    });
  };

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
        className="w-4 h-4 accent-green-600"
      />
      {error && <p className="text-red-500 text-sm ml-2">{error}</p>}
    </div>)
}

export default CheckBox;