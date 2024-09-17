import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const ReadMe = () => {
	const [markdown, setMarkdown] = useState('');

	useEffect(() => {
		fetch('../../README.md')
			.then((response) => response.text())
			.then((text) => setMarkdown(text));
	}, []);

	return <ReactMarkdown>{markdown}</ReactMarkdown>;
};

export default ReadMe;
