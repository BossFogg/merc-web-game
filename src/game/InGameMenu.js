import React from 'react';
import { Link } from 'react-router-dom';

class InGameMenu extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			menuVis: false
		};
		this.toggleMenuVis = this.toggleMenuVis.bind(this);
	}

	toggleMenuVis() {
		this.setState({menuVis: !this.state.menuVis});
	}

	hideMenu() {
		this.setState({menuVis: false});
	}

	render() {
		let dropdown = (
			<ul>
				<li className="px-2">
					<Link to="/play">Main Menu</Link>
				</li>
				<li className="px-2">
					<Link to="/">Exit Game</Link>
				</li>
			</ul>
		);

		return (
			<div className={this.state.menuVis ? "menuBtn active" : "menuBtn"}>
				<p onClick={this.toggleMenuVis} className="m-0 px-2">
					<i className="material-icons text-top">settings</i>
				</p>
				{this.state.menuVis ? dropdown : ""}
			</div>
		);
	}
}

export default InGameMenu;