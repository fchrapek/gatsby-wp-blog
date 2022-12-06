import React from 'react';
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Test from "../components/Test";

export default function SinglePostPage({ data: { post } }) {
  const featuredImage = {
    data: post.featuredImage?.node?.localFile?.childImageSharp?.gatsbyImageData,
    alt: post.featuredImage?.node?.alt || ``,
  }
  const flexibleContent = post.testFlexible.flexibleContent;

  return (
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
          {data?.header &&
            <h1>
              {data.header}
            </h1>}
          {data?.content &&
            <Test content={data.content} />}
        </React.Fragment>
      ))
      }
    </div>
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
      testFlexible {
        flexibleContent {
          ... on WpContentNode_Testflexible_FlexibleContent_Header {
            header
          }
          ... on WpContentNode_Testflexible_FlexibleContent_Content {
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