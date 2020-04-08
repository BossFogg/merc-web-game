import React from 'react';
import '../styles/Play.css'
import PlayHeader from './PlayHeader';
import TableList from './TableList';
import Table from './Table';
import MainMenu from './MainMenu';
import { Switch, Route, Redirect } from 'react-router-dom';

const Play = (props) => {
	return (
		<>
			<PlayHeader />
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
				<Route path="/play/*">
					<Redirect to="/play" />
				</Route>
			</Switch>
		</>
	);
}

export default Play;