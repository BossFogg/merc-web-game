import React from 'react';
import { NavLink } from 'react-router-dom';

const NavList = (props) => {
	return (
		<ul>
			<li><NavLink exact={true} activeClassName="activeNavLink" to="/">Home</NavLink></li>
			<li><NavLink activeClassName="activeNavLink" to="/about">About</NavLink></li>
			<li><NavLink activeClassName="activeNavLink" to="/play">Play!</NavLink></li>
			<li><NavLink activeClassName="activeNavLink" to="/login">Login/Register</NavLink></li>
		</ul>
	);
}

export default NavList;
