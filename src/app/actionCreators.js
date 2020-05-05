import Cookies from 'universal-cookie';

// Send current user data with session token to store on login or registration
export const updateUser = (user) => {
	return {
		type: "UPDATE_USER",
		user: user
	}
}

// Logout current user and remove associated cookie
export const logoutUser = () => {
	let cookies = new Cookies();
	cookies.remove("token");
	sessionStorage.removeItem("token");
	return { type: "LOGOUT" };
}