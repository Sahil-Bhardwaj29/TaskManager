import React from "react"
import { useState } from "react"
import TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ListChecks, CheckCircle, Circle } from "lucide-react";



function App() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'



  const addTask = (task) => {
    if (editIndex !== null) {
      // Updating the existing task
      // Keep the previous completed state while editing
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = {
        ...task,
        completed:tasks[editIndex].completed,
      }; // Update the task at editIndex

      setTasks(updatedTasks);
      setEditIndex(null); // Reset edit mode after updating
    } else {
      // Adding a new task with completed set to false
      const newTask = { ...task, completed: false };
      setTasks((prev) => [...prev, newTask]);
    }
  };
  // Delete task at given index
  const deleteTask=(indexToDelete)=>{
    setTasks((prev)=>prev.filter((_,index)=>index!== indexToDelete))
  }

  const onEditTask = (index) => {
    setEditIndex(index); // This tells TaskForm which task to load
  };

  const toggleComplete = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // Show all tasks by default
  });
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <ToastContainer position="top-center" />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Left: Task Input */}
        <TaskForm 
          onAddTask={addTask}
          editIndex={editIndex}
          task={tasks[editIndex]}
          setEditIndex={setEditIndex}
        />

      <div>
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`flex items-center gap-2 py-2 px-4 rounded border ${
            filter === 'all'
              ? 'border-2 border-black bg-white text-black'
              : 'border border-gray-300 bg-blue-500 text-white hover:bg-blue-600'
          }`}
        >
          <ListChecks size={18} />
          <span>All</span>
        </button>

        <button
          onClick={() => setFilter('completed')}
          className={`flex items-center gap-2 py-2 px-4 rounded border ${
            filter === 'completed'
              ? 'border-2 border-black bg-white text-black'
              : 'border border-gray-300 bg-green-500 text-white hover:bg-green-600'
          }`}
        >
          <CheckCircle size={18} />
          <span>Completed</span>
        </button>

        <button
          onClick={() => setFilter('incomplete')}
          className={`flex items-center gap-2 py-2 px-4 rounded border ${
            filter === 'incomplete'
              ? 'border-2 border-black bg-white text-black'
              : 'border border-gray-300 bg-yellow-500 text-white hover:bg-yellow-600'
          }`}
        >
          <Circle size={18} />
          <span>Incomplete</span>
        </button>
      </div>


        {/* Right: Task List */}
        <TaskList 
          tasks={filteredTasks} 
          onDeleteTask={deleteTask}
          onEditTask={onEditTask}
          onToggleComplete={toggleComplete}
        />
      </div>  
      </div>
      
    </div>
  )
}

export default App
