// Send current user data with session token to store on login or registration
export const updateUser = (user) => {
	return {
		type: "UPDATE_USER",
		user: user
	}
}