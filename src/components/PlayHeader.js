import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const PlayHeader = (props) => {
	return (
		<header className="gameHeader">
			<Logo size="small" />
			<div className="exitBtn">
				<Link to="/">Exit Game</Link>
			</div>
		</header>
	)
}

export default PlayHeader;