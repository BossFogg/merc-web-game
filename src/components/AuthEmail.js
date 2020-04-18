import React from 'react';
import Form from 'react-bootstrap/Form';

const AuthEmail = (props) => {
	return (
		<>
			<Form.Label className="mb-0">Your Email</Form.Label>
			<Form.Control 
				onChange={props.updateEmail}
				value={props.emailValue}
				onBlur={props.validateEmail}
				className={(props.emailError) ? "mb-3 border-danger" : "mb-3"}
				type="email" 
				placeholder="thedon@rocinante.net" />
		</>
	);
}

export default AuthEmail;