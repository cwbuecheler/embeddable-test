// React & 3rd Party Libraries
import { useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Mantine & Related
import { Box, Space, Switch, Title } from '@mantine/core';

// Local Modules
import classes from './PieByType.module.css';
import { capitalize } from '../../utils/common.ts';

// TS Types
import { Pokemon, PokemonTypeItem } from '../../types/data';

Chart.register(CategoryScale);

const colors = ['#3DC2FF', '#2441FF'];

type Props = {
	fullPokemonData: Pokemon[];
};

// Helper function to format the data for Chart.js
const createPokeData = (fullData: Pokemon[], dataType: string) => {
	const fullCount = fullData.length;
	const pokeTypeMap = {
		single: 0,
		dual: 0,
	};

	if (fullData.length < 1) {
		return [];
	}

	for (const pokemon of fullData) {
		if (pokemon.types.length < 2) {
			pokeTypeMap.single += 1;
		} else {
			pokeTypeMap.dual += 1;
		}
	}

	// Create a data array
	const pokeDataArray: PokemonTypeItem[] = [];
	for (const [key, value] of Object.entries(pokeTypeMap)) {
		pokeDataArray.push({
			type: capitalize(key),
			count: dataType === 'percents' ? parseFloat(((value / fullCount) * 100).toFixed(2)) : value,
		});
	}

	// Sort the data array in ascending order and return it
	return pokeDataArray.sort((a, b) => b.count - a.count);
};

// Main Component
const PieByType: React.FC<Props> = (props) => {
	const { fullPokemonData } = props;

	const [checked, setChecked] = useState(false);
	const [pokePieData, setPokePieData] = useState<PokemonTypeItem[]>(
		createPokeData(fullPokemonData, 'counts'),
	);

	const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.currentTarget.checked) {
			setPokePieData(createPokeData(fullPokemonData, 'percents'));
		} else {
			setPokePieData(createPokeData(fullPokemonData, 'counts'));
		}
		setChecked(event.currentTarget.checked);
	};
	return (
		<>
			<Title order={2}>
				{`Single vs. Dual-Class Pokémon ${checked ? '(percent)' : '(count)'}`}
			</Title>
			<Space h="md" />
			<Switch checked={checked} label="Show Percents" onChange={handleToggle} />
			<Space h="lg" />
			<Box className={classes.piewrap}>
				<Pie
					data={{
						labels: pokePieData.map((row) => row.type),
						datasets: [
							{
								label: `Single vs. Dual-Type Pokémon`,
								data: pokePieData.map((row) => row.count),
								backgroundColor: colors,
							},
						],
					}}
					options={{
						plugins: {
							legend: {
								display: true,
							},
							tooltip: {
								callbacks: {
									label: (ctx) => {
										const label = ctx.dataset.label;
										const formattedValue = ctx.formattedValue;
										return `${label} ${formattedValue}${checked ? '%' : ''}`;
									},
								},
							},
						},
					}}
				/>
			</Box>
		</>
	);
};

export default PieByType;
