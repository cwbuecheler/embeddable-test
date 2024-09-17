// React & 3rd Party Libraries
import { useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Mantine & Related
import { Box, Space, Switch } from '@mantine/core';

Chart.register(CategoryScale);

// TS Types
import { FullPokeDataPartial, PokemonTypes, PokeTypeData } from '../../types/data';

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

const createPokeData = (fullData: FullPokeDataPartial[], dataType: string) => {
	const pokeTypeMap: PokemonTypes = {};
	let fullCount = 0;
	if (fullData.length < 1) {
		return [];
	}

	// Fill the map
	for (let pokemon of fullData) {
		for (let type of pokemon.types) {
			if (pokeTypeMap[type.type.name]) {
				pokeTypeMap[type.type.name] += 1;
				fullCount += 1;
			} else {
				pokeTypeMap[type.type.name] = 1;
				fullCount += 1;
			}
		}
	}
	// Create a data array
	let pokeDataArray: PokeTypeData[] = [];
	for (let [key, value] of Object.entries(pokeTypeMap)) {
		pokeDataArray.push({
			type: key,
			count: dataType === 'percents' ? parseFloat(((value / fullCount) * 100).toFixed(2)) : value,
		});
	}

	// Sort the data array in ascending order and return it
	return pokeDataArray.sort((a, b) => b.count - a.count);
};

type Props = {
	fullPokemonData: FullPokeDataPartial[];
};

const BarByType: React.FC<Props> = (props) => {
	const { fullPokemonData } = props;

	const [checked, setChecked] = useState(false);
	const [pokeBarData, setPokeBarData] = useState<PokeTypeData[]>(
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
		<div>
			<Bar
				data={{
					labels: pokeBarData.map((row) => row.type),
					datasets: [
						{
							label: `Pokemon By Type ${checked ? '(percent)' : '(count)'}`,
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
			<Space h="md" />
			<Box pl={30}>
				<Switch checked={checked} label="Show Percents" onChange={handleToggle} />
			</Box>
		</div>
	);
};

export default BarByType;
