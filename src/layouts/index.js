import React, { Component } from 'react';
import Helmet from 'react-helmet';

import { siteMetadata } from '../../gatsby-config';
import Header from '../components/header';
import Footer from '../components/footer';

import '../styles/global';
import '../styles/markdown-styles.css';
import { Container } from '../styles/components';

export default class Layout extends Component {
	render() {
		return (
			<div>
				<Helmet titleTemplate={`%s - ${siteMetadata.title}`}>
					<title>{siteMetadata.title}</title>
				</Helmet>
				<Header
					currentPath={this.props.location && this.props.location.pathname}
				/>
				<Container>{this.props.children()}</Container>
				<Footer />
			</div>
		);
	}
}
