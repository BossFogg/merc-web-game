import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

class Username extends React.Component {
	
	constructor(props) {
		super(props);
		this.toggleEditState = this.toggleEditState.bind(this);
	}

	toggleEditState() {
		if (this.props.formOpen === true) this.props.toggleForm("");
		else this.props.toggleForm("username");
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
					onChange={this.props.setUsername}
					onBlur={this.props.validUsername}
					type="text" />
				<Form.Label className="mb-0">Password</Form.Label>
				<Form.Control
					className="mb-2"
					onChange={this.props.setPassword}
					onBlur={this.props.validPassword}
					type="password" />
				<p className="d-flex justify-content-end">
					<Button variant="success" onClick={this.props.changeUsername}>
						Confirm
					</Button>
					<Button variant="danger" className="ml-3" onClick={this.toggleEditState}>
						Cancel
					</Button>
				</p>
			</Col>
		);

		const nameContainer = (
			<Row className="py-2 border-top">
				{(this.props.formOpen) ? nameEdit : nameDisplay}
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

		return (this.props.loading) ? loadingContainer : nameContainer;
	}
}

export default Username;