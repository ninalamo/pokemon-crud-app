'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPokemonById, updatePokemon } from '../../../services/pokemonService';

export default function UpdatePokemon() {
  const params = useParams();
  const id = Number(params.id); // Get the Pokémon ID from the URL
  const router = useRouter();
  const [name, setName] = useState<string>(''); // State for the Pokémon name

  // Fetch the Pokémon's current name when the page loads
  useEffect(() => {
    async function fetchPokemon() {
      try {
        const pokemon = await getPokemonById(id); // Fetch Pokémon by ID
        setName(pokemon.name || ''); // Set the name as the default value
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      }
    }
    fetchPokemon();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await updatePokemon(id, {
        name,
        id: id
      }); // Update the Pokémon with the new name
      alert('Pokemon updated successfully!');
      router.push('/'); // Redirect to the home page
    } catch (error) {
      console.error('Error updating Pokémon:', error);
      alert('There was an error updating the Pokémon.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 shadow rounded">
        <h1 className="text-xl font-bold mb-4">Update Pokémon</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Pokémon Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name} // Preloaded with the current name
            onChange={(e) => setName(e.target.value)} // Editable
            placeholder="Enter new name"
            required
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
}