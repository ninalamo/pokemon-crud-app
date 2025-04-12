'use client';

import { useState, useEffect } from "react";
import {
  getPokemons,
  addPokemon,
  updatePokemon,
  PokemonDTO,
  AddPokemonDTO,
  UpdatePokemonDTO,
} from "./services/pokemonService";
import DeleteButton from "./components/DeleteButton";

// Modal component for adding a new Pokémon
function AddPokemonModal({
  isOpen,
  onClose,
  onAdded,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}) {
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: AddPokemonDTO = { name };
      await addPokemon(payload);
      onAdded();       // refresh list when added
      onClose();       // close modal after addition
      setName("");     // reset the input field
    } catch (error) {
      console.error("Error adding Pokémon:", error);
      alert("An error occurred while adding the Pokémon.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg shadow-xl p-6 z-20 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Add New Pokémon</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Pokémon name"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Modal component for editing an existing Pokémon
function EditPokemonModal({
  isOpen,
  onClose,
  onUpdated,
  pokemon,
}: {
  isOpen: boolean;
  onClose: () => void;
  onUpdated: () => void;
  pokemon: PokemonDTO | null;
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (pokemon) {
      setName(pokemon.name);
    }
  }, [pokemon]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!pokemon) return;
      const payload: UpdatePokemonDTO = { id: pokemon.id, name };
      await updatePokemon(pokemon.id, payload);
      onUpdated();   // refresh list after updating
      onClose();     // close modal
    } catch (error) {
      console.error("Error updating Pokémon:", error);
      alert("An error occurred while updating the Pokémon.");
    }
  };

  if (!isOpen || !pokemon) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        {/* Overlay */}
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="bg-white rounded-lg shadow-xl p-6 z-20 max-w-md mx-auto">
          <h2 className="text-xl font-bold mb-4">Edit Pokémon</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter new Pokémon name"
              required
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [pokemons, setPokemons] = useState<PokemonDTO[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDTO | null>(null);

  // Fetch the list of Pokémon from the API
  const fetchPokemons = async () => {
    try {
      const data = await getPokemons();
      setPokemons(data);
    } catch (err) {
      console.error("Error fetching pokemons:", err);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header with title and Add button */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Pokémon List</h1>
          <button
            onClick={() => setIsAddOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Add New Pokémon
          </button>
        </div>
        <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pokemons.map((pokemon) => (
              <tr key={pokemon.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{pokemon.id}</td>
                <td className="px-4 py-2">{pokemon.name}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => {
                      setSelectedPokemon(pokemon);
                      setIsEditOpen(true);
                    }}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <DeleteButton id={pokemon.id} onDeleted={fetchPokemons} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      <AddPokemonModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAdded={fetchPokemons}
      />
      <EditPokemonModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onUpdated={fetchPokemons}
        pokemon={selectedPokemon}
      />
    </div>
  );
}