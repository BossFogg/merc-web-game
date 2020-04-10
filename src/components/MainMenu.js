import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

class MainMenu extends React.Component {
	render() {
		return (
			<Container>
				<Card className="innerGlow mt-5">
					<Card.Body>
						<Card.Title className="text-center menuTitle">Main Menu</Card.Title>
						<hr className="menuDivider" />
						<Button className="my-2" block variant="primary">New Game</Button>
						<Link to="/play/tables">
							<Button className="my-2" block variant="primary">Join Game</Button>
						</Link>
						<Link to="/play/rules">
							<Button className="my-2" block variant="primary">The Rules</Button>
						</Link>
						<Button className="my-2" block variant="primary">Options</Button>
						<hr className="menuDivider" />
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

export default MainMenu;