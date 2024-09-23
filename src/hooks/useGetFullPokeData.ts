// React & 3rd Party Libraries
import { useState } from 'react';

// TS Types
import { PokemonListItem, Pokemon } from '../../types/data';

// iterate over all the pokemon and get their data
const getFullPokemonData = async (allPokemon: PokemonListItem[]) => {
	if (allPokemon.length > 0) {
		const pokemonRespPromises: Promise<Response>[] = [];
		for (const pokemonStub of allPokemon) {
			try {
				const result = fetch(pokemonStub.url);
				pokemonRespPromises.push(result);
			} catch (err: any) {
				console.error(`Couldn't fetch pokémon ${pokemonStub.name} - ${err.message}`);
			}
		}

		// Wait for all the promises to settle
		const responses = await Promise.allSettled(pokemonRespPromises);

		// Handle rejections
		responses.forEach((resp) => {
			if (resp.status === 'rejected') {
				console.error(`Couldn't fetch pokémon - ${resp.reason}`);
			}
		});

		// Filter down to just the successful pokemon fetches
		const fulfilledResps = responses
			.filter((resp) => resp.status === 'fulfilled')
			.map((resp) => resp.value);

		// Convert fulfilled responses to JSON
		const pokemonJsonPromises: Promise<Pokemon>[] = [];
		for (const resp of fulfilledResps) {
			try {
				const pokemonJson = resp.json();
				pokemonJsonPromises.push(pokemonJson);
			} catch (err: any) {
				console.error(`Couldn't convert pokemon response to JSON - ${err}`);
			}
		}

		// Wait for all the promises to settle
		const allPokemonJson: PromiseSettledResult<Pokemon>[] = await Promise.allSettled(
			pokemonJsonPromises,
		);

		// Filter down to just the successful pokemon json
		const fulfilledJson = allPokemonJson
			.filter((resp) => resp.status === 'fulfilled')
			.map((resp) => resp.value);
		return fulfilledJson;
	}

	// If we didn't get a list of pokemon to begin with, return an empty array
	return [];
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
