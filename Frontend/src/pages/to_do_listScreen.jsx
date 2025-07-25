import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { TodoListCard } from "../components/card.jsx";
import useAuthStore from "../store/auth.store.js";
import {useNavigate} from "react-router-dom";

const ToDoListScreen = () => {
    const { todolist, addToDo ,logout,loading} = useAuthStore();
    const [showDialog, setShowDialog] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleCreateTask = async () => {
        if (!title.trim()) return alert('Title is required');

        await addToDo({title, description, status: 'pending'});
        setTitle('');
        setDescription('');
        setShowDialog(false);
    };
    const handleLogout = async () => {
        await logout();
    }

    return (
        <section className="flex items-center justify-center bg-gradient-to-b from-[#222429] to-[#111316] h-screen text-white">
            <div className="bg-gradient-to-b from-[#202228] to-[#13151a] p-8 rounded-lg shadow-lg w-full max-w-[800px]">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <h2 className="text-2xl font-bold mb-6 text-center">My To-Do List</h2>
                    <button className="bg-red-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                {/* Add Task Button */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setShowDialog(true)}
                        className="bg-[#2e5895] text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center gap-2"
                    >
                        {loading ? 'loading' : <Plus size={16} />}
                        Add Task

                    </button>
                </div>

                {todolist && todolist.length > 0 ? (
                    todolist.map((task) => (
                        <TodoListCard
                            key={task.id}
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                        />
                    ))
                ) : (
                    <p className="text-gray-500 text-center">
                        No tasks available. Add a new task to get started!
                    </p>
                )}
            </div>

            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                    <div className="bg-[#1a1d23] p-6 rounded-lg shadow-lg w-full max-w-md relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowDialog(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>

                        <h3 className="text-xl font-bold mb-4">Create New Task</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                                placeholder="Enter task title"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Description
                            </label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                                placeholder="Enter task description"
                                rows={3}
                            ></textarea>
                        </div>
                        <button
                            onClick={handleCreateTask}
                            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200"
                        >
                            Create
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ToDoListScreen;
