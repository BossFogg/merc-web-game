import React from 'react';
import NavList from './NavList';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return (
		<header>
			<Link to="/">
				<Logo />
			</Link>
			<NavList />
		</header>
	);
}

export default Header;