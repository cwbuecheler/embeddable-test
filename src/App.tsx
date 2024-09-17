import { useState } from 'react';
import classes from './App.module.css';
import { Box, Container } from '@mantine/core';
import Header from './layout/Header';
import ReadMe from './pages/ReadMe';
import Home from './pages/Home';

function App() {
	// Half-assed routing :)
	const [page, setPage] = useState<string>('Home');

	const handleMenuClick = (linkName: string) => {
		// we could just pass setPage directly, but using a handler allows future flexibility
		setPage(linkName);
	};

	return (
		<Container>
			<Header handleMenuClick={handleMenuClick} />
			<Box className={classes.content}>{page === 'Home' ? <Home /> : <ReadMe />}</Box>
		</Container>
	);
}

export default App;
