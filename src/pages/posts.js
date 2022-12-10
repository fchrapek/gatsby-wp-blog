import React from 'react';
import { graphql } from 'gatsby';
import PostsFilter from "../components/PostsFilter";
import PostsList from "../components/PostsList";
import Pagination from "../components/Pagination";


export default function PostsPage({ data, pageContext }) {
  const posts = data.posts.nodes
  console.log(data.posts)
  return (
    <>
      <PostsFilter activeCategory={pageContext.slug}></PostsFilter>
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.posts.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/posts"
      />
      <PostsList posts={posts} />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2, $slug: [String]) {
    posts: allWpPost(limit: $pageSize, skip: $skip, filter: {
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
      totalCount
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
