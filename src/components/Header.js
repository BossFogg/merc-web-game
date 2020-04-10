import React from 'react';
import Logo from './Logo';
import Container from 'react-bootstrap/Container';
import NavBar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';
import { Link, NavLink } from 'react-router-dom';

const Header = (props) => {
	return (
		<NavBar variant="dark" expand="sm">
			<Container>
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
						<Nav.Item>
							<NavLink activeClassName="activeNavLink" to="/play">Play!</NavLink>
						</Nav.Item>
						<Nav.Item>
							<NavLink activeClassName="activeNavLink" to="/login">Login/Register</NavLink>
						</Nav.Item>
					</Nav>
				</NavBar.Collapse>
			</Container>
		</NavBar>
	);
}

export default Header;