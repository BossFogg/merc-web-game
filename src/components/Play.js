import React from 'react';
import '../styles/Play.css'
import PlayHeader from '../game/PlayHeader';
import TableList from '../game/TableList';
import Table from '../game/Table';
import MainMenu from '../game/MainMenu';
import Rules from '../game/Rules';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Play = (props) => {
	let loginRedirect = <Redirect to="/auth/login" />;
	
	return (
		<>
			{!props.user ? loginRedirect : <PlayHeader />}
			<div className="playSpace">
				<Switch>
					<Route exact path="/play">
						<MainMenu />
					</Route>
					<Route path="/play/tables">
						<TableList />
					</Route>
					<Route path="/play/table/:tableId">
						<Table />
					</Route>
					<Route path="/play/rules">
						<Rules />
					</Route>
					<Route path="/play/*">
						<Redirect to="/play" />
					</Route>
				</Switch>
			</div>
		</>
	);
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps)(Play);