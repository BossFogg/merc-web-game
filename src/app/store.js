import { createStore } from 'redux';


const initialState = {
	logo: "/logo.png",
	user: null
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