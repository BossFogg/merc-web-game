import React from 'react';
import EmailPref from './EmailPref';
import Username from './Username';
import Password from './Password';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { updateUser } from '../app/actionCreators';
import { connect } from 'react-redux';

class Profile extends React.Component {
	startState = {
		usernameLoading: false,
		passwordLoading: false,
		emailPrefLoading: false,
		openForm: "",
		oldPass: "",
		newPass: "",
		confirmPass: "",
		newName: "",
		formError: {
			oldPass: "",
			newPass: "",
			confirmPass: "",
			newName: ""
		},
		formSuccess: ""
	};

	constructor(props)  {
		super(props);
		this.state = Object.assign({}, this.startState, {
			news: this.props.user.newsletter,
			update: this.props.user.updates
		});

		this.updateEmailPrefs = this.updateEmailPrefs.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.toggleEditingState = this.toggleEditingState.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.setOldPass = this.setOldPass.bind(this);
		this.setNewPass = this.setNewPass.bind(this);
		this.setConfirmPass = this.setConfirmPass.bind(this);
		this.setNewName = this.setNewName.bind(this);
		this.validOldPass = this.validOldPass.bind(this);
		this.validNewPass = this.validNewPass.bind(this);
		this.validConfirmPass = this.validConfirmPass.bind(this);
		this.validNewName = this.validNewName.bind(this);
		this.setNewsletterPref = this.setNewsletterPref.bind(this);
		this.setUpdatesPref = this.setUpdatesPref.bind(this);
	}

	componentDidRender() {
		console.log(this.props.user);
	}

	setOldPass(e) {
		this.setState({oldPass: e.target.value});
	}

	setNewPass(e) {
		this.setState({newPass: e.target.value});
	}

	setConfirmPass(e) {
		this.setState({confirmPass: e.target.value});
	}

	setNewName(e) {
		this.setState({newName: e.target.value});
	}

	setNewsletterPref(e) {
		this.setState({news: e.target.checked});
	}

	setUpdatesPref(e) {
		this.setState({update: e.target.checked});
	}

	resetFormValues() { 
		this.setState(this.startState);
		this.setState({
			news: this.props.user.newsletter,
			update: this.props.user.updates
		});
	}

	toggleEditingState(editing) {
		this.resetFormValues();
		this.setState({openForm: editing});
	}

	changeUsername() {
		if (!this.state.oldPass || !this.state.newName) return;
		else {
			this.setState({usernameLoading: true});
			let data = {
				oldPass: this.state.oldPass,
				newName: this.state.newName
			}
			// send new username with current credentials to server
			axios.post("https://interstellarmerc.com/api/v1/user/name", data, {
				headers: {
					'Authorization': `Bearer ${this.props.user.token}`}})
				.then(res => {
					if (res.data.error) this.setState({
						formError: {serverError: res.data.error},
						usernameLoading: false
					});
					else {
						this.props.handleUserUpdate(Object.assign({}, this.props.user, {username: this.state.newName}));
						this.resetFormValues();
						this.setState({formSuccess: "Username Update Successful"});
					}
				})
		}
	}

	changePassword() {
		if (!this.state.oldPass || !this.state.newPass || this.state.newPass !== this.state.confirmPass) return;
		else {
			this.setState({passwordLoading: true});
			let data = {
				oldPass: this.state.oldPass,
				newPass: this.state.newPass
			}
			// send new password with current credentials to server
			axios.post("https://interstellarmerc.com/api/v1/auth/password/change", data, {
				headers: {
					'Authorization': `Bearer ${this.props.user.token}`}})
				.then(res => {
					if (res.data.error) this.setState({
						formError: {serverError: res.data.error},
						passwordLoading: false
					});
					else {
						this.resetFormValues();
						this.setState({formSuccess: "Password Update Successful"});
					}
				})
		}
	}

	updateEmailPrefs() {
		let prefs = { newsletter: this.state.news, updates: this.state.update};
		this.setState({emailPrefLoading: true});
		axios.post("https://interstellarmerc.com/api/v1/user/email", prefs, {
			headers: {
				'Authorization': `Bearer ${this.props.user.token}`}})
			.then(res => {
				if (res.data.error) this.setState({
					formError: {serverError: res.data.error},
					emailPrefLoading: false
				});
				else {
					this.props.handleUserUpdate(Object.assign({}, this.props.user, prefs));
					this.resetFormValues();
					this.setState({formSuccess: "Preferences Updated Successfully"});
				}
			})
	}

	validNewName() {
		if (!this.state.newName) this.setState({
			formError: Object.assign({}, this.state.formError, {newName: "Username Cannot be Blank"})
		});
		else this.setState({
			formError: Object.assign({}, this.state.formError, {newName: ""})
		});
	}

	validOldPass() {
		if (!this.state.oldPass) this.setState({
			formError: Object.assign({}, this.state.formError, {oldPass: "Please Enter Your Current Password"})
		});
		else this.setState({
			formError: Object.assign({}, this.state.formError, {oldPass: ""})
		});
	}

	validNewPass() {
		if (!this.state.newPass) this.setState({
			formError: Object.assign({}, this.state.formError, {newPass: "Please Enter a New Password"})
		});
		else this.setState({
			formError: Object.assign({}, this.state.formError, {newPass: ""})
		});
		if (this.state.confirmPass) this.validConfirmPass();
		else this.setState({
			formError: Object.assign({}, this.state.formError, {confirmPass: ""})
		});
	}

	validConfirmPass() {
		if (this.state.confirmPass !== this.state.newPass) this.setState({
			formError: Object.assign({}, this.state.formError, {confirmPass: "Passwords Do Not Match"})
		});
		else this.setState({
			formError: Object.assign({}, this.state.formError, {confirmPass: ""})
		});
	}

	render() {
		let success = (this.state.formSuccess) ? <Alert variant="success">{this.state.formSuccess}</Alert> : "";

		return (
			<Container className="mb-5 max-500">
				<Card className="mt-3">
					<Card.Body>
						<h2 className="text-center mb-3">
							Account Settings
						</h2>
						{success}
						<Form>
							<Username 
								username={this.props.user.username}
								changeUsername={this.changeUsername}
								toggleForm={this.toggleEditingState}
								formOpen={this.state.openForm === "username" ? true : false}
								loading={this.state.usernameLoading}
								formError={this.state.formError}
								setUsername={this.setNewName}
								validUsername={this.validNewName}
								setPassword={this.setOldPass}
								validPassword={this.validOldPass} />
							<Password
								formError={this.state.formError}
								changePassword={this.changePassword}
								formOpen={this.state.openForm === "password" ? true : false}
								toggleForm={this.toggleEditingState}
								loading={this.state.passwordLoading}
								oldPass={this.state.oldPass}
								oldPassInput={this.setOldPass}
								validOldPass={this.validOldPass}
								newPass={this.state.newPass}
								newPassInput={this.setNewPass}
								validNewPass={this.validNewPass}
								confirmPass={this.state.confirmPass}
								confirmPassInput={this.setConfirmPass}
								validConfirmPass={this.validConfirmPass} />
							<EmailPref 
								formOpen={this.state.openForm === "email" ? true : false}
								news={this.state.news}
								update={this.state.update}
								updateEmailPrefs={this.updateEmailPrefs}
								toggleForm={this.toggleEditingState}
								setNews={this.setNewsletterPref}
								setUpdate={this.setUpdatesPref} />
						</Form>
					</Card.Body>
				</Card>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
	return {user: state.user};
}

const mapDispatchToProps = (dispatch) => {
	return { handleUserUpdate: (user) => { dispatch(updateUser(user)); } };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);