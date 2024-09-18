export type HeaderLink = {
	label: string;
	link: string;
};

export type PokemonList = {
	count: number;
	next: string;
	previous: string;
	results: PokemonListItem[];
};

export type PokemonListItem = {
	name: string;
	url: string;
};

type PokemonTypeMap = {
	[key: string]: number;
};

type PokemonTypeItem = {
	type: string;
	count: number;
};

/*
 * Didn't want to spend a huge amount of time typing the entire API value for a full pokemon
 * object ... but I wanted some sort of typing to carry through the app!
 */
export type Pokemon = {
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
	types: PokemonType[];
	weight: number;
};

type PokemonType = {
	slot: 1;
	type: {
		name: string;
		url: string;
	};
};
