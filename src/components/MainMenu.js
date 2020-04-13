import React from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Link, Redirect } from 'react-router-dom';

class MainMenu extends React.Component {

	startState = { 
		newGameModal: false, 
		optionsModal: false,
		gameName: "",
		gameUrl: "/play/table/",
		start: false,
		nameError: ""
	};
	
	constructor(props) {
		super(props);
		this.state = this.startState;
		this.openNewGameModal = this.openNewGameModal.bind(this);
		this.openOptionsModal = this.openOptionsModal.bind(this);
		this.closeModal = this.closeModal.bind(this);
		this.updateGameName = this.updateGameName.bind(this);
		this.startGame = this.startGame.bind(this);
	}

	openNewGameModal() {
		this.setState({newGameModal: true});
	}

	openOptionsModal() {
		this.setState({optionsModal: true});
	}

	closeModal() {
		this.setState(this.startState);
	}

	updateGameName(e) {
		let noSpaces = e.target.value.replace(/\s/g, "-");
		let newUrl = "/play/table/" + noSpaces.replace(/[^a-zA-Z0-9-_]/g, "");
		this.setState({gameName: e.target.value, gameUrl: newUrl});
	}

	startGame() {
		if (this.state.gameUrl === "/play/table/") this.setState({nameError: "Please enter a name for your game!"});
		else this.setState({start: true});
	}

	render() {
		if (this.state.start) return <Redirect push to={this.state.gameUrl} />;

		return (

			<Container className="max-500">

				<Card className="innerGlow mt-5">
					<Card.Body>
						<Card.Title className="text-center menuTitle">Main Menu</Card.Title>
						<hr className="menuDivider" />
						<Button onClick={this.openNewGameModal} className="my-2" block variant="primary">New Game</Button>
						<Link to="/play/tables">
							<Button className="my-2" block variant="primary">Join Game</Button>
						</Link>
						<Link to="/play/rules">
							<Button className="my-2" block variant="primary">The Rules</Button>
						</Link>
						<Button onClick={this.openOptionsModal} className="my-2" block variant="primary">Options</Button>
						<hr className="menuDivider" />
					</Card.Body>
				</Card>

				<Modal show={this.state.newGameModal} onHide={this.closeModal}>
					<Modal.Header closeButton>
						<Modal.Title>Start New Game</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<Form>
							<p>Name your game table so others can find it!</p>
							<Form.Group>
								<label>Table Name</label>
								<Form.Control type="text" placeholder="My table name" value={this.state.gameName} onChange={e => this.updateGameName(e)} />
								<Form.Text>{this.state.nameError}</Form.Text>
							</Form.Group>
						</Form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.closeModal}>Cancel</Button>
						<Button variant="primary" onClick={this.startGame}>Start</Button>
					</Modal.Footer>
				</Modal>

			</Container>
		);
	}
}

export default MainMenu;