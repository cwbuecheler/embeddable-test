// Mantine & Related
import { Box, Divider, Loader, Space } from '@mantine/core';

// Local Modules
import BarByType from '../charts/BarByType';
import PieByType from '../charts/PieByType';
import useGetAllPokemon from '../hooks/useGetAllPokemon';
import useGetFullPokeData from '../hooks/useGetFullPokeData';

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
				<>
					<BarByType fullPokemonData={fullPokemonData} />
					<Space h="xl" mb={30} />
					<Divider />
					<Space h="xl" mt={30} />
					<PieByType fullPokemonData={fullPokemonData} />
				</>
			)}
		</Box>
	);
};

export default Home;
