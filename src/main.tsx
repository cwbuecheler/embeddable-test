// React & 3rd Party Libraries
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Mantine & Related
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';

// Local Modules
import App from './App.tsx';

const theme = createTheme({
	// no theme overrides yet
});

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<MantineProvider theme={theme}>
			<App />
		</MantineProvider>
	</StrictMode>,
);
