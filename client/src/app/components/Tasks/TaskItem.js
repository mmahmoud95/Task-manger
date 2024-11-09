'use client';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import CheckBox from './CheckBox';
const TaskItem = ({ task, setTaskToEdit, setTaskId, deleteTasks, setRefetchTasks }) => {
    return (
        <article className="border border-gray-200 p-2 rounded-lg shadow-md flex flex-col gap-1 bg-white hover:shadow-lg transition-shadow duration-200 ease-in-out mt-2">
            {/* Task Details */}
            <div className="flex justify-between items-center gap-4 w-full">
                <div className="flex items-center gap-2 w-full">
                    {/* Complete Checkbox */}
                    <CheckBox task={task} setRefetchTasks={setRefetchTasks} />
                    {/* Task Title */}
                    <h3
                        className='text-lg font-semibold text-gray-900 flex-grow'
                        title={task.title}
                    >
                        {/* Truncate the title to 30 characters and add an ellipsis if necessary */}
                        {task.title}
                    </h3>
                </div>
                {/* Task Due Date */}
                <time className="text-sm text-gray-600">
                    {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                        })
                        : 'No due date'}
                </time>
            </div>

            {/* Action Buttons (Edit & Delete) */}
            <div className="flex space-x-1 mt-2">
                <button
                    onClick={() => {
                        setTaskToEdit(true);
                        setTaskId(task._id);
                    }}
                    className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-150 ease-in-out text-xs shadow-md"
                >
                    Edit
                </button>
                <button
                    onClick={() => deleteTasks(task._id)}
                    className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-150 ease-in-out text-xs shadow-md"
                >
                    Delete
                </button>
            </div>
        </article >
    );
};

export default TaskItem;
