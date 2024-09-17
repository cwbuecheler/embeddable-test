export type Link = {
	label: string;
	link: string;
};

export type AllPokemonJson = {
	count: number;
	next: string;
	previous: string;
	results: PokeJsonItem[];
};

export type AllPokemonJsonItem = {
	name: string;
	url: string;
};

type PokemonTypes = {
	[key: string]: number;
};

type PokeTypeData = {
	type: string;
	count: number;
};

/*
 * Didn't want to spend a huge amount of time typing the entire API value for a full pokemon
 * object ... but I wanted some sort of typing to carry through the app!
 */
export type FullPokeDataPartial = {
	abilities: any[];
	base_experience: number;
	cries: any;
	forms: any[];
	game_indices: any[];
	height: number;
	held_items: any[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: any[];
	name: string;
	order: number;
	past_abilities: any[];
	past_types: any[];
	species: {
		name: string;
		url: string;
	};
	sprites: any;
	stats: any[];
	types: PokeType[];
	weight: number;
};

type PokeType = {
	slot: 1;
	type: {
		name: string;
		url: string;
	};
};
