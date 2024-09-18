// React & 3rd Party Libraries
import { useEffect, useState } from 'react';

// TS Types
import { PokemonList, PokemonListItem } from '../../types/data';

// Use the PokéAPI to fetch data about the first 151 Pokémon (Generation 1).
const fetchPokemon = async () => {
	try {
		const pokeResp = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

		// Handle non-200 responses
		if (pokeResp.status !== 200) {
			const text = await pokeResp.text();
			throw new Error(`${pokeResp.status} - ${text}`);
		}

		// Get response JSON
		const pokeJson: PokemonList = await pokeResp.json();

		// If there's no results property, something went wrong
		if (!pokeJson.results) {
			throw new Error(`No results`);
		}

		return pokeJson?.results;
	} catch (err: any) {
		console.error(`Couldn't fetch Pokémon - ${err.message}`);
	}
};

// Main Hook
const useGetAllPokemon = () => {
	const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);

	useEffect(() => {
		// Initial data fetch
		fetchPokemon().then((data) => {
			if (!data) {
				return;
			}
			setAllPokemon(data);
		});
	}, []);

	return allPokemon;
};

export default useGetAllPokemon;
