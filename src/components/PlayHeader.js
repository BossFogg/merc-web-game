import React from 'react';
import Logo from './Logo';
import InGameMenu from './InGameMenu';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const PlayHeader = (props) => {
	return (
		<header className="gameHeader">
			<Logo size="small" />
			<em>The Game of Interstellar War and Profit!</em>
			<Switch>
				<Route exact path="/play">
					<div className="userLabel">
						<i className="material-icons text-top">person</i>
						<span>{props.user.username}</span>
					</div>
				</Route>
				<Route path="/play">
					<InGameMenu />
				</Route>
			</Switch>
		</header>
	)
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps)(PlayHeader);