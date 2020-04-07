import { createStore } from 'redux';

export const store = createStore(mainReduce, {});

function mainReduce(state = [], action) {
	return state;
}