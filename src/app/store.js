import { createStore } from 'redux';


const initialState = {
	logo: "/logo.png",
	user: {
		username: "Jimmy",
		email: "jimjimmyjimjim@gmail.com",
		token: "randomstuff"
	}
}

export const store = createStore(mainReduce, initialState);

function mainReduce(state = initialState, action) {
	switch (action.type) {
		case "UPDATE_USER":
			return Object.assign({}, state, { user: action.user });
		case "LOGOUT":
			return Object.assign({}, state, { user: null });
		default:
			return state;
	}
}