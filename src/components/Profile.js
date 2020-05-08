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
		this.state = this.startState;

		this.toggleNewsPref = this.toggleNewsPref.bind(this);
		this.toggleUpdatePref = this.toggleUpdatePref.bind(this);
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

	changeUsername() {
		if (!this.state.oldPass || !this.state.newName) return;
		else {
			this.setState({usernameLoading: true});
			let data = {
				oldPass: this.state.oldPass,
				newName: this.state.newName
			}
			// send new username with current credentials to server
			axios.post("http://localhost:8000/api/v1/user/name", data, {
				headers: {
					'Authorization': `Bearer ${this.props.user.token}`}})
				.then(res => {
					console.log(res);
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
			axios.post("http://localhost:8000/api/v1/auth/password/change", data, {
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

	resetFormValues() { this.setState(this.startState) }

	toggleEditingState(editing) {
		this.resetFormValues();
		this.setState({openForm: editing});
	}

	toggleNewsPref() {
		//send update to db
		//on response, update user in store
		console.log("changing news preference");
	}

	toggleUpdatePref() {
		//send update to db
		//on response, update user in store
		console.log("changing update preference");
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
						<Card.Title className="text-center">
							Your Profile
						</Card.Title>
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
								user={this.props.user}
								newsPrefChange={this.toggleNewsPref}
								updatePrefChange={this.toggleUpdatePref} />
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