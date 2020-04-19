import Cookies from 'universal-cookie';

// Send current user data with session token to store on login or registration
export const updateUser = (user) => {
	let cookies = new Cookies();
	cookies.remove("token");

	return {
		type: "UPDATE_USER",
		user: user
	}
}