import React from "react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null; // Don't render if the modal is not open

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold text-gray-800">{title || "Confirm Delete"}</h2>
                <p className="mt-2 text-gray-600">{message || "Are you sure you want to delete this item?"}</p>
                <div className="mt-4 flex justify-end space-x-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
