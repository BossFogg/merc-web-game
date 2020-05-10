import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

class EmailPref extends React.Component {
	constructor(props) {
		super(props);
		this.toggleEditState = this.toggleEditState.bind(this);
	}

	toggleEditState() {
		if (this.props.formOpen === true) this.props.toggleForm("");
		else this.props.toggleForm("email");
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
		
		const emailDisplay = (
			<>
				<Col className="profile-text">Email Preferences</Col>
				<Col className="col-auto">
					<Button variant="primary" onClick={this.toggleEditState}>Edit</Button>
				</Col>
			</>
		);

		const emailEdit = (
			<Col>
				{(errors.length) ? formErr : ""}
				<Form.Label className="mb-0">Email Preferences</Form.Label>
				<Form.Check
					defaultChecked={this.props.news}
					onChange={this.props.setNews}
					type="checkbox"
					label="Send me the newsletter" />
				<Form.Check
					defaultChecked={this.props.update}
					onChange={this.props.setUpdate}
					type="checkbox"
					label="Notify me of game updates" />
				<p className="d-flex justify-content-end">
					<Button variant="success" onClick={this.props.updateEmailPrefs}>
						Confirm
					</Button>
					<Button variant="danger" className="ml-3" onClick={this.toggleEditState}>
						Cancel
					</Button>
				</p>
			</Col>
		);

		const emailContainer = (
			<Row className="py-2 border-top">
				{(this.props.formOpen) ? emailEdit : emailDisplay}
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

		return (this.props.loading) ? loadingContainer : emailContainer;
	}
}

export default EmailPref;