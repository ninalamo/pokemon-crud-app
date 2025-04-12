'use client';
import { useState } from 'react';
import { deletePokemon } from './../services/pokemonService';

interface DeleteButtonProps {
  id: number;
  onDeleted?: () => void;
}

export default function DeleteButton({ id, onDeleted }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePokemon(id);
      // Removed the success alert here.
      setIsOpen(false);
      if (onDeleted) {
        onDeleted();
      } else {
        window.location.reload(); // Optionally reload the page
      }
    } catch (error) {
      console.error('Error deleting Pokemon:', error);
      alert('Failed to delete Pokemon.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="bg-white rounded-lg shadow-xl p-6 z-20 max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this Pokemon?</p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}