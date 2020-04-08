import React from 'react';
import { connect } from 'react-redux';

const Logo = (props) => {
	return (
		<img src={props.logo} alt="Merc!" />
	);
}

function mapStateToProps(state) {
	return { logo: state.logo };
}

export default connect(mapStateToProps)(Logo);