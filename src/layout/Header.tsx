// React & 3rd Party Libraries
import { useState } from 'react';

// Mantine & Related
import { Container, Group, Burger, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

// Local Modules
import pikagraph from '../assets/pikagraph.svg';
import classes from './Header.module.css';

// TS Types
import type { Link } from '../../types/data.d.ts';

const links: Link[] = [
	{ link: '/home', label: 'Home' },
	{ link: '/readme', label: 'ReadMe' },
];

// TBD
type Props = {
	handleMenuClick: (linkName: string) => void;
};

const Header: React.FC<Props> = (props) => {
	const { handleMenuClick } = props;

	const [opened, { toggle }] = useDisclosure(false);
	const [active, setActive] = useState(links[0].link);

	const items = links.map((link) => (
		<a
			key={link.label}
			href={link.link}
			className={classes.link}
			data-active={active === link.link || undefined}
			onClick={(event) => {
				event.preventDefault();
				setActive(link.link);
				handleMenuClick(link.label);
			}}
		>
			{link.label}
		</a>
	));

	return (
		<header className={classes.header}>
			<Container size="md" className={classes.inner}>
				<Group>
					<Title order={1}>PokéCharts</Title>
					<img src={pikagraph} className={classes.pikagraph} alt="Pikagraph Image" />
				</Group>
				<Group gap={5} visibleFrom="xs">
					{items}
				</Group>

				<Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
			</Container>
		</header>
	);
};

export default Header;
