import React from 'react';
import './App.css';
import Header from './components/Header';
import Login from './components/Login';
import Home from './components/Home';
import About from './components/About';
import Play from './components/Play';
//import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

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
	      	<Route path="/play">
	      		<Play />
	      	</Route>
	      	<Route path="/about">
	      		<About />
	      	</Route>
	      	<Route path="/login">
	      		<Login />
	      	</Route>
	      	<Route path="/">
	      		<Home />
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
