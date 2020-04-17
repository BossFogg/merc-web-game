import React from 'react';

class ProfileLink extends React.Component {
	constructor(props) {
		super(props);
		this.state = { listVis: false };
		this.showList = this.showList.bind(this);
		this.hideList = this.hideList.bind(this);
	}

	showList() {
		this.setState({ listVis: true });
	}

	hideList() {
		this.setState({ listVis: false });
	}

	render() {
		let userMenu = (
			<ul className="userMenu" onMouseLeave={this.hideList}>
				<li>
					<i className="material-icons i-correct">person</i>
					{this.props.user.username}
				</li>
				<li>Profile</li>
				<li onClick={this.props.logoutUser}>Logout</li>
			</ul>
		);

		return (
			<>
				<a className={this.state.listVis ? "activeNavLink roundTop" : ""} onMouseEnter={this.showList}>
					<i className="material-icons i-correct">person</i>
					{this.props.user.username}
				</a>
				{this.state.listVis ? userMenu : ""}
			</>
		);
	}
}

export default ProfileLink;