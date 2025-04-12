'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getPokemonById, updatePokemon } from '../../../services/pokemonService';

export default function UpdatePokemon() {
  // Grab the Pokémon ID from the URL—yes, it's there if you look.
  const params = useParams();
  const id = Number(params.id);

  // Set up the router for navigation (because we all love a good redirect).
  const router = useRouter();

  // This state holds the Pokémon name. We initialize it to an empty string,
  // assuming our API isn’t too kind to leave it undefined.
  const [name, setName] = useState<string>('');

  // When the component mounts, fetch the current Pokémon details.
  useEffect(() => {
    async function fetchPokemon() {
      try {
        // Attempt to fetch the Pokémon by its ID—fingers crossed!
        const pokemon = await getPokemonById(id);
        // Set the name using the fetched data, or default to an empty string if something went wrong.
        setName(pokemon.name || '');
      } catch (error) {
        // Log an error if the fetch fails. Because error handling is important.
        console.error('Error fetching Pokémon:', error);
      }
    }
    fetchPokemon();
  }, [id]); // Re-run this effect only if the ID changes, because consistency matters.

  // When the user submits the form, update the Pokémon.
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the form from doing its default dance.
    try {
      // Send the updated Pokémon info to the API.
      // Yes, we're redundantly sending the ID in the request body—because some APIs like extra assurance.
      await updatePokemon(id, { id: id, name });
      // Celebrate our success with an alert. Enjoy the moment!
      alert('Pokemon updated successfully!');
      // Redirect back to the home page so you can admire your handiwork.
      router.push('/');
    } catch (error) {
      // Log the error when things don't go as planned. Oops.
      console.error('Error updating Pokémon:', error);
      // Inform the user that the update didn't work. Not every day is perfect.
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
            value={name} // The input is preloaded with the current name. You're welcome.
            onChange={(e) => setName(e.target.value)} // Adjust the name because change happens.
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