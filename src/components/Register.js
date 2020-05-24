import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import AuthEmail from './AuthEmail';
import AuthPassword from './AuthPassword';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { updateUser } from '../app/actionCreators';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Register extends React.Component {

	cookies = new Cookies();

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
		if (!this.state.userName || !this.state.email || !this.state.confirmPassword) return false;
		else if (this.state.formError.username || this.state.formError.email || this.state.formError.password) return false;
		else return true;
	}

	submitRegistration() {
		this.setState({loading: true, formError: {email: "", password: "", username: "", server: ""}});
		let newUser = {
			username: this.state.userName,
			email: this.state.email,
			password: this.state.password
		}
		axios.post("https://interstellarmerc.com/api/v1/user/new", {newUser})
			.then(res => {
				if (res.data.token) {
					this.props.handleUserUpdate(res.data);
					this.cookies.set("token", res.data.token, {path: "/"});
				}
				else {
					this.setState({
						formError: {
							server: (res.data.error) ? res.data.error : "Unknown Error!",
							username: "",
							email: "",
							password: ""
						},
						loading: false
					});
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

						<AuthEmail
							emailValue={this.state.email}
							updateEmail={this.updateEmail}
							validateEmail={this.validateEmail}
							emailError={this.state.formError.email} />

						<AuthPassword
							passwordValue={this.state.password}
							updatePassword={this.updatePassword}
							validatePassword={this.validatePassword}
							passwordError={this.state.formError.password} />

						<Form.Label className="mb-0">Confirm Password</Form.Label>
						<Form.Control
							onChange={this.updateConfirmPassword}
							value={this.state.confirmPassword}
							onBlur={this.validatePassword}
							className={(this.state.formError.password) ? "mb-3 border-danger" : "mb-3"}
							type="password" />

						<Form.Text className="mb-2 text-center">
							By filling out and submitting this form you confirm that you have
							read and understand our Privacy Policy and Terms of Use.
						</Form.Text>

						<Button
							disabled={this.state.loading || !this.registrationReady()}
							onClick={this.submitRegistration}
							block
							variant="primary">{this.state.loading ? "Loading..." : "Register!"}
						</Button>

					</Form>


					<p className="text-center mt-3">
						<span>Already have an account? </span>
						<Link to="/auth/login">Sign In!</Link>
					</p>
				</Card.Body>
			</Card>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return { handleUserUpdate: (user) => dispatch(updateUser(user)) };
}

export default connect(null, mapDispatchToProps)(Register);
