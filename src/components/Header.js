import React from 'react';
import NavList from './NavList';
import { Link } from 'react-router-dom';

const Header = (props) => {
	return (
		<header>
			<div>
				<Link to="/">
					<img src={props.logo} alt="logo" />
				</Link>
				<span>Merc!</span>
			</div>
			<nav>
				<NavList navs={props.navs} />
			</nav>
		</header>
	);
}

export default Header;