import React, {useState} from 'react'
import {Edit3, Trash2, X} from "lucide-react";
import useAuthStore from "../store/auth.store.js";

const Card = ({children}) => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
            {children}
        </div>
    )
}


 const TodoListCard = ({ id, title, description, status }) => {
    const { updateToDo, deleteToDo } = useAuthStore();
    const [showDialog, setShowDialog] = useState(false);
    const [editTitle, setEditTitle] = useState(title);
    const [editDescription, setEditDescription] = useState(description);
    const [editStatus, setEditStatus] = useState(status);

    const handleUpdate = async () => {
        await updateToDo(id, {
            title: editTitle,
            description: editDescription,
            status: editStatus,
        });
        setShowDialog(false);
    };

    const handleDelete = async (id) => {
            await deleteToDo(id);

    };

    return (
        <>
            {/* Card */}
            <div className="bg-[#202228] px-8 py-3.5 rounded-lg shadow-md w-full flex justify-between mb-3">
                <div className="flex flex-col items-start justify-center pr-2">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-[#e8ecf4] mb-4">{description}</p>
                </div>
                <div className="flex items-center justify-center">
          <span
              className={`px-3 py-1 rounded-md text-sm ${
                  status === "completed" ? "bg-[#377f53]" : "bg-[#a33d3b]"
              }`}
          >
            {status}
          </span>
                    <Edit3
                        size={16}
                        className="ml-4 cursor-pointer text-blue-500 hover:underline"
                        onClick={() => setShowDialog(true)}
                    />
                    <Trash2
                        size={16}
                        className="ml-4 cursor-pointer text-red-500 hover:underline"
                        onClick={()=>handleDelete(id)}
                    />
                </div>
            </div>


            {showDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
                    <div className="bg-[#1a1d23] p-6 rounded-lg shadow-lg w-full max-w-md relative">

                        <button
                            onClick={() => setShowDialog(false)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-white"
                        >
                            <X size={20}/>
                        </button>

                        <h3 className="text-xl font-bold mb-4">Edit Task</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Title
                            </label>
                            <input
                                type="text"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Description
                            </label>
                            <textarea
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                                rows={3}
                            ></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-400 mb-2">
                                Status
                            </label>
                            <select
                                value={editStatus}
                                onChange={(e) => setEditStatus(e.target.value)}
                                className="w-full p-2 rounded-md bg-gray-700 text-white focus:outline-none"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <button
                            onClick={handleUpdate}
                            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-200"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            )}
        </>
    );
 };

export {Card, TodoListCard}