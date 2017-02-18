import React, { PropTypes } from 'react';
import { projectProps } from '../prop-types';
import utils from '../../css/utils.module.css';
import styles from './project.module.css';

const Project = props => {
	let link;

	if (props.page.link) {
		link = (
			<p>
				<a
					href={props.page.link}
					className={styles['visit-link']}
					target="_blank"
					rel="noopener"
				>
					Check it out
				</a>
			</p>
		);
	}

	return (
		<div className={styles['project']}>
			<div className={`markdown ${utils['text-wrapper']} ${styles['description']}`}>
				<h1 className={styles['title']}>{props.page.title}</h1>
				<Meta
					client={props.page.client}
					year={props.page.year}
					link={props.page.link}
				/>
				<div dangerouslySetInnerHTML={{ __html: props.page.body }} />
				{link}
			</div>
			(pictures)
		</div>
	);
};

Project.propTypes = {
	page: projectProps.isRequired,
};

export default Project;


const Meta = (props) => {
	const items = [];

	if (props.client) {
		items.push(<MetaItem label="Client" value={props.client} />);
	}

	if (props.year) {
		items.push(<MetaItem label="Year" value={props.year} />);
	}

	if (props.link) {
		const value = props.link.replace(/^https?\:\/\/(www\.)?([^\/]+).*$/, '$2');
		items.push(<MetaItem label="Link" value={value} link={props.link} />);
	}

	return <div className={styles['meta']}>{items}</div>;
};

Meta.propTypes = {
	client: PropTypes.string,
	year: PropTypes.string,
};

Meta.defaultProps = {
	client: '',
	year: '',
};

const MetaItem = (props) => {
	let value;

	if (props.link) {
		value = (
			<a
				href={props.link}
				className={styles['meta-value']}
				target="_blank"
				rel="noopener"
			>
				{props.value}
			</a>
		);
	} else {
		value = (
			<span className={styles['meta-value']}>
				{props.value}
			</span>
		);
	}

	return (
		<span className={styles['meta-item']}>
			<span className={styles['meta-label']}>{props.label}:</span>
			{' '}
			{value}
		</span>
	);
};