import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Home = (props) => {
	return (
		<Container className="mb-5 max-900">
			<h2>Welcome Spacefarer!</h2>
			<p>
				This site is host to Interstellar Merc!, an upcoming game that has the soul of a tabletop gaming 
				experience, wrapped up in a sleek multi-player game that can be enjoyed from the comfort of your 
				favorite web browser. Want to know more? Check out the <Link to="/about">FAQ</Link> and <Link to="/newsletter">
				sign up for our newsletter</Link> to stay aprised of the latest developments.
			</p>
		</Container>
	);
}

export default Home;