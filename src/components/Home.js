import React from 'react';
import Container from 'react-bootstrap/Container';

const Home = (props) => {
	return (
		<Container className="mb-5">
			<h2>Welcome Spacefarer!</h2>
			<p>This site is host to Merc!<sup>TM</sup> the galaxy's finest space profiteering adventure game. Herein you shall find interstellar war, fascinating artifacts, dubious allies, and (of course) profit!</p>
			<p>Merc!<sup>TM</sup> has the soul of a tabletop gaming experience, wrapped up in a sleek multi-player game that can be enjoyed from the comfort of your favorite web browser. So invite your friends (or enemies!) and prepare to destroy them for fun and profit!</p>
		</Container>
	);
}

export default Home;