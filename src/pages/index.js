import React from 'react';
import { graphql } from 'gatsby';
import PostsFilter from "../components/PostsFilter";
import PostsList from "../components/PostsList";
// import Pagination from "../components/Pagination";


export default function PostsPage({ data, pageContext }) {
  const posts = data.posts.nodes
  return (
    <>
      <PostsFilter activeCategory={pageContext.slug}></PostsFilter>
      {/* <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={data.posts.totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/"
      /> */}
      <PostsList posts={posts} />
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 8, $slug: [String]) {
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
        date(formatString: "DD MMM YY", locale: "pl")
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
