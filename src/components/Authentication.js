import React from 'react';
import Container from 'react-bootstrap/Container';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';

class Authentication extends React.Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		let homeRedirect = <Redirect push to="/" />;

		return (
			<Container className="max-500">
				{ (this.props.user) ? homeRedirect : "" }
				<Switch>
					<Route exact path="/auth/login">
						<Login />
					</Route>
					<Route exact path="/auth/register">
						<Register />
					</Route>
					<Route path="/auth/register">
						<Redirect to="/auth/register" />
					</Route>
					<Route path="/auth/">
						<Redirect to="/auth/login" />
					</Route>
				</Switch>
			</Container>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps)(Authentication);