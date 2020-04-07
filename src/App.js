import React from 'react';
import './App.css';
import Header from './components/Header';
import { connect } from 'react-redux';

class App extends React.Component {
	render() {
	  return (
	    <div className="App">
	      <Header logo={this.props.logo} navs={this.props.navs} />
	    </div>
	  );
	}
}

function mapStateToProps(state) {
	return {
		logo: state.logo,
		navs: state.navs
	};
}

export default connect(mapStateToProps)(App);
