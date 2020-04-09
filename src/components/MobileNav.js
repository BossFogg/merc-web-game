import React from 'react';
import NavList from './NavList';

class MobileNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {hideMobile: true};
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() { 
		console.log("handling the click!");
		this.setState(state => ({ hideMobile: !this.state.hideMobile }));
	}

	render() {
		let mobileNav = (!this.state.hideMobile) ? (
			<div className="mobileNav" onClick={this.handleClick}>
				<NavList />
			</div>
		) : null;

		return (
			<nav className="mainNav mobileNav">
				<i className="material-icons mobileMenu" onClick={this.handleClick}>menu</i>
				{mobileNav}
			</nav>
		);
	}
}

export default MobileNav;