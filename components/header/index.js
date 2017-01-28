import React, { PropTypes } from 'react';
import { Container } from 'react-responsive-grid';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';

import { rhythm } from '../../utils/typography';

import styles from './header.module.css';

const Header = (props) => {
	let description = '';
	let socialMedia = '';

	if (!props.slim) {
		description = (
			<p>
				I’m a web designer and developer working in Stockholm, Sweden. This is a
				selection of the projects I’ve worked on in the recent years.
			</p>
		);
		socialMedia = (
			<p className={styles['social-media']}>
				<a href="http://twitter.com/sidp">Twitter</a>
				<a href="http://dribbble.com/sidp">Dribbble</a>
				<a href="http://last.fm/user/sidp">Last.fm</a>
				<a href="http://linkedin.com/profile/view?id=9864846">LinkedIn</a>
			</p>
		);
	}

	let classNames = styles['header'];

	if (props.slim) {
		classNames += ` ${styles['header-slim']}`;
	}

	return (
		<header className={classNames}>
			<Container style={{
				maxWidth: 960,
				padding: `${rhythm(props.slim ? 1/4 : 1)} ${rhythm(3/4)}`,
			}}>
				<h1 className={styles['title']}>
					<Link to={prefixLink('/')}>Peter Simonsson</Link>
				</h1>
				{description}
				{socialMedia}
			</Container>
		</header>
	);
}

Header.propTypes = {
	slim: PropTypes.bool,
}

Header.defaultProps = {
	slim: false,
}

export default Header;
