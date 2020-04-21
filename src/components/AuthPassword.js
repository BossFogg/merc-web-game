import React from 'react';
import Form from 'react-bootstrap/Form';

const AuthPassword = (props) => {
	return (
		<>
			<Form.Label className="mb-0">Your Password</Form.Label>
			<Form.Control 
				onChange={props.updatePassword}
				value={props.passwordValue}
				onBlur={props.validatePassword}
				className={(props.passwordError) ? "mb-3 border-danger" : "mb-3"}
				type="password" />
		</>
	);
}

export default AuthPassword;