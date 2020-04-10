import React from 'react';
import Container from 'react-bootstrap/Container';

const About = (props) => {
	return (
		<Container className="pt-3">
			<h2>What is Merc! Exactly?</h2>
			<p>Merc!<sup>TM</sup> is a web-based board game concieved by an out-of-work Web Developer while trapped in his house during the fateful Spring of 2020. Originally intended as a PC game about tactical space combat, the project took on a life of it's own and eventually morphed into the card-dealing, credit-collecting, space-exploring "table-top" game it is today.</p>
			<h2>How Can I Play?</h2>
			<p>If you want to try it out, you will need to register an account on this site. After that, there's nothing stopping you from clicking that "Play!" link! Just be aware, this project is still in alpha, so it won't be bug-free, and features are subject to change.</p>
		</Container>
	);
}

export default About;