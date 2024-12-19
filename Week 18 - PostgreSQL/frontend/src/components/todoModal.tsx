import React from "react";

interface TodoModalProps {
  todo: any;
  onClose: () => void;
  onDelete: () => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, onClose, onDelete }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {todo.title}
        </h3>
        <p className="text-sm text-gray-600 mb-4">{todo.description}</p>
        <p className="text-xs text-gray-400 mb-4">
          Created on: {new Date(todo.created_date).toLocaleDateString()}
        </p>
        <p
          className={`mb-4 text-sm ${
            todo.done ? "text-green-500" : "text-red-500"
          }`}
        >
          {todo.done ? "Completed" : "Not Completed"}
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={onDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
