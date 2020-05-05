import React from 'react';
import EmailPref from './EmailPref';
import Username from './Username';
import Password from './Password';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { updateUser } from '../app/actionCreators';
import { connect } from 'react-redux';

class Profile extends React.Component {
	constructor(props)  {
		super(props);
		this.state = {
			usernameLoading: false,
			passwordLoading: false,
			emailPrefLoading: false
		};

		this.toggleNewsPref = this.toggleNewsPref.bind(this);
		this.toggleUpdatePref = this.toggleUpdatePref.bind(this);
		this.changeUsername = this.changeUsername.bind(this);
		this.changePassword = this.changePassword.bind(this);
	}

	changeUsername(passObj) {
		// send new username with credentials to server
		// on response, update user in store
		console.log(passObj);
	}

	changePassword(passObj) {
		// send new password with current credentials to server
		// on response, update user in store
		console.log(passObj);
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

	render() {
		return (
			<Container className="mb-5 max-500">
				<Card className="mt-3">
					<Card.Body>
						<Card.Title className="text-center">
							Your Profile
						</Card.Title>
						<Form>
							<Username 
								username={this.props.user.username}
								usernameChange={this.changeUsername}
								loading={this.state.usernameLoading} />
							<Password
								passwordChange={this.changePassword}
								loading={this.state.passwordLoading} />
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