import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const PlayHeader = (props) => {
	return (
		<header className="gameHeader">
			<Logo size="small" />
			<em>The Game of Interstellar War and Profit!</em>
			<div className="exitBtn">
				<Link to="/">Exit Game</Link>
			</div>
		</header>
	)
}

export default PlayHeader;