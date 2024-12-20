import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface TodoModalProps {
  todo: any;
  mode: "create" | "edit";
  onClose: () => void;
  onSave: (data: any) => void;
}

const TodoModal: React.FC<TodoModalProps> = ({ todo, mode, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: todo?.title || "",
    description: todo?.description || "",
    done: todo?.done || false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast.error("Title is required.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg mx-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {mode === "create" ? "Create Todo" : "Edit Todo"}
        </h3>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="done"
              checked={formData.done}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, done: e.target.checked }))
              }
            />
            <span>Completed</span>
          </label>
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {mode === "create" ? "Create" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoModal;
