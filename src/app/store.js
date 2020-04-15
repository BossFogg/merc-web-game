import { createStore } from 'redux';


const initialState = {
	logo: "/logo.png",
	user: null
}

export const store = createStore(mainReduce, initialState);

function mainReduce(state = initialState, action) {
	return state;
}