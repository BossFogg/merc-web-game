import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';

const Footer = (props) => {
	return (
		<footer className="w-100 py-4">
			<Container className="d-flex justify-content-between max-900">
				<div>&copy; 2020 Interstellar Merc</div>
				<div className="d-flex flex-column flex-sm-row justify-content-end text-right">
					<Link className="ml-3" to="/news">News</Link>
					<Link className="ml-3" to="/about">FAQ</Link>
					<Link className="ml-3" to="/contact">Contact</Link>
					<Link className="ml-3" to="/legal/privacy">Privacy Policy</Link>
				</div>
			</Container>
		</footer>
	);
}

export default Footer;