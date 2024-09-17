// Mantine & Related
import { Box, Loader } from '@mantine/core';

// Local Modules
import useGetAllPokemon from '../hooks/useGetAllPokemon';
import useGetFullPokeData from '../hooks/useGetFullPokeData';
import BarByType from '../charts/BarByType';

// Main Component
const Home: React.FC = () => {
	const allPokemon = useGetAllPokemon();
	const fullPokemonData = useGetFullPokeData(allPokemon);

	return (
		<Box>
			{fullPokemonData.length < 1 ? (
				<Box ta="center">
					<Loader />
				</Box>
			) : (
				<BarByType fullPokemonData={fullPokemonData} />
			)}
		</Box>
	);
};

export default Home;
