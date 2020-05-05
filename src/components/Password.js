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
		oldPass: "",
		newPass: "",
		confirmPass: "",
		formError: {
			oldPass: "",
			newPassValid: "",
			confirmPassValid: ""
		}
	};

	constructor(props) {
		super(props);
		this.state = this.startState;

		this.toggleEditState = this.toggleEditState.bind(this);
		this.setOldPass = this.setOldPass.bind(this);
		this.setNewPass = this.setNewPass.bind(this);
		this.setConfirmPass = this.setConfirmPass.bind(this);
		this.validOldPass = this.validOldPass.bind(this);
		this.validNewPass = this.validNewPass.bind(this);
		this.validConfirmPass = this.validConfirmPass.bind(this);
		this.submitPasswordChange = this.submitPasswordChange.bind(this);
	}

	toggleEditState() {
		if (!this.state.editing) this.setState({editing: true});
		else this.setState(this.startState);
	}

	setOldPass(e) {
		this.setState({oldPass: e.target.value});
		console.log(this.state.oldPass);
	}

	setNewPass(e) {
		this.setState({newPass: e.target.value});
		console.log(this.state.newPass);
	}

	setConfirmPass(e) {
		this.setState({confirmPass: e.target.value});
		console.log(this.state.confirmPass);
	}

	validOldPass() {
		if (!this.state.oldPass) this.setState({
			formError: {
				oldPass: "Please enter your current password",
				newPass: this.state.formError.newPass,
				confirmPass: this.state.formError.confirmPass
			}
		});
		else this.setState({
			formError: {
				oldPass: "",
				newPass: this.state.formError.newPass,
				confirmPass: this.state.formError.confirmPass
			}
		});
	}

	validNewPass() {
		if (!this.state.newPass) this.setState({
			formError: {
				oldPass: this.state.formError.oldPass,
				newPass: "Please enter a new password",
				confirmPass: this.state.formError.confirmPass
			}
		});
		else this.setState({
			formError: {
				oldPass: this.state.formError.oldPass,
				newPass: "",
				confirmPass: this.state.formError.confirmPass
			}
		});
		if (this.state.confirmPass) this.validConfirmPass();
		else this.setState({
			formError: {
				oldPass: this.state.formError.oldPass,
				newPass: this.state.formError.newPass,
				confirmPass: ""
			}
		});
	}

	validConfirmPass() {
		if (this.state.confirmPass !== this.state.newPass) this.setState({
			formError: {
				oldPass: this.state.formError.oldPass,
				newPass: this.state.formError.newPass,
				confirmPass: "Passwords do not match"
			}
		});
		else this.setState({
			formError: {
				oldPass: this.state.formError.oldPass,
				newPass: this.state.formError.newPass,
				confirmPass: ""
			}
		});
	}

	submitPasswordChange() {
		if (!this.state.oldPass || !this.state.newPass || this.state.newPass !== this.state.confirmPass) return;
		else this.props.passwordChange({
			oldPass: this.state.oldPass,
			newPass: this.state.newPass
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
		
		const passDisplay = (
			<>
				<Col className="profile-text">&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;</Col>
				<Col className="col-auto">
					<Button variant="primary" onClick={this.toggleEditState}>Change Password</Button>
				</Col>
			</>
		);

		const passEdit = (
			<Col>
				{(errors.length) ? formErr : ""}
				<Form.Label className="mb-0">Current Password</Form.Label>
				<Form.Control
					className="mb-2" 
					onChange={this.setOldPass}
					onBlur={this.validOldPass}
					type="password" />
				<Form.Label className="mb-0">New Password</Form.Label>
				<Form.Control
					className="mb-2" 
					onChange={this.setNewPass}
					onBlur={this.validNewPass}
					type="password" />
				<Form.Label className="mb-0">Confirm New Password</Form.Label>
				<Form.Control
					className="mb-2" 
					onChange={this.setConfirmPass}
					onBlur={this.validConfirmPass}
					type="password" />
				<p className="d-flex justify-content-end">
					<Button variant="success" onClick={this.submitPasswordChange}>
						Confirm
					</Button>
					<Button variant="danger" className="ml-3" onClick={this.toggleEditState}>
						Cancel
					</Button>
				</p>
			</Col>
		);

		const passContainer = (
			<Row className="py-2 border-bottom">
				{(this.state.editing) ? passEdit : passDisplay}
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

		return (this.props.loading) ? loadingContainer : passContainer;
	}
}

export default Password;