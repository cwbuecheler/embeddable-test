// React & 3rd Party Libraries
import { useState } from 'react';

// TS Types
import { PokemonListItem, Pokemon } from '../../types/data';

// iterate over all the pokemon and get their data
const getFullPokemonData = async (allPokemon: PokemonListItem[]) => {
	const allPokemonData: any[] = [];
	if (allPokemon.length > 0) {
		for (let pokemon of allPokemon) {
			try {
				// I don't love awaiting in loops. In a refactor I'd work with Promise.allSettled
				// but I don't know that syntax as well, so sticking w/ await for expediency
				const result = await fetch(pokemon.url);
				if (result.status !== 200) {
					throw new Error(`failed fetch - ${result.status}`);
				}
				const json = await result.json();
				allPokemonData.push(json);
			} catch (err: any) {
				console.error(`Couldn't fetch pokémon ${pokemon.name} - ${err.message}`);
			}
		}
	}
	return allPokemonData;
};

// Main Hook
const useGetFullPokeData = (allPokemon: PokemonListItem[]) => {
	const [fullPokeData, setFullPokeData] = useState<Pokemon[]>([]);
	const [hasQueriedAPI, setHasQueriedAPI] = useState<boolean>(false);

	if (allPokemon.length > 0 && fullPokeData.length < 1 && !hasQueriedAPI) {
		getFullPokemonData(allPokemon).then((resp) => {
			setFullPokeData(resp);
			// cutting down on API hits
			setHasQueriedAPI(true);
		});
	}

	return fullPokeData;
};

export default useGetFullPokeData;
