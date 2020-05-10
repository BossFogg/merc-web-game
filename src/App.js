import React from 'react';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Authentication from './components/Authentication';
import Home from './components/Home';
import About from './components/About';
import Play from './components/Play';
import Profile from './components/Profile';
import Contact from './components/Contact';
import News from './components/News';
import Spinner from 'react-bootstrap/Spinner';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateUser } from './app/actionCreators';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
	
	cookies = new Cookies();

	constructor(props) {
		super(props);
		this.state = {
			loading: true
		}
	}
	
	componentDidMount() {
		let token = this.cookies.get("token");
		token = (token) ? token : sessionStorage.getItem("token");
		if (!token) this.setState({loading: false});
		else {
			axios.get("http://localhost:8000/api/v1/auth/session/" + token)
				.then(res => {
					console.log(res);
					if (res.data.token) this.props.handleUserUpdate(res.data);
					else {
						this.cookies.remove("token");
						sessionStorage.removeItem("token");
					}
					this.setState({loading: false});
					console.log(this.props.user);
				})
		}
	}

	render() {
	    const profile = (
	    	<>
		    	<Route exact path="/user">
					<Profile />
				</Route>
				<Route path="/user">
					<Redirect to="/user" />
				</Route>
			</>
	    );

	    const routes = (
	  	  <>
			<Switch>
				<Route path="/play"></Route>
				<Route path="/">
					<Header />
				</Route>
			</Switch>
			<Switch>
				<Route exact path="/">
					<Home />
				</Route>
				<Route path="/news">
					<News />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				<Route path="/about">
					<Redirect to="/about" />
				</Route>
				<Route path="/contact">
					<Contact />
				</Route>
				<Route path="/auth">
					<Authentication />
				</Route>
				<Route path="/play">
					<Play />
				</Route>
				{this.props.user ? profile : ""}
				<Route path="/">
					<Redirect to="/" />
				</Route>
			</Switch>
			<Switch>
				<Route path="/play"></Route>
				<Route path="/">
					<Footer />
				</Route>
			</Switch>
		  </>
	    );

	    const load = (
	    	<Spinner className="fixedSpinner" animation="border" role="status">
	    		<span className="sr-only">Loading...</span>
	    	</Spinner>
	    );

		return (
			<div className="App">
				{this.state.loading ? load : routes}
			</div>
		);
	}
}

const mapDispatchToProps = dispatch => {
	return { handleUserUpdate: (user) => dispatch(updateUser(user)) };
}

const mapStateToProps = (state) => {
	return { user: state.user };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
