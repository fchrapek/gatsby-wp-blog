import React from 'react';
import { graphql } from 'gatsby';
import PostsFilter from "../components/PostsFilter";
import PostsList from "../components/PostsList";


export default function PostsPage({ data, pageContext }) {
  const posts = data.posts.nodes
  return (
    <>
      <PostsFilter activeCategory={pageContext.slug}></PostsFilter>
      <PostsList posts={posts} />
    </>
  );
}

export const query = graphql`
  query($slug: [String]) {
    posts: allWpPost(filter: {
      categories: {
        nodes: {
          elemMatch: {
            slug: {
              in: $slug, 
            }
          }
        }
      }
    }) {
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
