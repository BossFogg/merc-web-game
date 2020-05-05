import React from 'react';
import Form from 'react-bootstrap/Form';

const EmailPref = (props) => {
	return (
		<Form.Group>
			<Form.Label className="text-center">Email Preferences</Form.Label>
			<Form.Check
				onChange={props.newsPrefChange}
				checked={props.user.news}
				type="checkbox" 
				label="Send me the newsletter" />
			<Form.Check
				onChange={props.updatePrefChange}
				checked={props.user.updates}
				type="checkbox" 
				label="Notify me of game updates" />
		</Form.Group>
	);
}

export default EmailPref;