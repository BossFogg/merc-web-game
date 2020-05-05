import React from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import AuthEmail from './AuthEmail';
import AuthPassword from './AuthPassword';
import Cookies from 'universal-cookie';
import { connect } from 'react-redux';
import { updateUser } from '../app/actionCreators';
import { Link } from 'react-router-dom';

class Login extends React.Component {
	
	cookies = new Cookies();

	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			formError: {
				email: "",
				password: "",
				server: ""
			},
			createCookie: false,
			loading: false
		}
		this.updateEmail = this.updateEmail.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.updatePassword = this.updatePassword.bind(this);
		this.validatePassword = this.validatePassword.bind(this);
		this.loginReady = this.loginReady.bind(this);
		this.submitLogin = this.submitLogin.bind(this);
		this.toggleCookies = this.toggleCookies.bind(this);
	}

	updateEmail(e) {
		this.setState({email: e.target.value});
		if (this.state.formError.email) this.validateEmail();
	}

	validateEmail() {
		this.setState({formError: {
			email: (this.state.email.match(/[\S]+@[\S]+\.[\S]+/)) ? "" : "Please enter a valid email.",
			password: this.state.formError.password
		}});
	}

	updatePassword(e) {
		this.setState({password: e.target.value});
		if (this.state.formError.password) this.validatePassword();
	}

	validatePassword() {
		if (this.state.password) {
			this.setState({formError: {
				email: this.state.formError.email,
				password: ""
			}});
		}
		else {
			this.setState({formError: {
				email: this.state.formError.email,
				password: "Please enter a password!"
			}});
		}
	}

	loginReady() {
		if (!this.state.email || !this.state.password || this.state.formError.email || this.state.formError.password) return false;
		else return true;
	}

	toggleCookies() { this.setState({createCookie: !this.state.createCookie}); }

	submitLogin() {
		this.setState({loading: true, formError: {email: "", password: "", server: ""}});
		let login = {
			email: this.state.email,
			password: this.state.password
		}
		axios.post("http://localhost:8000/api/v1/auth/login", {login})
			.then(res => {
				if (res.data.token) {
					if (this.state.setCookie) this.cookies.set("token", res.data.token, {path: "/"});
					sessionStorage.setItem("token", res.data.token);
					this.props.handleUserUpdate(res.data);
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
						Identify Yourself!
					</Card.Title>
					<Form>
						{(errors.length) ? formErr : ""}

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
						
						<Form.Group className="mb-3" onClick={this.toggleCookies}>
							<Form.Check
								checked={this.state.createCookie}
								readOnly
								type="checkbox" 
								label="Remember me on this computer" />
						</Form.Group>

						<Button 
							disabled={this.state.loading || !this.loginReady()} 
							onClick={this.submitLogin} 
							block 
							variant="primary">{this.state.loading ? "Loading..." : "Login!"}</Button>
					</Form>

					<p className="text-center mt-3">
						<span>New here? </span>
						<Link to="/auth/register">Create an Account!</Link>
					</p>
				</Card.Body>
			</Card>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return { handleUserUpdate: (user) => dispatch(updateUser(user)) };
}

export default connect(null, mapDispatchToProps)(Login);