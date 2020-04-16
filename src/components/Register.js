import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';

class Register extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
			formError: {
				email: "",
				username: "",
				password: "",
				server: ""
			},
			loading: false
		};
		this.submitRegistration = this.submitRegistration.bind(this);
		this.updateUserName = this.updateUserName.bind(this);
		this.updateEmail = this.updateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.updateConfirmPassword = this.updateConfirmPassword.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validateUserName = this.validateUserName.bind(this);
	}

	updateUserName(e) {
		this.setState({userName: e.target.value});
		if (this.state.formError.username) this.validateUserName();
	}

	validateUserName() {
		this.setState({formError: {
			username: (this.state.userName) ? "" : "Please enter a valid username.",
			email: this.state.formError.email,
			password: this.state.formError.password
		}});
	}

	updateEmail(e) {
		this.setState({email: e.target.value});
		if (this.state.formError.email) this.validateEmail();
	}

	validateEmail() {
		this.setState({formError: {
			username: this.state.formError.username,
			email: (this.state.email.match(/[\S]+@[\S]+\.[\S]+/)) ? "" : "Please enter a valid email.",
			password: this.state.formError.password
		}});
	}

	updatePassword(e) {
		this.setState({password: e.target.value});
		if (this.state.formError.password) this.validatePassword();
	}

	updateConfirmPassword(e) {
		this.setState({confirmPassword: e.target.value});
		if (this.state.formError.password) this.validatePassword();
	}

	validatePassword() {
		this.setState({formError: {
			username: this.state.formError.username,
			email: this.state.formError.email,
			password: (this.state.password === this.state.confirmPassword) ? "" : "Passwords do not match."
		}});
	}

	registrationReady() {
		let formErrors = this.state.formError;
		if (!this.state.username || !this.state.email || !this.state.confirmPassword) return false;
		else if (formErrors.username || formErrors.email || formErrors.password) return false;
		else return true;
	}

	submitRegistration() {
		this.setState({loading: true, formError: ""});
		let newUser = {
			username: this.state.userName,
			email: this.state.email,
			password: this.state.password
		}
		axios.post("http://localhost:8000/api/v1/user/new", {newUser})
			.then(res => {
				if (res.data.error) {
					this.setState({
						formError: {
							server: res.data.error,
							username: "",
							email: "",
							password: ""
						},
						loading: false
					});
				}
				else {
					//add user data to global state

				}
			})
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

		return (
			<Card className="mt-3">
				<Card.Body>
					<Card.Title className="text-center">
						New Here? Let's get you set up!
					</Card.Title>
					<Form>
						{(errors.length) ? formErr : ""}

						<Form.Label className="mb-0">User Name </Form.Label>
						<Form.Control 
							onChange={this.updateUserName} 
							className={(this.state.formError.username) ? "mb-3 border-danger" : "mb-3"}
							value={this.state.userName}
							onBlur={this.validateUserName}
							placeholder="Jim Holden" />

						<Form.Label className="mb-0">Your Email</Form.Label>
						<Form.Control 
							onChange={this.updateEmail}
							value={this.state.email}
							onBlur={this.validateEmail}
							className={(this.state.formError.email) ? "mb-3 border-danger" : "mb-3"}
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
							className={(this.state.formError.password) ? "mb-3 border-danger" : "mb-3"}
							type="password" />

					</Form>
					<Button 
						disabled={this.state.loading || !this.registrationReady()} 
						onClick={this.submitRegistration} 
						block 
						variant="primary">Register!</Button>
				</Card.Body>
			</Card>
		);
	}
}

export default Register;