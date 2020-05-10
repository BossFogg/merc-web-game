import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

class Password extends React.Component {

	constructor(props) {
		super(props);
		this.toggleEditState = this.toggleEditState.bind(this);
	}

	toggleEditState() {
		if (this.props.formOpen === true) this.props.toggleForm("");
		else this.props.toggleForm("password");
	}

	render() {
		let errors = [];
		for (let err in this.props.formError) {
			if (this.props.formError[err]) {
				errors.push(this.props.formError[err]);
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
					value={this.props.oldPass}
					onChange={this.props.oldPassInput}
					onBlur={this.props.validOldPass}
					type="password" />
				<Form.Label className="mb-0">New Password</Form.Label>
				<Form.Control
					className="mb-2" 
					value={this.props.newPass}
					onChange={this.props.newPassInput}
					onBlur={this.props.validNewPass}
					type="password" />
				<Form.Label className="mb-0">Confirm New Password</Form.Label>
				<Form.Control
					className="mb-2"
					value={this.props.confirmPass}
					onChange={this.props.confirmPassInput}
					onBlur={this.props.validConfirmPass}
					type="password" />
				<p className="d-flex justify-content-end">
					<Button variant="success" onClick={this.props.changePassword}>
						Confirm
					</Button>
					<Button variant="danger" className="ml-3" onClick={this.toggleEditState}>
						Cancel
					</Button>
				</p>
			</Col>
		);

		const passContainer = (
			<Row className="py-2 border-top">
				{(this.props.formOpen) ? passEdit : passDisplay}
			</Row>
		);

		const loadingContainer = (
			<Row className="justify-content-center border-top py-2">
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