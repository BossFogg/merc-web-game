import { createStore } from 'redux';


const initialState = {
	logo: "logo.png",
	navs: [
		{
			title: "About",
			path: "/about"
		},
		{
			title: "How To Play",
			path: "/how-to-play"
		},
		{
			title: "Contact",
			path: "/contact"
		}
	]
}

export const store = createStore(mainReduce, initialState);

function mainReduce(state = initialState, action) {
	return state;
}