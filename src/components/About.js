import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const About = (props) => {
	return (
		<Container className="mb-5 max-900">
			<h2>What is Merc! Exactly?</h2>
			<p>
				Merc! is a web-based board game concieved by an out-of-work Web Developer while trapped 
				in his house during the fateful Spring of 2020. Originally intended as a PC game about 
				tactical space combat, the project took on a life of it's own and eventually morphed 
				into a multiplayer hybrid web/table-top game.
			</p>
			<h2>Sounds cool! How can I play?</h2>
			<p>
				Unfortunately, Merc! is still in the early stages of development and not yet ready for 
				public consumption.
			</p>
			<h2>Wait, so when will it be ready?</h2>
			<p>
				There is no exact timeline for when the game will be playable. However, if you would 
				like regular progress updates (or just to be notified when it goes live) you can 
				<Link to="/auth/register"> create an account</Link> and we will keep you informed!
			</p>
			<h2>Will it be free to play?</h2>
			<p>
				The first version of Merc! will definitely be free to play and will likely remain that 
				way. There may eventually be a paid version if the game gets popular though.
			</p>
			<h2>I have art skills. Are you looking for help?</h2>
			<p>
				Yes! If you are a concept artist or illustrator interested in creating 2D assets with a  
				Golden Age Sci-Fi asthetic, we'd love to collaborate. Send us a message using the 
				<Link to="/contact"> contact form</Link> and we will be in touch.
			</p>
			<h2>I have more questions.</h2>
			<p>
				And we have answers! Use our <Link to="/contact">contact form</Link> to send us your 
				questions, complaints, suggestions, shower thoughts, pie recipes, etc...
			</p>
		</Container>
	);
}

export default About;