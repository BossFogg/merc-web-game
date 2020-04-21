import React from 'react';
import Logo from './Logo';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import ProfileLink from './ProfileLink';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../app/actionCreators';

const Header = (props) => {
	let login = <NavLink activeClassName="activeNavLink" to="/auth">Login/Register</NavLink>;
	let profile = <ProfileLink logoutUser={props.logoutUser} user={props.user} />;
	let play = (
		<Nav.Item>
			<NavLink activeClassName="activeNavLink" to="/play">Play!</NavLink>
		</Nav.Item>
	);

	return (
		<NavBar fixed="top" className="px-0" variant="dark" expand="sm">
			<Container className="max-900">
				<NavBar.Brand>
					<Link to="/">
						<Logo size="small" />
					</Link>
				</NavBar.Brand>
				<NavBar.Toggle aria-controls="basic-navbar-nav" />
				<NavBar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Item>
							<NavLink exact activeClassName="activeNavLink" to="/">Home</NavLink>
						</Nav.Item>
						<Nav.Item>
							<NavLink activeClassName="activeNavLink" to="/about">About</NavLink>
						</Nav.Item>
						{(props.user && props.user.gameAccess) ? play : ""}
						<Nav.Item className="position-relative">
							{props.user ? profile : login}
						</Nav.Item>
					</Nav>
				</NavBar.Collapse>
			</Container>
		</NavBar>
	);
}

function mapStateToProps(state) {
	return { user: state.user };
}

const mapDispatchToProps = dispatch => {
	return { logoutUser: () => dispatch(logoutUser()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);