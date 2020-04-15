import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

class Register extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
			formError: "",
			passwordOk: null,
			emailOk: null
		};
		this.submitRegistration = this.submitRegistration.bind(this);
		this.updateUserName = this.updateUserName.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
	}

	updateUserName(e) {
		this.setState({userName: e.target.value});
	}

	updateEmail(e) {
		this.setState({email: e.target.value});
	}

	updatePassword(e) {
		this.setState({password: e.target.value});
	}

	updateConfirmPassword(e) {
		this.setState({confirmPassword: e.target.value});
	}

	validatePassword(e) {
		if (this.state.password === this.state.confirmPassword) this.setState({passwordOk: true});
		else this.setState({formError: "Passwords do not Match!", passwordOk: false});
	}

	submitRegistration() {
		console.log(this.state);
	}

	render() {
		let formErr = <Alert className="py-2" variant="danger">{this.state.formError}</Alert>;
		let passConfirmClass = (this.state.passwordOk === false) ? "mb-3 border-danger" : "mb-3";
		return (
			<Card className="mt-3">
				<Card.Body>
					<Card.Title className="text-center">
						New Here? Let's get you set up!
					</Card.Title>
					<Form>
						{(this.state.formError) ? formErr : ""}
						<Form.Label className="mb-0">User Name </Form.Label>
						<Form.Control 
							onChange={this.updateUserName} 
							className="mb-3" 
							value={this.state.userName} 
							placeholder="Jim Holden" />
						<Form.Label className="mb-0">Your Email</Form.Label>
						<Form.Control 
							onChange={this.updateEmail}
							value={this.state.email}
							className="mb-3" 
							type="email" 
							placeholder="thedon@rocinante.net" />
						<Form.Label className="mb-0">Password</Form.Label>
						<Form.Control 
							onChange={this.updatePassword}
							value={this.state.password}
							className="mb-3" 
							type="password" />
						<Form.Label className="mb-0">Confirm Password</Form.Label>
						<Form.Control 
							onChange={this.updateConfirmPassword}
							value={this.state.confirmPassword}
							onBlur={this.validatePassword}
							className={passConfirmClass} 
							type="password" />
					</Form>
					<Button onClick={this.submitRegistration} block variant="primary">Register!</Button>
				</Card.Body>
			</Card>
		);
	}
}

export default Register;