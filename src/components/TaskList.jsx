import React from 'react'
import { Trash2 } from 'lucide-react'; // import the icon
import { Edit2 } from 'lucide-react'; // Import the Edit icon

function TaskList({tasks,onDeleteTask,onEditTask,onToggleComplete }) {
  
  
  return (
    <div className="mt-8">
        <h2 className="text-xl font-semibold">Task List</h2>
        <ul className="space-y-4">
        {tasks.map((task, index) => (
            
            <li key={index} className="p-4 bg-white cursor-pointer rounded-lg shadow-md">
            

            <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            <p className={`text-gray-600 ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.description}
            </p>

            <p className="text-gray-500">Due Date: {task.dueDate}</p>
            <p className={`text-sm font-semibold ${task.completed ? 'text-green-500' : 'text-yellow-500'}`}>
              {task.completed ? 'Completed' : 'Incomplete'}
            </p>
            <input 
              type="checkbox" 
              checked={task.completed ?? false} 
              onChange={() => onToggleComplete(index)} 
              className="mr-3 cursor-pointer accent-green-500"
            />
            <button
              onClick={() => onDeleteTask(index)}
              className="text-red-500 cursor-pointer hover:text-red-700 ml-4"
            >
              <Trash2 size={20} />
            </button>
            <button
              onClick={() => onEditTask(index)}
              className="text-blue-500 cursor-pointer hover:text-blue-700 ml-4"
            >
              <Edit2 size={20} />
            </button>
            </li>
        ))}
        </ul>
    </div>
  )
}

export default TaskList