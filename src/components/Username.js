import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

class Password extends React.Component {
	
	startState = { 
		editing: false,
		username: "",
		password: "",
		formError: {
			username: "",
			password: ""
		}
	};

	constructor(props) {
		super(props);
		this.state = this.startState;
		this.state.username = this.props.username;

		this.toggleEditState = this.toggleEditState.bind(this);
		this.setUsername = this.setUsername.bind(this);
		this.setPassword = this.setPassword.bind(this);
		this.validUsername = this.validUsername.bind(this);
		this.validPassword = this.validPassword.bind(this);
		this.submitNameChange = this.submitNameChange.bind(this);
	}

	toggleEditState() {
		if (!this.state.editing) this.setState({editing: true});
		else {
			this.setState(this.startState);
			this.setState({username: this.props.username});
		}
	}

	setUsername(e) {
		this.setState({username: e.target.value});
		console.log(this.state.username);
	}

	setPassword(e) {
		this.setState({password: e.target.value});
		console.log(this.state.password);
	}

	validUsername() {
		if (!this.state.username) this.setState({
			formError: {
				username: "Username cannot be blank!",
				password: this.state.formError.password
			}
		});
		else this.setState({
			formError: {
				username: "",
				password: this.state.formError.password
			}
		});
	}

	validPassword() {
		if (!this.state.password) this.setState({
			formError: {
				username: this.state.formError.username,
				password: "Please enter your password"
			}
		});
		else this.setState({
			formError: {
				username: this.state.formError.username,
				password: ""
			}
		});
	}

	submitNameChange() {
		if (!this.state.username || !this.state.password) console.log("something is missing!");
		else this.props.usernameChange({
			username: this.state.username,
			password: this.state.password
		});
	}

	render() {
		let errors = [];
		for (let err in this.state.formError) {
			if (this.state.formError[err]) {
				errors.push(this.state.formError[err]);
			}
		}

		let formErr = (
			<Alert className="py-2" variant="danger">
				{errors.map((err, i) => {
					if (i === 0) return <span key={i}>{err}</span>;
					else return <span key={i}><br />{err}</span>;
				})}
			</Alert>
		);
		
		const nameDisplay = (
			<>
				<Col className="profile-text">{this.props.username}</Col>
				<Col className="col-auto">
					<Button variant="primary" onClick={this.toggleEditState}>Change Name</Button>
				</Col>
			</>
		);

		const nameEdit = (
			<Col>
				{(errors.length) ? formErr : ""}
				<Form.Label className="mb-0">New Username</Form.Label>
				<Form.Control
					className="mb-2"
					defaultValue={this.props.username}
					onChange={this.setUsername}
					onBlur={this.validUsername}
					type="text" />
				<Form.Label className="mb-0">Password</Form.Label>
				<Form.Control
					className="mb-2" 
					onChange={this.setPassword}
					onBlur={this.validPassword}
					type="password" />
				<p className="d-flex justify-content-end">
					<Button variant="success" onClick={this.submitNameChange}>
						Confirm
					</Button>
					<Button variant="danger" className="ml-3" onClick={this.toggleEditState}>
						Cancel
					</Button>
				</p>
			</Col>
		);

		const nameContainer = (
			<Row className="py-2 border-top border-bottom">
				{(this.state.editing) ? nameEdit : nameDisplay}
			</Row>
		);

		const loadingContainer = (
			<Row className="justify-content-center border-top border-bottom py-2">
				<Col className="col-auto">
					<Spinner animation="border" role="status">
						<span className="sr-only">Loading...</span>
					</Spinner>
				</Col>
			</Row>
		);

		return (this.props.loading) ? loadingContainer : nameContainer;
	}
}

export default Password;