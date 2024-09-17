// React & 3rd Party Libraries
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

// Mantine & Related
import { Box } from '@mantine/core';

// Local Modules
import classes from './Readme.module.css';

const ReadMe = () => {
	const [markdown, setMarkdown] = useState('');

	useEffect(() => {
		fetch('../../README.md')
			.then((response) => response.text())
			.then((text) => setMarkdown(text));
	}, []);

	return (
		<Box className={classes.textcontainer}>
			<ReactMarkdown>{markdown}</ReactMarkdown>
		</Box>
	);
};

export default ReadMe;
