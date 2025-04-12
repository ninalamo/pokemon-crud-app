// services/pokemonService.ts
import axios from 'axios';

/*
 * API_BASE_URL:
 * This constant holds the base URL for your Pokémon API.
 * It uses the environment variable NEXT_PUBLIC_API_BASE_URL if it's set,
 * or else defaults to 'http://localhost:5178/api/pokemons'.
 * Because apparently, we all love fallback values when we can't be bothered setting one.
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5178/api/pokemons';

/*
 * PokemonDTO:
 * This interface represents the Pokémon data as returned by the API.
 * If this doesn't make sense to you, try reading the documentation—it's surprisingly helpful.
 */
export interface PokemonDTO {
  id: number;
  name: string;
}

/*
 * AddPokemonDTO:
 * This interface is for adding a new Pokémon.
 * Only the 'name' is required because the API magically assigns an ID.
 */
export interface AddPokemonDTO {
  name: string;
}

/*
 * UpdatePokemonDTO:
 * This interface is used when updating an existing Pokémon.
 * Yes, it insists on both id and name—because why make it simple?
 */
export interface UpdatePokemonDTO {
  id: number;
  name: string;
}

/*
 * getPokemons:
 * Fetches an array of Pokémon from the API.
 * If you can't handle asynchronous code, you might want to read up on async/await.
 */
export const getPokemons = async (): Promise<PokemonDTO[]> => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

/*
 * getPokemonById:
 * Fetches a single Pokémon by its ID.
 * It simply appends the ID to the base URL—try to keep up.
 */
export const getPokemonById = async (id: number): Promise<PokemonDTO> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

/*
 * addPokemon:
 * Sends a POST request to add a new Pokémon.
 * The request body is just the name because apparently less is more.
 */
export const addPokemon = async (pokemon: AddPokemonDTO): Promise<PokemonDTO> => {
  const response = await axios.post(API_BASE_URL, pokemon);
  return response.data;
};

/*
 * updatePokemon:
 * Updates an existing Pokémon.
 * Even though the ID is in the URL, the API requires it in the body too—don't ask me why.
 */
export const updatePokemon = async (
  id: number,
  pokemon: UpdatePokemonDTO
): Promise<PokemonDTO> => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, pokemon);
  return response.data;
};

/*
 * deletePokemon:
 * Deletes a Pokémon by its ID.
 * It returns nothing, so if you were expecting a drama-filled response, you're out of luck.
 */
export const deletePokemon = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};