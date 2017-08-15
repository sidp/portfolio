import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Meta from '../../components/meta';
import ExternalLink from '../../components/external-link';
import ProjectImage from '../../components/project-image';
import VideoEmbed from '../../components/video-embed';
import ProjectList from '../../components/project-list';

import utils from '../../css/utils.module.css';
import styles from './project.module.css';

export default class Project extends Component {
	render() {
		const {
			data: { markdownRemark: page, allMarkdownRemark: { edges } },
		} = this.props;
		const projects = edges.map(edge => edge.node);
		const frontmatter = page.frontmatter;
		let link;

		if (frontmatter.link) {
			link = (
				<p className={styles['links']}>
					<ExternalLink to={frontmatter.link} className={styles['link']}>
						See it live
					</ExternalLink>
				</p>
			);
		}

		let videoEmbed;
		if (frontmatter.videoEmbed) {
			videoEmbed = (
				<VideoEmbed
					{...frontmatter.videoEmbed}
					className={styles['video-embed']}
				/>
			);
		}

		const meta = [];
		if (frontmatter.description) {
			meta.push(
				<meta
					name="description"
					content="frontmatter.description"
					key="description"
				/>
			);
		}

		let images = [];
		if (frontmatter.images && frontmatter.images.childrenManifestJson) {
			images = frontmatter.images.childrenManifestJson.map(manifestItem => {
				return {
					...manifestItem.image.childImageSharp.responsive,
					title: manifestItem.title,
				};
			});
		}

		return (
			<div>
				<article className={styles['project']}>
					<Helmet>
						<title>
							{frontmatter.title}
						</title>
						{meta}
					</Helmet>
					<div className={`markdown ${utils['text-wrapper']}`}>
						<header>
							<h1 className={styles['title']}>
								{frontmatter.title}
							</h1>
							<Meta
								agency={frontmatter.agency}
								client={frontmatter.client}
								year={frontmatter.year}
								link={frontmatter.link}
							/>
						</header>
						<div dangerouslySetInnerHTML={{ __html: page.html }} />
						{link}
						{videoEmbed}
					</div>
					<div className={styles['images']}>
						{images &&
							images.map(image =>
								<ProjectImage
									image={image}
									className={styles['image']}
									key={image.src}
								/>
							)}
					</div>
				</article>
				<ProjectList title="More Projects" projects={projects} />
			</div>
		);
	}
}

export const pageQuery = graphql`
	query ProjectBySlug($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				agency
				client
				year
				link
				description
				videoEmbed {
					url
					width
					height
				}
				images {
					childrenManifestJson {
						title
						image {
							childImageSharp {
								responsive: responsiveSizes(maxWidth: 640) {
									src
									srcSet
									base64
								}
							}
						}
					}
				}
			}
			fields {
				slug
			}
			html
		}
		allMarkdownRemark(
			filter: { fields: { type: { eq: "project" }, slug: { ne: $slug } } }
			sort: { order: DESC, fields: [frontmatter___weight] }
		) {
			edges {
				node {
					...Project_list
				}
			}
		}
	}
`;
