// React & 3rd Party Libraries
import { useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Mantine & Related
import { Box, Space, Switch, Title } from '@mantine/core';

// Local Modules
import { capitalize } from '../../utils/common.ts';

// TS Types
import { Pokemon, PokemonTypeMap, PokemonTypeItem } from '../../types/data';

Chart.register(CategoryScale);

const colors = [
	'#094E1A',
	'#26660A',
	'#6E7F0A',
	'#99600A',
	'#B41108',
	'#D00668',
	'#E404EC',
	'#700AFF',
	'#2441FF',
	'#3DC2FF',
	'#57FFD8',
	'#70FF8F',
	'#B1FF8A',
	'#F4FFA3',
	'#FFE2BD',
	'#FFD7D6',
	'#FFF0F8',
];

type Props = {
	fullPokemonData: Pokemon[];
};

// Helper function to format the data for Chart.js
const createPokeData = (fullData: Pokemon[], dataType: string) => {
	const pokeTypeMap: PokemonTypeMap = {};
	let fullCount = 0;
	if (fullData.length < 1) {
		return [];
	}

	// Fill the map
	for (let pokemon of fullData) {
		for (let typeEntry of pokemon.types) {
			if (pokeTypeMap[typeEntry.type.name]) {
				pokeTypeMap[typeEntry.type.name] += 1;
				fullCount += 1;
			} else {
				pokeTypeMap[typeEntry.type.name] = 1;
				fullCount += 1;
			}
		}
	}
	// Create a data array
	let pokeDataArray: PokemonTypeItem[] = [];
	for (let [key, value] of Object.entries(pokeTypeMap)) {
		pokeDataArray.push({
			type: capitalize(key),
			count: dataType === 'percents' ? parseFloat(((value / fullCount) * 100).toFixed(2)) : value,
		});
	}

	// Sort the data array in ascending order and return it
	return pokeDataArray.sort((a, b) => b.count - a.count);
};

// Main Component
const BarByType: React.FC<Props> = (props) => {
	const { fullPokemonData } = props;

	const [checked, setChecked] = useState(false);
	const [pokeBarData, setPokeBarData] = useState<PokemonTypeItem[]>(
		createPokeData(fullPokemonData, 'counts'),
	);

	const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.checked) {
			setPokeBarData(createPokeData(fullPokemonData, 'percents'));
		} else {
			setPokeBarData(createPokeData(fullPokemonData, 'counts'));
		}
		setChecked(event.currentTarget.checked);
	};

	return (
		<Box>
			<Title order={2}>{`Pokémon By Type ${checked ? '(percent)' : '(count)'}`}</Title>
			<Space h="md" />
			<Switch checked={checked} label="Show Percents" onChange={handleToggle} />
			<Space h="lg" />
			<Bar
				data={{
					labels: pokeBarData.map((row) => row.type),
					datasets: [
						{
							label: '',
							data: pokeBarData.map((row) => row.count),
							backgroundColor: colors,
						},
					],
				}}
				options={{
					scales: {
						y: {
							ticks: {
								// Include a dollar sign in the ticks
								callback: (value) => {
									return `${value}${checked ? '%' : ''}`;
								},
							},
						},
					},
					plugins: {
						legend: {
							display: false,
						},
						tooltip: {
							callbacks: {
								label: (ctx) => {
									let label = ctx.dataset.label;
									let formattedValue = ctx.formattedValue;
									return `${label} ${formattedValue}${checked ? '%' : ''}`;
								},
							},
						},
					},
				}}
			/>
		</Box>
	);
};

export default BarByType;
