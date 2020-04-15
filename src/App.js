import React from 'react';
import './App.css';
import Header from './components/Header';
import Authentication from './components/Authentication';
import Home from './components/Home';
import About from './components/About';
import Play from './components/Play';
//import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';

class App extends React.Component {
	render() {
	  return (
	    <div className="App">
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
	      	<Route exact path="/about">
	      		<About />
	      	</Route>
	      	<Route path="/about">
	      		<Redirect to="/about" />
	      	</Route>
	      	<Route path="/auth">
	      		<Authentication />
	      	</Route>
	      	<Route path="/play">
	      		<Play />
	      	</Route>
	      	<Route path="/">
	      		<Redirect to="/" />
	      	</Route>
	      </Switch>
	    </div>
	  );
	}
}

// function mapStateToProps(state) {
// 	return { staticPages: state.staticPages };
// }
// 
// export default connect(mapStateToProps)(App);

export default App;
