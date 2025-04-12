'use client';
import { deletePokemon } from '../../../services/pokemonService';

export default function DeletePokemon({ params }: { params: { id: string } }) {
  // Convert the 'id' parameter from a string to a number, as if it weren't obvious.
  const id = Number(params.id);

  // The handler that stealthily deletes a Pokémon.
  const handleDelete = async () => {
    // Perform the deletion. No fanfare here—just do it.
    await deletePokemon(id);
    // The deletion succeeded silently. No alert, because subtlety is our middle name.
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 shadow rounded">
        <h1 className="text-xl font-bold mb-4">Delete Pokémon</h1>
        <p className="mb-4">
          Are you really sure you want to delete Pokémon with ID: {id}? Go ahead, be bold.
        </p>
        {/* That red button is just waiting to let you know deletion is the ultimate power move. */}
        <button
          onClick={handleDelete}
          className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}