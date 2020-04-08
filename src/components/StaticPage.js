import React from 'react';

const StaticPage = (props) => {
	return <article dangerouslySetInnerHTML={props.content}></article>;
}

export default StaticPage;