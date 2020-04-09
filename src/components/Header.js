import React from 'react';
import MobileNav from './MobileNav';
import FullNav from './FullNav';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return (
		<header>
			<Link to="/">
				<Logo />
			</Link>
			<MobileNav />
			<FullNav />
		</header>
	);
}

export default Header;