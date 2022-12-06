import React from 'react';
import { graphql } from 'gatsby';
import PostsList from "../components/PostsList";

export default function PizzasPage({ data }) {
  const posts = data.posts.nodes
  return (
    <>
      <PostsList posts={posts} />
    </>
  );
}

export const query = graphql`
  query {
    posts: allWpPost {
      nodes {
        id
        excerpt
        slug
        uri
        title
        date(formatString: "MMMM DD, YYYY")
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
        terms {
          nodes {
            ... on WpCategory {
              id
              name
            }
          }
        }
      }
    }
  }
`;
