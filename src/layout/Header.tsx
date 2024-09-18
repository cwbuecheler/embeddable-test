// React & 3rd Party Libraries
import { useState } from 'react';
import cx from 'clsx';

// Mantine & Related
import { Container, Group, Burger, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useHover } from '@mantine/hooks';

// Local Modules
import classes from './Header.module.css';
import pikagraph from '../assets/pikagraph.svg';

// TS Types
import { HeaderLink } from '../../types/data';

const links: HeaderLink[] = [
	{ label: 'Home', link: '/home' },
	{ label: 'ReadMe', link: '/readme' },
];

// I like to keep Props typedefs in the component rather than a separate file
type Props = {
	handleMenuClick: (label: string) => void;
};

const Header: React.FC<Props> = (props) => {
	const { handleMenuClick } = props;

	const [opened, { toggle }] = useDisclosure(false);
	const { hovered, ref } = useHover();
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
					<div className={cx(classes.pikadiv, { [classes.hovered]: hovered })} ref={ref}>
						<img src={pikagraph} className={classes.pikagraph} alt="Pikagraph Image" />
					</div>
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
