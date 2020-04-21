import React from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Footer = (props) => {
	let login = <Link className="ml-3" to="/auth/login">Login/Register</Link>;
	let profile = <Link className="ml-3" to="/user/profile">My Profile</Link>;

	return (
		<footer className="w-100 py-4">
			<Container className="d-flex justify-content-between max-900">
				<div>&copy; 2020 Richard Bond</div>
				<div className="d-flex justify-content-end">
					{props.user ? profile : login}
					<Link className="ml-3" to="/about">FAQ</Link>
					<Link className="ml-3" to="/contact">Contact</Link>
				</div>
			</Container>
		</footer>
	);
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps)(Footer);