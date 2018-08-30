import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import BlogList from '../components/posts-list/index';
import { TextWrapper } from '../styles/components';

export default class Blog extends Component {
	render() {
		const { data } = this.props;
		const posts = data.allMarkdownRemark.edges.map(edge => edge.node);

		return (
			<>
				<Helmet>
					<title>Posts</title>
				</Helmet>
				<TextWrapper>
					<BlogList posts={posts} />
				</TextWrapper>
			</>
		);
	}
}

export const pageQuery = graphql`
	query blogPageData {
		allMarkdownRemark(
			filter: { fields: { type: { eq: "post" } } }
			sort: { order: DESC, fields: [frontmatter___published] }
		) {
			edges {
				node {
					...PostList_item
				}
			}
		}
	}
`;
