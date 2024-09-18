// React & 3rd Party Libraries
import { useState } from 'react';

// Mantine
import { Anchor, Box, ScrollArea, Table, TextInput } from '@mantine/core';

// TS Types
import { Pokemon, PokemonType } from '../../types/data';

interface Props {
	fullPokemonData: Pokemon[];
}

const PokeTable: React.FC<Props> = (props) => {
	const { fullPokemonData } = props;

	const [search, setSearch] = useState('');
	const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>(fullPokemonData);

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		const filteredData = fullPokemonData.filter((pokemon) => pokemon.name.includes(value));
		setFilteredPokemon(filteredData);
	};

	// Render Table Rows
	const TableRows = filteredPokemon.map((pokemon: Pokemon) => {
		if (pokemon.types?.length < 1) {
			return <span>Unknown</span>;
		}
		const typeElements = pokemon.types.map((typeEntry: PokemonType, index: number) => {
			return (
				<span key={`${pokemon.name}-${index}`}>
					<Anchor href={typeEntry.type.url} target="_blank">
						{typeEntry.type.name}
					</Anchor>
					{`${index !== pokemon.types.length - 1 ? ', ' : ''}`}
				</span>
			);
		});

		return (
			<Table.Tr key={pokemon.name}>
				<Table.Td>{pokemon.name}</Table.Td>
				<Table.Td>{typeElements}</Table.Td>
				<Table.Td>{pokemon.weight}</Table.Td>
			</Table.Tr>
		);
	});

	// Render Table Container
	return (
		<Box>
			<TextInput
				placeholder="Search by name"
				mb="md"
				value={search}
				onChange={handleSearchChange}
			/>
			<ScrollArea h={300} type="always">
				<Table miw={700}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Name</Table.Th>
							<Table.Th>Type</Table.Th>
							<Table.Th>Weight</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>{TableRows}</Table.Tbody>
				</Table>
			</ScrollArea>
		</Box>
	);
};

export default PokeTable;
