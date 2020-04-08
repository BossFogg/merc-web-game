import React from 'react';
import { Link } from 'react-router-dom';

const NavList = (props) => {
	return (
		<nav>
			<ul>
				<li><Link to="/">Home</Link></li>
				<li><Link to="/about">About</Link></li>
				<li><Link to="/play">Play!</Link></li>
				<li><Link to="/login">Login/Register</Link></li>
			</ul>
		</nav>
	);
}

export default NavList;