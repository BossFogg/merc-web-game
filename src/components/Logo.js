import React from 'react';
import { connect } from 'react-redux';

const Logo = (props) => {
	let sizeClass = (props.size === "small") ? "mainLogo smallLogo" : "mainLogo";

	return (
		<img className={sizeClass} src={props.logo} alt="Merc!" />
	);
}

function mapStateToProps(state) {
	return { logo: state.logo };
}

export default connect(mapStateToProps)(Logo);