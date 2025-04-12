// services/pokemonService.ts
import axios from 'axios';

// Use the environment variable, fallback to a development URL if not set.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5178/api/pokemons';

export interface PokemonDTO {
  id: number;
  name: string;
}

export interface AddPokemonDTO {
  name: string;
}

export interface UpdatePokemonDTO {
  id: number;
  name: string;
}

export const getPokemons = async (): Promise<PokemonDTO[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const getPokemonById = async (id: number): Promise<PokemonDTO> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

export const addPokemon = async (pokemon: AddPokemonDTO): Promise<PokemonDTO> => {
  const response = await axios.post(API_BASE_URL, pokemon);
  return response.data;
};

export const updatePokemon = async (
  id: number,
  pokemon: UpdatePokemonDTO
): Promise<PokemonDTO> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, pokemon);
  return response.data;
};

export const deletePokemon = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};