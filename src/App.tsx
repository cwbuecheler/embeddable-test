// React & 3rd Party Libraries
import { useState } from 'react';

// Mantine & Related
import { Box, Container } from '@mantine/core';

// Local Modules
import Header from './layout/Header';
import Home from './pages/Home';
import ReadMe from './pages/ReadMe';
import classes from './App.module.css';

const App = () => {
	// Extremely half-assed routing :)
	const [page, setPage] = useState<string>('Home');

	const handleMenuClick = (label: string) => {
		// we could just pass setPage directly, but using a handler allows future flexibility
		setPage(label);
	};

	return (
		<Container>
			<Header handleMenuClick={handleMenuClick} />
			<Box className={classes.content}>{page === 'Home' ? <Home /> : <ReadMe />}</Box>
		</Container>
	);
};

export default App;
