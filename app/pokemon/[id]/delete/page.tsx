'use client';
import { useRouter } from 'next/router';
import { deletePokemon } from '../../../services/pokemonService';

export default function DeletePokemon({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const handleDelete = async () => {
    await deletePokemon(id);
    alert('Pokemon deleted successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-6 shadow rounded">
        <h1 className="text-xl font-bold mb-4">Delete Pokémon</h1>
        <p className="mb-4">Are you sure you want to delete Pokémon with ID: {id}?</p>
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