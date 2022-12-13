import React from 'react';
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Test from "../components/Test";
import SEO from "../components/SEO";
import parse from 'html-react-parser';

export default function SinglePostPage({ data: { post } }) {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  const flexibleContent = post.post?.flexibleContent;

  return (
    <>
      <SEO title={post.title} />

      <div>
        <p>{post.terms.nodes.map(post => (post.name)).join(', ')}</p>

        {featuredImage?.data && (
          <GatsbyImage
            image={featuredImage.data}
            alt={featuredImage.alt}
          />
        )}

        {flexibleContent?.map(data => (
          <React.Fragment key={Math.floor(Math.random() * 100)}>
            {data?.content && parse(data.content)}
          </React.Fragment>
        ))
        }
      </div>
    </>
  )
}

export const query = graphql`
  query($slug: String!) {
    post: wpPost(slug: { eq: $slug }) {
      id
      title
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(
                quality: 100
                placeholder: DOMINANT_COLOR
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
      post {
          flexibleContent {
          ... on WpPost_Post_FlexibleContent_Content {
            content
          }
        }
      }
      content
      terms {
        nodes {
          ... on WpCategory {
            id
            name
            slug
          }
        }
      }
    }
  }
`;