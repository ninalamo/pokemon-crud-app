'use client';
import { useState } from 'react';
import { deletePokemon } from './../services/pokemonService';

interface DeleteButtonProps {
  id: number;
  onDeleted?: () => void;
}

export default function DeleteButton({ id, onDeleted }: DeleteButtonProps) {
  // Because we love modals—set up state to determine if our "Are you sure?" dialog is open.
  const [isOpen, setIsOpen] = useState(false);
  // State to keep track of whether the deletion is in progress.
  const [loading, setLoading] = useState(false);

  // This function does the heavy lifting: deleting the Pokémon.
  const handleDelete = async () => {
    setLoading(true); // Start showing that something is happening, even if you're just waiting.
    try {
      await deletePokemon(id); // Delete the Pokémon. No fanfare—just do it.
      setIsOpen(false); // Close the modal because—surprise!—the deletion is done.
      if (onDeleted) {
        onDeleted(); // Call the callback if someone (dare I say, you) bothered to pass one.
      } else {
        window.location.reload(); // If no callback, then reload the page like it's 1999.
      }
    } catch (error) {
      console.error('Error deleting Pokemon:', error);
      // Let the user know something went wrong. Because silence isn't golden in this case.
      alert('Failed to delete Pokemon.');
    } finally {
      setLoading(false); // Stop the loading indicator—finally, some closure.
    }
  };

  return (
    <>
      {/* A pretty button that opens the confirm-delete modal. Try not to smash it repeatedly. */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
      {isOpen && (
        // Our modal: a beautifully simple overlay asking, "Are you sure, genius?"
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            {/* The dim overlay—because we all need a break from reality. */}
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            {/* The modal content itself, where the real decisions are made. */}
            <div className="bg-white rounded-lg shadow-xl p-6 z-20 max-w-md mx-auto">
              <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
              <p>Are you sure you want to delete this Pokemon? Don't worry, we won't tell anyone if you change your mind.</p>
              <div className="mt-6 flex justify-end space-x-4">
                {/* Cancel button for the hesitant souls. */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                {/* The delete button that proceeds with deletion—because sometimes you just gotta do it. */}
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