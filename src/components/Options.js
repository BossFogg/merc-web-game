import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Options = (props) => {
	return (
		<Modal show={props.show} onHide={props.onHide}>
			<Modal.Header>Game Options</Modal.Header>
			<Modal.Body>Options go here</Modal.Body>
			<Modal.Footer>
				<Button onClick={props.onHide}>Done</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default Options