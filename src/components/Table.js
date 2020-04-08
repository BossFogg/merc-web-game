import React from 'react';
import { useParams } from 'react-router-dom';

const Table = (props) => {
	let { tableId } = useParams();

	return <p>You have joined table {tableId}</p>
}

export default Table;