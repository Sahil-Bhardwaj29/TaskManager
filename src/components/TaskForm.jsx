import React, { useEffect } from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify';

function TaskForm({ onAddTask,editIndex,task,setEditIndex }) {
    const [title,setTitle]=useState("")
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    useEffect(()=>{
        if(task){
            // When editing, populate form with task data
            setTitle(task.title);
            setDescription(task.description);
            setDueDate(task.dueDate);
        }
    },[task])// Update form fields if taskData changes

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the page from refreshing
      
        console.log(title, description, dueDate);
        if (!title || !description || !dueDate) {
          toast.error("Please fill out all fields!");
          return;
        }
      
        // Pass the data to the parent component (App)
        onAddTask({ title, description, dueDate });
      
        // Clear the form after submission (whether adding or updating)
        setTitle("");
        setDescription("");
        setDueDate("");
        setEditIndex(null); // Also exit edit mode
      };
      

  return (
    <div className='bg-white p-6 rounded-2xl shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-gray-700'>Add a new Task</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Task Title</label>
                <input
                    type="text"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="e.g. Complete DSA practice"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Description</label>
                <textarea
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Details about the task..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">Due Date</label>
                <input
                    type="date"
                    className="w-full border border-gray-300 p-2 rounded-md"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 cursor-pointer transition"
                >
                {editIndex !== null ? "Update Task" : "Add Task"}
            </button>
        </form>
        


    </div>
  )
}

export default TaskForm