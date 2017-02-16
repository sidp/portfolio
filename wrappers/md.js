import React, { Component, PropTypes } from 'react';
import Project from '../components/project';
import { isProject } from '../utils/page-handling';
import 'css/markdown-styles.css';
import utils from 'css/utils.module';

const MarkdownPage = (props) => {
	const page = props.route.page.data;

	if (isProject(page)) {
		return (<Project page={page} />);
	}

	return (
		<div className={`markdown ${utils['text-wrapper']}`}>
			<h1>{page.title}</h1>
			<div dangerouslySetInnerHTML={{ __html: page.body }} />
		</div>
	);
}

MarkdownPage.propTypes = {
	router: PropTypes.object,
};

export default MarkdownPage;
