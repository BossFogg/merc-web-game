import React from 'react';
import { Link } from 'react-router-dom';

const NavList = (props) => {
	return (
		<ul>
			{props.navs.map(function(nav, index){
				return <li key={index}><Link to={nav.path}>{nav.title}</Link></li>
			})}
		</ul>
	)
}

export default NavList;